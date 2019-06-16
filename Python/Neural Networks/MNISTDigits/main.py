import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from tensorflow.keras import layers
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.utils import to_categorical

print(tf.VERSION)
print(tf.keras.__version__)


model = tf.keras.Sequential()
# Adds a densely-connected layer with 64 units to the model:
model.add(layers.Dense(128, activation='relu'))
model.add(layers.Dense(128, activation='relu'))
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(64, activation='relu'))
# Add a softmax layer with 10 output units:
model.add(layers.Dense(10, activation='softmax'))
model.compile(optimizer=tf.train.AdamOptimizer(0.001),
              loss='categorical_crossentropy',
              metrics=['accuracy'])



print("Loading training data...")
train = pd.read_csv('train.csv')
print("Loading test data...")
test = pd.read_csv('test.csv') #returns a pandas Series object

Y_train = train["label"] #Take only the label column
X_train = train.drop(labels = ["label"],axis = 1) #take all but the label column

del train #we have all the data in Y_train and X_train

#counts the number of each value in Y_train appears and doensn't sort by frequency
labelCounts = Y_train.value_counts(sort=False)
print("Labels: \n%s" %labelCounts)

#labelCounts.plot.bar()

#Reduce our data to the range [0,1]
X_train = X_train / 255
test = test / 255

#Reshape our data to not include the column names pixel1, pixel2,.... via the -1, deleting the first row
#Reshapes our data to be rows with 784 columns each
X_train = X_train.values.reshape(-1,784)
test = test.values.reshape(-1,784)


#Encodes our labels to one-hot vectors of the form [0,0,0,...,1,..,0], where the 1 signifies what label it is
Y_train = to_categorical(Y_train, num_classes=10)


random_seed = 2
X_train, X_val, Y_train, Y_val = train_test_split(X_train, Y_train, test_size = 0.4, random_state=random_seed)

history = model.fit(X_train, Y_train, epochs=5,batch_size=100,validation_data = (X_val,Y_val))
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

submission.to_csv("cnn_mnist_datagen.csv",index=False)

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
Y_pred_errors_prob = np.max(Y_pred_errors,axis = 1)

# Predicted probabilities of the true values in the error set
true_prob_errors = np.diagonal(np.take(Y_pred_errors, Y_true_errors, axis=1))

# Difference between the probability of the predicted label and the true label
delta_pred_true_errors = Y_pred_errors_prob - true_prob_errors

# Sorted list of the delta prob errors
sorted_dela_errors = np.argsort(delta_pred_true_errors)

# Top 6 errors
most_important_errors = sorted_dela_errors[-6:]

# Show the top 6 errors
#display_errors(most_important_errors, X_val_errors, Y_pred_classes_errors, Y_true_errors)
'''
fig2, axs2 = plt.subplots(7, 7, figsize=(10,10))
for i, ax in enumerate(axs2.flatten()):
    ax.set_title(results[i])
    ax.imshow(X_train[i].reshape(28,28))
    ax.axis('off')
'''
plt.show()

#print('Test accuracy:', test_acc)

#predictions = model.predict(test_images)
