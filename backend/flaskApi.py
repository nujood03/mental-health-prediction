from flask import Flask, request, jsonify
from keras.models import load_model
import numpy as np

app = Flask(__name__)

# Load the model
loaded_model = load_model('model.h5')

def convert_categorical_to_numeric(input_data):
    input_data['Gender'] = 1 if input_data['Gender'] == 'Male' else 0
    input_data['family_history'] = 1 if input_data['family_history'] == 'Yes' else 0
    input_data['benefits'] = 1 if input_data['benefits'] == 'Yes' else 0
    input_data['care_options'] = 1 if input_data['care_options'] == 'Yes' else 0
    input_data['anonymity'] = 1 if input_data['anonymity'] == 'Yes' else 0
    input_data['leave'] = 1 if input_data['leave'] == 'Yes' else 0
    input_data['work_interface'] = 1 if input_data['work_interface'] == 'Yes' else 0
    return input_data



@app.route('/predict', methods=['OPTIONS'])
def options_predict():
    response = jsonify({"status": "success"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    return response

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        return options_predict()

    input_data = request.json

    numeric_input = convert_categorical_to_numeric(input_data)

    processed_input = np.array([list(map(float, numeric_input.values()))])

    prediction = loaded_model.predict(processed_input)

    is_yes = prediction[0][1] > prediction[0][0]
    result = {"result": bool(is_yes)}

    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(debug=True)
