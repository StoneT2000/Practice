import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras

model_name='saved-model-29-0.99512.hdf5'
model = keras.models.load_model('models-v3/' + model_name)
print("Loading test data...")
test = pd.read_csv('test.csv')
test = test / 255
test = test.values.reshape(-1,28,28,1)

results = model.predict(test)
results = np.argmax(results,axis = 1)
results = pd.Series(results,name="Label")
submission = pd.concat([pd.Series(range(1,28001),name = "ImageId"),results],axis = 1)

submission.to_csv("cnn_mnist_datagent_" + model_name +".csv",index=False)
print("Done saving data to cnn_mnist_datagent_" + model_name +".csv")
