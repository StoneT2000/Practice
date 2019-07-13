import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from tensorflow.keras import layers
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.callbacks import ReduceLROnPlateau
print(tf.VERSION)
print(tf.keras.__version__)


## LEARNING ARCHITECTURE AND PARAMETERS
epochs = 30
batch_size = 82
optimizer = tf.keras.optimizers.RMSprop(lr=0.001, rho=0.9, epsilon=1e-08, decay=0.0)
# Use val_acc because validation loss is also impacted by how near our guess is
# to the number, which isn't correlated much with the shape of the number.
learning_rate_reduction = ReduceLROnPlateau(monitor='val_acc',
                                            patience=3,
                                            verbose=1,
                                            factor=0.5,
                                            min_lr=0.00001)
data_format='channels_last'
filepath = "tutorial-models/saved-model-{epoch:02d}-{val_acc:.5f}.hdf5"
check_point = tf.keras.callbacks.ModelCheckpoint(filepath, monitor='val_loss', verbose=0, save_best_only=False, save_weights_only=False, mode='auto', period=1)
# optimizer = tf.train.AdamOptimizer(0.001)
model = tf.keras.Sequential()

model.add(layers.Conv2D(filters=32, kernel_size=(5, 5), activation='relu', padding='same', data_format=data_format, input_shape = (28,28,1)))
model.add(layers.Conv2D(filters=32, kernel_size=(5, 5), activation='relu', padding='same', data_format=data_format))
model.add(layers.MaxPooling2D(pool_size=(2, 2)))
model.add(layers.Dropout(rate=0.25))
model.add(layers.Conv2D(filters=64, kernel_size=(3, 3), activation='relu', padding='same', data_format=data_format))
model.add(layers.Conv2D(filters=64, kernel_size=(3, 3), activation='relu', padding='same', data_format=data_format))
model.add(layers.MaxPooling2D(pool_size=(2, 2),strides=(2,2)))
model.add(layers.Dropout(rate=0.25))
model.add(layers.Flatten()) # Flatten the data into shape
# Adds a densely-connected layer with 300 units to the model:
model.add(layers.Dense(256, activation='relu'))
model.add(layers.Dropout(rate=0.5))  # Dropout some inputs to avoid overfitting
# Add a softmax layer with 10 output units:
model.add(layers.Dense(10, activation='softmax'))

model.compile(optimizer=optimizer,
              loss='categorical_crossentropy',
              metrics=['accuracy'])

print("Loading training data...")
train = pd.read_csv('train.csv')
print("Loading test data...")
test = pd.read_csv('test.csv')  # returns a pandas Series object

Y_train = train["label"]  # Take only the label column
X_train = train.drop(labels = ["label"],axis = 1)  # take all but the label column

del train #we have all the data in Y_train and X_train

#counts the number of each value in Y_train appears and doensn't sort by frequency
# labelCounts = Y_train.value_counts(sort=False)
# print("Labels: \n%s" %labelCounts)

#labelCounts.plot.bar()

#Reduce our data to the range [0,1]
X_train = X_train / 255
test = test / 255

# Reshape our data to not include the column names pixel1, pixel2,.... via the -1, deleting the first row
# Reshapes our data to be 28x28 matrices with 1 channel each
X_train = X_train.values.reshape(-1,28,28,1)
test = test.values.reshape(-1,28,28,1)


# Encodes our labels to one-hot vectors of the form [0,0,0,...,1,..,0], where the 1 signifies what label it is
Y_train = to_categorical(Y_train, num_classes=10)


random_seed = 2
X_train, X_val, Y_train, Y_val = train_test_split(X_train, Y_train, test_size = 0.1, random_state=random_seed)

imageDataGen = tf.keras.preprocessing.image.ImageDataGenerator(featurewise_center=False,
samplewise_center=False,
featurewise_std_normalization=False,
samplewise_std_normalization=False,
rotation_range=10,  # randomly rotate images in the range (degrees, 0 to 180)
zoom_range = 0.1,
width_shift_range=0.1,
height_shift_range=0.1)

imageDataGen.fit(X_train)
print(X_train.shape)

history = model.fit_generator(
    imageDataGen.flow(X_train,Y_train,batch_size=batch_size),
    epochs=epochs,
    steps_per_epoch=X_train.shape[0] // batch_size,
    validation_data = (X_val,Y_val),
    callbacks=[learning_rate_reduction, check_point])
fig, ax = plt.subplots(2,1)
ax[0].plot(history.history['loss'], color='b', label="Training loss")
ax[0].plot(history.history['val_loss'], color='r', label="validation loss",axes =ax[0])
legend = ax[0].legend(loc='best', shadow=True)

ax[1].plot(history.history['acc'], color='b', label="Training accuracy")
ax[1].plot(history.history['val_acc'], color='r',label="Validation accuracy")

legend = ax[1].legend(loc='best', shadow=True)
#plt.show()


# Predict our answers on the test dataset
results = model.predict(test)

# Our results are in the form of vectors with 10 columns as we converted Y_train to 1 hot vectors of size 10
# Thus our answer should be the index with the highest value (0~1)
results = np.argmax(results,axis = 1)
results = pd.Series(results,name="Label")
submission = pd.concat([pd.Series(range(1,28001),name = "ImageId"),results],axis = 1)

submission.to_csv("cnn_mnist_datagent2.csv",index=False)

# Predict the values from the validation dataset
Y_pred = model.predict(X_val)
# Convert predictions classes to one hot vectors
Y_pred_classes = np.argmax(Y_pred,axis = 1)
# Convert validation observations to one hot vectors
Y_true = np.argmax(Y_val,axis = 1)
errors = (Y_pred_classes - Y_true != 0)
Y_pred_classes_errors = Y_pred_classes[errors]
Y_pred_errors = Y_pred[errors]
Y_true_errors = Y_true[errors]
X_val_errors = X_val[errors]

def display_errors(errors_index,img_errors,pred_errors, obs_errors):
    """ This function shows 6 images with their predicted and real labels"""
    n = 0
    nrows = 2
    ncols = 3
    fig, ax = plt.subplots(nrows,ncols,sharex=True,sharey=True)
    for row in range(nrows):
        for col in range(ncols):
            error = errors_index[n]
            ax[row,col].imshow((img_errors[error]).reshape((28,28)))
            ax[row,col].set_title("Predicted label :{}\nTrue label :{}".format(pred_errors[error],obs_errors[error]))
            n += 1

# Probabilities of the wrong predicted numbers
Y_pred_errors_prob = np.max(Y_pred_errors, axis=1)

# Predicted probabilities of the true values in the error set
true_prob_errors = np.diagonal(np.take(Y_pred_errors, Y_true_errors, axis=1))

# Difference between the probability of the predicted label and the true label
delta_pred_true_errors = Y_pred_errors_prob - true_prob_errors

# Sorted list of the delta prob errors
sorted_dela_errors = np.argsort(delta_pred_true_errors)

# Top 6 errors
most_important_errors = sorted_dela_errors[-6:]

# Show the top 6 errors
# display_errors(most_important_errors, X_val_errors, Y_pred_classes_errors, Y_true_errors)
'''
fig2, axs2 = plt.subplots(5, 5, figsize=(10,10))
for i, ax in enumerate(axs2.flatten()):
    ax.set_title(results[i])
    ax.imshow(X_train[i].reshape(28,28))
    ax.axis('off')
'''
model.save('2cnnmodel1t2.h5')
plt.show()

#print('Test accuracy:', test_acc)

#predictions = model.predict(test_images)
