from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from src.ml.feature_engineering import get_features

def train_model(df):
    X, y = get_features(df)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = LinearRegression()
    model.fit(X_train, y_train)

    score = model.score(X_test, y_test)
    return model, score
