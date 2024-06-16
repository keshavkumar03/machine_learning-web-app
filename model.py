#machine learning model


from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

iris=load_iris()
x,y=iris.data ,iris.target

X_train,X_test,Y_train ,Y_test=train_test_split(x,y,test_size=0.2,random_state=42)

# Print the shapes of the training and testing sets
# print("X_train shape:", X_train.shape)
# print("y_train shape:", Y_train.shape)
# print("X_test shape:", X_test.shape)
# print("y_test shape:", Y_test.shape)

model = LogisticRegression(max_iter=1000, solver='lbfgs')
model.fit(x,y)

def prediction(sepal_length,sepal_width,petal_length,petal_width):
    features=[[sepal_length,sepal_width,petal_length,petal_width]]
    prediction=model.predict(features)
    return iris.target_names[prediction[0]]

