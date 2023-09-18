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
        # target_names = [params.target.loc[target_index, "user_id"] for target_index in recommended_target]
        target_data = [params.target.loc[target_index, ["user_id", "location", "industry", "experience"]] for target_index in recommended_target]

    return target_data


#data = pd.read_csv("users.csv")


# if __name__ == "__main__":
#     recommendations = get_matches(obj)
#     print(recommendations)  