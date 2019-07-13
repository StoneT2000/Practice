from __future__ import absolute_import, division, print_function
import importlib
# TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from keras.callbacks import TensorBoard
from sklearn.model_selection import train_test_split
from tensorflow.keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPool2D
# Helper libraries
import numpy as np
import matplotlib.pyplot as plt
import time
import atexit
import argparse
import os
import sys
import logging
import importlib.util
spec = importlib.util.spec_from_file_location("module.name", "model.py")
Model = importlib.util.module_from_spec(spec)
spec.loader.exec_module(Model)

run_title = ''

parser = argparse.ArgumentParser(description='Train on flower images ')
parser.add_argument(
    '--run_title', '-rt',
    default='none',
    help='Provide a run name. Default run data stored as none'
)
parser.add_argument(
    '--batch_size', '-bs',
    default=4,
    help='Provide a batch_size, defaults to 16'
)
parser.add_argument(
    '--load_model', '-lm',
    default='none',
    help='Load the model from its file path'
)
parser.add_argument(
    '--tf_logs', '-tfl',
    default='false',
    help='Set as true/yes or false/no for logs or no logs from warnings/errors'
)
args = parser.parse_args()

logging.getLogger('tensorflow').disabled = (False if args.tf_logs in ['True','true','yes','Yes'] else True)

# Local time in form yyyy:mm:dd:hh:mm:ss
lt = time.localtime(time.time())
localtime = [lt[1],lt[2] , lt[3] , lt[4] , lt[5]]
localtime = ['{:02d}'.format(a) for a in localtime]
localtime = str(lt[0]) + '-' + ('-').join(localtime)
print("Local Time: ", localtime)
del lt

logpath = "json-logs/log-" + localtime +".json"

# Keras Callback function that writes to json file named by initialization of main.py
class writeToJson(tf.keras.callbacks.Callback):
    def __init__(self):
        self.history = dict(loss=[],val_loss=[],acc=[],val_acc=[])
        f=open(logpath,"w+")
        f.write("[]")
        f.close()
        self.epochNum = 0
    def on_epoch_end(self, epoch, logs={}):
        self.epochNum += 1
        for key in self.history:
            self.history[key] = logs.get(key)
        with open(logpath, "a") as f:
            size=f.tell()
            f.truncate(size-1)
            #f=open(self.logpath,"a+")
            if f.tell() > 2:
                f.write(",")
            f.write("{\"loss\":\"%f\",\"val_loss\":\"%f\",\"acc\":\"%f\",\"val_acc\":\"%f\"}" % (logs.get('loss'),logs.get('val_loss'),logs.get('acc'),logs.get('val_acc')))
            f.write("]")
            f.close()
write_to_json = writeToJson()

# Handle preemptive closes
def closeJsonLog():
    f= open(logpath,"a+")
    size=f.tell()
    if size > 2:
        f.truncate(size-1)
        f.write("]")
    f.close()
atexit.register(closeJsonLog)

# Training Function
def train():
    # Data Augmentation, provides more varied data for model to train on, preventing overfitting
    datagen = keras.preprocessing.image.ImageDataGenerator(
        rescale=1/255,
        validation_split=0.2,
        rotation_range=10,
        width_shift_range=0.1,
        height_shift_range=0.1,
        horizontal_flip=True)
    batch_size = int(args.batch_size)
    print("Loading Training Dataset")
    tsize = 1
    X_train = datagen.flow_from_directory('flower_photos/', class_mode='categorical', batch_size=batch_size,target_size=(tsize,tsize), subset='training', seed=2)
    print("Loading Validation Dataset")
    X_val = datagen.flow_from_directory('flower_photos/', class_mode='categorical', batch_size=batch_size,target_size=(tsize, tsize), subset='validation', seed=2)


    labels = (X_train.class_indices)
    print("Labels", labels)
    print("Input Shape", X_train[0][0].shape)

    # OTHERS
    filepath = "models-v0/2cnnmodel-{epoch:02d}-{val_acc:.5f}.hdf5"
    check_point = tf.keras.callbacks.ModelCheckpoint(filepath, monitor='val_loss', verbose=0, save_best_only=False, save_weights_only=False, mode='auto', period=2)

    optimizer = tf.keras.optimizers.RMSprop(lr=0.001, rho=0.9, epsilon=1e-08, decay=0.0)
    red_lr= tf.keras.callbacks.ReduceLROnPlateau(monitor='val_acc',patience=3,verbose=1,factor=0.2)

    # TESNORBOARD LOGGING
    logdir = 'logs/' + args.run_title
    tensorboard_callback = keras.callbacks.TensorBoard(log_dir=logdir)

    # ARCHITECTURE
    model = Model.unitTestModel()

    History = model.fit_generator(
        X_train,
        steps_per_epoch=len(X_train)/4,
        validation_data = X_val,
        epochs=200,
        callbacks=[check_point,red_lr,write_to_json,tensorboard_callback])
    plt.plot(History.history['loss'])
    plt.plot(History.history['val_loss'])
    plt.title('Model Loss')
    plt.ylabel('Loss')
    plt.xlabel('Epochs')
    plt.legend(['train', 'test'])
    #plt.show()

    plt.plot(History.history['acc'])
    plt.plot(History.history['val_acc'])
    plt.title('Model Accuracy')
    plt.ylabel('Accuracy')
    plt.xlabel('Epochs')
    plt.legend(['train', 'test'])
    model.save('2xcnnmodel-flowersv0.h5')
####-----####
if __name__ == '__main__':
    train()
