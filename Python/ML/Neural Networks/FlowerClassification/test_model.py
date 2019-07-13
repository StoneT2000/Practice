import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras

model_name='2cnnmodel-30-0.84268.hdf5'
model = keras.models.load_model('models-v0/' + model_name)
print("Loading Some Photos!")
datagen = keras.preprocessing.image.ImageDataGenerator(rescale=1/255)

X_train = datagen.flow_from_directory('guess', class_mode='categorical', batch_size=32,target_size=(32, 32))
labels = (X_train.class_indices)

results = model.predict_generator(X_train)
# print(results)
# results = model.predict(test)
# results = np.argmax(results,axis = 1)
# results = pd.Series(results,name="Label")
print (labels.items());
labels = dict((v,k) for k,v in labels.items())
results = np.asarray(results)
print(labels)
print(results)
results = np.argsort(-results)
for j in range(len(results)):
    labeled_results = [labels[i] for i in results[j]]
    print (labeled_results)
print(results)



# print([labels[i[0]] for i in results])

# results = [labels[k[0]] for k in results]
# results.sort();
