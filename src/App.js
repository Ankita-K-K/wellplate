import React, { useState } from 'react';
import HomePage from './HomePage';
import './form.css'

function App() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [dietPreference, setDietPreference] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [budget, setBudget] = useState('');
  const [image, setImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [mealHistory, setMealHistory] = useState([]);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleFoodAnalysis = async () => {
    if (!image) {
      alert('Please upload an image first.');
      return;
    }

    // Mock analysis result
    const detectedFoods = ['Chicken Curry', 'Rice', 'Curd'];

    console.log('Detected Foods:', detectedFoods);

    const mockNutrients = {
      Protein: 30,
      Carbs: 50,
      Fats: 10,
    };

    setAnalysisResult({
      food: detectedFoods.join(', '),
      calories: 400,
      nutrients: mockNutrients,
    });

    setMealHistory([
      ...mealHistory,
      { date: new Date().toLocaleDateString(), food: detectedFoods.join(', '), calories: 400 },
    ]);

    // Automatically go to the recommendation step
    setStep(3);
  };

  const fetchBalancedDietRecommendation = () => {
    if (!analysisResult) return [];

    const balancedDiet = {
      Protein: 50,
      Carbs: 250,
      Fats: 70,
    };

    const recommendations = [];
    
    // Nutrient deficits and recommendations
    if (analysisResult.nutrients.Protein < balancedDiet.Protein) {
      recommendations.push('Protein: Add eggs, or lentils to your meal.');
    }
    if (analysisResult.nutrients.Carbs < balancedDiet.Carbs) {
      recommendations.push('Fibres: Add carrots, cucumbers.');
    }
    if (analysisResult.nutrients.Fats < balancedDiet.Fats) {
      recommendations.push('Fats: Add healthy fats like nuts (Almonds).');
    }

    return recommendations;
  };

  return (
    <div>
    <HomePage />
    <div className="app-container">
      <h1 className="title">Diet Lens</h1>

      {step === 1 && (
        <section className="section">
          <h2>Diet Information</h2>
          <label>
            What is your goal?
            <select value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="">Select</option>
              <option value="gain">Gain Weight</option>
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
            </select>
          </label>
          <label>
            Diet Preference:
            <select value={dietPreference} onChange={(e) => setDietPreference(e.target.value)}>
              <option value="">Select</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
            </select>
          </label>
          <label>
            Activity Level:
            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
              <option value="">Select</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </label>
          <label>
            Budget for Meal (in ₹):
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter your budget"
            />
          </label>
          <button onClick={handleNextStep}>Next</button>
        </section>
      )}

      {step === 2 && (
        <section className="section">
          <h2>Home: Capture Image</h2>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && <img src={URL.createObjectURL(image)} alt="Uploaded food" className="food-image" />}
          <button onClick={handleFoodAnalysis}>Analyze</button>
        </section>
      )}

      {step === 3 && analysisResult && (
        <section className="section">
          <h2>Food Analysis Results & Recommendations</h2>
          <p>Food: {analysisResult.food}</p>
          <p>Calories: {analysisResult.calories} kcal</p>
          <h3>Nutrients:</h3>
          <ul className='listEle'>
            {Object.keys(analysisResult.nutrients).map((key) => (
              <li key={key}>{key}: {analysisResult.nutrients[key]}g</li>
            ))}
          </ul>

          <h3>Balanced Diet Recommendations:</h3>
          <ul className='listEle'>
            {fetchBalancedDietRecommendation().map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </section>
      )}

      {step === 4 && (
        <section className="section">
          <h2>Meal History</h2>
          <ul>
            {mealHistory.map((entry, index) => (
              <li key={index}>{entry.date}: {entry.food} - {entry.calories} kcal</li>
            ))}
          </ul>
        </section>
      )}
    </div>
    </div>
  );
}

export default App;
