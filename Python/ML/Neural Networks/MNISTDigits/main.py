import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from tensorflow.keras import layers
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.callbacks import ReduceLROnPlateau

from monitor import config

import atexit
import time
import argparse
import logging
print("TensorFlow Version: " + tf.VERSION)
print("TensorFlow Keras Version: " + tf.keras.__version__)

parser = argparse.ArgumentParser(description='Train on the MNISTDigits dataset')

parser.add_argument(
    '--tf_logs', '-tfl',
    default='false',
    help='Set as true/yes or false/no for logs or no logs from warnings/errors'
)
args = parser.parse_args()

logging.getLogger('tensorflow').disabled = (False if args.tf_logs in ['True','true','yes','Yes'] else True)


# LEARNING ARCHITECTURE AND PARAMETERS
epochs = 50
batch_size = 96
optimizer = tf.keras.optimizers.RMSprop(lr=0.001, rho=0.9, epsilon=1e-08, decay=0.0)
# Use val_acc because validation loss is also impacted by how near our guess is
# to the number, which isn't correlated much with the shape of the number.
learning_rate_reduction = ReduceLROnPlateau(monitor='val_acc',
                                            patience=3,
                                            verbose=1,
                                            factor=0.5,
                                            min_lr=0.00001)
data_format='channels_last'
filepath = "models-v1/saved-model-{epoch:02d}-{val_acc:.5f}.hdf5"
check_point = tf.keras.callbacks.ModelCheckpoint(filepath, monitor='val_loss', verbose=0, save_best_only=False, save_weights_only=False, mode='auto', period=1)
# tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir='logs/run-3')
# optimizer = tf.train.AdamOptimizer(0.001)

# Local time in form yyyy:mm:dd:hh:mm:ss
lt = time.localtime(time.time())
localtime = [lt[1],lt[2] , lt[3] , lt[4] , lt[5]]
localtime = ['{:02d}'.format(a) for a in localtime]
localtime = str(lt[0]) + '-' + ('-').join(localtime)
print("Local Time: ", localtime)
del lt

print("\nConfiguring files with Apogee Monitor\n")

logpath = "json-logs/log-" + localtime +".json"
logpath = "json-logs/logs.json"

# Keras Callback function that writes to json file named by initialization of main.py

# initialize the configuration logging by providing the logpath
monitor = config.initialize(logpath)

# data_config is not needed, but helpful
# labels are also not needed, but helpful
# keys are

# create an instance of an empty apogee graph
accuracyGraph = monitor.graph()

# add the following metrics: acc and val_acc, along with the optional configurations to accuracyGraph
accuracyGraph.add_metrics(name="Accuracy",keys=['acc', 'val_acc'],
                data_config={
                'acc': {'name':"Training Accuracy", 'color':"red"},
                'val_acc':{'name':"Validation Accuracy", 'color':"rgb(55,155,230)"}
                })
print("All recorded metrics in accuracyGraph: ", accuracyGraph.metrics)

# add the following data point
# x value MUST be provided
#accuracyGraph.add_data(data_y={"acc":0.631, "val_acc":0.924},data_x=1)
#accuracyGraph.add_data(data_y={"acc":0.709, "val_acc":0.931},data_x=2)

# add a list of data points
# Data can be left blank, if its not parseable under the metric format asked to be stored in, it will be empty
# accuracyGraph.add_data(data_y={"acc":[0.723,0.749], "val_acc":[0.930,0.941]},data_x=[3,4])


class writeToJson(tf.keras.callbacks.Callback):
    def __init__(self):
        self.history = dict(loss=[],val_loss=[],acc=[],val_acc=[])
        self.epochNum = 0
    def on_epoch_end(self, epoch, logs={}):

        accuracyGraph.add_data(data_y={"acc":logs.get("acc"),"val_acc":logs.get("val_acc")},data_x=self.epochNum)
        self.epochNum += 1
write_to_json = writeToJson()



model = tf.keras.Sequential()
model.add(layers.Flatten()) # Flatten the data into shape
# Adds a densely-connected layer with 256 units to the model:
model.add(layers.Dense(128, activation='relu'))
model.add(layers.Dense(128, activation='relu'))
model.add(layers.Dropout(rate=0.25))  # Dropout some inputs to avoid overfitting
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

X_train = X_train / 255
test = test / 255

# Reshape our data to not include the column names pixel1, pixel2,.... via the -1, deleting the first row
# Reshapes our data to be 28x28 matrices with 1 channel each
X_train = X_train.values.reshape(-1,28,28,1)
test = test.values.reshape(-1,28,28,1)


# Encodes our labels to one-hot vectors of the form [0,0,0,...,1,..,0], where the 1 signifies what label it is
Y_train = to_categorical(Y_train, num_classes=10)


random_seed = 2
X_train, X_val, Y_train, Y_val = train_test_split(X_train, Y_train, test_size = 0.2, random_state=random_seed)

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
    imageDataGen.flow(X_train,Y_train, batch_size=batch_size),
    epochs=epochs,
    steps_per_epoch=X_train.shape[0] // batch_size,
    validation_data = (X_val, Y_val),
    callbacks=[learning_rate_reduction, write_to_json])
# history.history['loss']

# Predict our answers on the test dataset
results = model.predict(test)

# Our results are in the form of vectors with 10 columns as we converted Y_train to 1 hot vectors of size 10
# Thus our answer should be the index with the highest value (0~1)
results = np.argmax(results,axis = 1)
results = pd.Series(results,name="Label")
submission = pd.concat([pd.Series(range(1,28001),name = "ImageId"),results],axis = 1)

submission.to_csv("cnn_mnist_datagent2.csv",index=False)
