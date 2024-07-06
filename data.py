import pandas as pd
from surprise import Dataset,Reader,SVD
from surprise.model_selection import train_test_split,cross_validate

# read preprocessed data
df = pd.read_csv("C:\\Users\\pooja\\Downloads\\e-library.books.csv")
#convert the data for surprise library
reader=Reader(rating=(0,5))
dataset=Dataset.load_from_df(df[['userId','bookId','rating']],reader)
#train the model
train_set,test_set=train_test_split(train_set,test_size=0.3)
print(df)
