from __future__ import absolute_import, division, print_function
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.layers import Conv2D, SpatialDropout2D, MaxPool2D, Dense, Dropout, Flatten

filepath = 'models-summary'
check_point = tf.keras.callbacks.ModelCheckpoint(filepath, monitor='val_loss', verbose=0, save_best_only=False, save_weights_only=False, mode='auto', period=2)

optimizer = tf.keras.optimizers.RMSprop(lr=0.001, rho=0.9, epsilon=1e-08, decay=0.0)
red_lr= tf.keras.callbacks.ReduceLROnPlateau(monitor='val_acc',patience=3,verbose=1,factor=0.2)
def createModel():
    model = keras.Sequential()

    # Add a conv2d layer, 32 filters. There's a total of (5*5 kernel ) * 3 channels (RGB) + 1 (Bias term) parameters to learn here
    '''
    tsize = 32
    model.add(Conv2D(filters = 1, kernel_size = (3,3),padding = 'Same',activation ='relu', input_shape = (tsize,tsize,3)))
    model.add(MaxPool2D(pool_size=(32,32),strides=(32,32)))
    '''
    model.add(Conv2D(filters = 32, kernel_size = (3,3),padding = 'Same',activation ='relu',input_shape = (160,160,3)))
    model.add(SpatialDropout2D(rate=0.2))
    model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))
    ###
    model.add(Conv2D(filters = 64, kernel_size = (3,3),padding = 'Same', activation ='relu'))
    model.add(Conv2D(filters = 64, kernel_size = (3,3),padding = 'Same', activation ='relu'))
    model.add(SpatialDropout2D(rate=0.2))
    ###
    model.add(Conv2D(filters = 64, kernel_size = (3,3),padding = 'Same', activation ='relu'))
    model.add(SpatialDropout2D(rate=0.2))
    model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))
    model.add(Flatten())
    model.add(Dense(128, activation = "relu"))
    model.add(Dropout(0.25))
    model.add(Dense(5, activation = "softmax"))

    model.compile(optimizer=optimizer,
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    print (model.summary())
    return model

def unitTestModel():
    model = keras.Sequential()
    model.add(Flatten())

    model.add(Dense(5, activation = "softmax"))
    model.compile(optimizer=optimizer,
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    return model

if __name__ == '__main__':
    createModel()
