from __future__ import absolute_import, division, print_function

# TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras
from sklearn.model_selection import train_test_split
from tensorflow.keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPool2D
# Helper libraries
import numpy as np
import matplotlib.pyplot as plt

print(tf.__version__)

datagen = keras.preprocessing.image.ImageDataGenerator(rescale=1/255)

X_train = datagen.flow_from_directory('data/train/', class_mode='binary', batch_size=32,target_size=(32, 32), classes=['daisy','dandelion'])
X_test = datagen.flow_from_directory('data/test/', class_mode='binary', batch_size=32,target_size=(32, 32))


labels = (X_train.class_indices)
print(labels)

model = keras.Sequential()
model.add(Conv2D(filters = 32, kernel_size = (5,5),padding = 'Same',
                 activation ='relu', input_shape = (32,32,3)))
model.add(Conv2D(filters = 32, kernel_size = (5,5),padding = 'Same',
                 activation ='relu'))
model.add(MaxPool2D(pool_size=(2,2)))
model.add(Dropout(0.25))

model.add(Conv2D(filters = 64, kernel_size = (3,3),padding = 'Same',
                 activation ='relu'))
model.add(Conv2D(filters = 64, kernel_size = (3,3),padding = 'Same',
                 activation ='relu'))
model.add(MaxPool2D(pool_size=(2,2), strides=(2,2)))
model.add(Dropout(0.25))

model.add(Flatten())
model.add(Dense(64, activation = "relu"))
model.add(Dense(5, activation = "softmax"))

model.compile(optimizer=tf.train.AdamOptimizer(0.001),
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
print(len(X_train))

model.fit_generator(X_train, steps_per_epoch=len(X_train) /32 ,epochs=1)

predictions = model.predict_generator(X_test)

predicted_class_indices=np.argmax(predictions,axis=1)

labels = dict((v,k) for k,v in labels.items())
predictions = [labels[k] for k in predicted_class_indices]
print(predictions)
