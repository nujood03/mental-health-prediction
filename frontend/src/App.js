import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    Age: '',
    Gender: '',
    family_history: '',
    benefits: '',
    care_options: '',
    anonymity: '',
    leave: '',
    work_interface: '',
  });
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.Age = Number(formData.Age)
      console.log(JSON.stringify(formData))
      // await fetch('http://127.0.0.1:5000/nothing', {
      //     method: 'GET',
      //     mode: 'cors',
      //   });
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(`Prediction result: ${data.result ? 'Yes' : 'No'}`);

    } catch (error) {
      console.error('Error:', error);
      setResult('Failed to get prediction');
    }
  };

  return (
    <div className="App">
      <h2>Mental Health Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input type="number" name="Age" value={formData.Age} onChange={handleChange} required />
        </label>

        <label>
          Gender:
          <select name="Gender" value={formData.Gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>


        <label>
          Family History:
          <select name="family_history" value={formData.family_history} onChange={handleChange} required>
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Benefits:
          <select name="benefits" value={formData.benefits} onChange={handleChange} required>
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Care options:
          <select name="care_options" value={formData.care_options} onChange={handleChange} required>
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Anonymity:
          <select name="anonymity" value={formData.anonymity} onChange={handleChange} required>
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Leave:
          <select name="leave" value={formData.leave} onChange={handleChange} required>
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Work Interface:
          <select name="work_interface" value={formData.work_interface} onChange={handleChange} required>
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <button type="submit">Predict</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}

export default App;