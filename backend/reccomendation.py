import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def apply_encodings(value, encoding_dict):
    return int(encoding_dict[value])

def myencode(data):
    encodings = dict()
    for col in data.columns:
        unique_vals = list(set(data[col].values))
        encoding_dict = {unique_val: i for i, unique_val in enumerate(unique_vals)}
        encodings[col] = encoding_dict
    for col, encoding_dict in encodings.items():
      data[col] = data[col].apply(lambda x: apply_encodings(x, encoding_dict))
    return data, encodings

def get_matches(params):
    encoded_categorical_features, encodings = myencode(params.data[params.categorical_attributes]) #data
    target_features_numerical = params.target[params.numerical_attributes].values * np.array([params.attribute_weights[attr] for attr in params.numerical_attributes])
    specs_features_numerical = params.specs[params.numerical_attributes].values * np.array([params.attribute_weights[attr] for attr in params.numerical_attributes])

    target_features_categorical = encoded_categorical_features.iloc[params.target.index].astype(float).values
    target_features_categorical *= np.array([params.attribute_weights[attr] for attr in params.categorical_attributes])
    specs_features_categorical = encoded_categorical_features.iloc[params.specs.index].astype(float).values
    specs_features_categorical *= np.array([params.attribute_weights[attr] for attr in params.categorical_attributes])

    target_features = np.hstack((target_features_numerical, target_features_categorical))
    specs_features = np.hstack((specs_features_numerical, specs_features_categorical))

    similarity_matrix = cosine_similarity(specs_features, target_features)

    recommendations = {}
    for i, specs_index in enumerate(params.specs.index):
        top_target_indices = similarity_matrix[i].argsort()[::-1][:params.num_recommendations]
        recommended_target = params.target.iloc[top_target_indices].index.tolist()
        recommendations[specs_index] = recommended_target

    for specs_index, recommended_target in recommendations.items():
        specs_name = params.specs.loc[specs_index, "user_id"]
        target_names = [params.target.loc[target_index, "user_id"] for target_index in recommended_target]
    return target_names


data = pd.read_csv("users.csv")

class RecommendationObject:
    def __init__(self):
        self.numerical_attributes = ["startup_experience"]
        self.categorical_attributes = ["gender", "location", "industry"]
        self.attribute_weights = { "location": 3.0, "startup_experience": 2.0, "industry": 2.0, "gender": 1.0 }
        self.target = None
        self.specs = None
        self.data = None
        self.num_recommendations = 5

obj = RecommendationObject()

obj.numerical_attributes = ["startup_experience"]
obj.categorical_attributes = ["gender", "location", "industry"]
obj.attribute_weights = {
    "location": 3.0,
    "startup_experience": 2.0,
    "industry": 2.0,
    "gender": 1.0
}
obj.target = data[data["mentor"] == False].copy() 
obj.specs = data[data["mentor"] == True].iloc[[0]].copy()
obj.data = data.copy()  
obj.num_recommendations = 5


recommendations = get_matches(obj)
print(recommendations)