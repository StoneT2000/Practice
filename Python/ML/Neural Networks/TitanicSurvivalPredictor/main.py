import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from tensorflow.keras import layers
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.utils import to_categorical
from random import randint
# Architecture

model = tf.keras.Sequential()

model.add(layers.Dense(32, activation='relu',kernel_regularizer=tf.keras.regularizers.l2(0.001)))


model.add(layers.Dense(2, activation='softmax'))
model.compile(optimizer=tf.train.AdamOptimizer(0.001),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

print("Loading training data...")
train = pd.read_csv('train.csv')
print("Loading test data...")
test = pd.read_csv('test.csv') #returns a pandas Series object


alldata = [train, test]
#Fill in data for Age, using median ag

# Feature extraction and engineering
# Methodology
# Relevant data are
# Pclass: class of Travel
# Name?
# Sex: 0, 1 -> Female, Male
# Age
# SibSp: Number of siblings + spouses aboard
# Parch: Number of parents and children
# Ticket Type??
# Fare: Could affect how luxurious they were; If NaN, fill with median fare price according to Pclass
#

dropLabels = ["PassengerId","Name"]

PassengerId = test['PassengerId']


for d in alldata:
    d['Age'] = d['Age'].fillna(train['Age'].median())
    d['Sex'] = d['Sex'].map( {'female': 0, 'male': 1} ).astype(int)

    d['Embarked'] = d['Embarked'].map({'S':0,'C':1,'Q':2})
    d['Embarked'] = d['Embarked'].fillna(randint(0,2))
    d['FamilySize'] = d['SibSp'] + d['Parch'] + 1
for d in alldata:
    d['IsAlone'] = 0
    d.loc[d['FamilySize'] == 1, 'IsAlone'] = 1
    d.loc[ d['Age'] <= 16, 'Age'] = 0
    d.loc[(d['Age'] > 16) & (d['Age'] <= 32), 'Age'] = 1
    d.loc[(d['Age'] > 32) & (d['Age'] <= 48), 'Age'] = 2
    d.loc[(d['Age'] > 48) & (d['Age'] <= 64), 'Age'] = 3
    d.loc[ d['Age'] > 64, 'Age'] = 4 ;

    #d['Cabin'] =
#X_train['Family'] = 0


Y_train = train["Survived"]
X_train = train.drop(labels = ["Survived","PassengerId","Name","Cabin","Ticket","SibSp","Parch"],axis = 1)


X_test = test.drop(labels = ["PassengerId","Name","Cabin","Ticket","SibSp","Parch"],axis = 1)

#print(X_train.isnull().any().describe())
#X_train.Sex = [sex[item] for item in X_train.Sex]
print(X_train.head(10))

size = 7;
X_train = X_train.values.reshape(-1,size)
X_test = X_test.values.reshape(-1,size)


Y_train = to_categorical(Y_train, num_classes=2)

X_train, X_val, Y_train, Y_val = train_test_split(X_train, Y_train, test_size = 0.2, random_state=2)


model.fit(X_train,Y_train, validation_data=(X_val,Y_val), epochs=50, batch_size=10)

results = model.predict(X_test)
results = np.argmax(results,axis = 1)
csvsubmit = pd.DataFrame({'PassengerId':PassengerId, 'Survived':results})
csvsubmit.to_csv("data.csv",index=False)
