import os

import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET_PATH = os.path.join(BASE_DIR, "dataset", "spam_detection.csv")

data = pd.read_csv(DATASET_PATH)
x = data["text"]
y = data["label"]

vectorizer = CountVectorizer()
X_vectorized = vectorizer.fit_transform(x)

model = MultinomialNB()
model.fit(X_vectorized, y)


def predict_spam(message: str) -> bool:
    prediction = model.predict(vectorizer.transform([message]))[0]
    return prediction == "spam"
