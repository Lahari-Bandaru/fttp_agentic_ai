// import React, { useState } from "react";
// import axios from "axios";

// function InputForm({ setResult }) {

//   const [formData, setFormData] = useState({
//     location_type: "",
//     distance_km: "",
//     terrain_type: "",
//     infra_type: "",
//     base_material_cost: 5000,
//     labor_rate_factor: 1.2,
//     pincode: ""
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await axios.post(
//       "http://127.0.0.1:8000/estimate-cost",
//       formData
//     );

//     setResult(response.data);
//   };

//   return (
//     <form onSubmit={handleSubmit}>

//       <h2>FTTP Cost Estimation</h2>

//       <select name="location_type" onChange={handleChange}>
//   <option value="">Select Location</option>
//   <option value="Urban">Urban</option>
//   <option value="Rural">Rural</option>
// </select>

// <input
//   name="distance_km"
//   placeholder="Distance (km)"
//   onChange={handleChange}
// />

// <select name="terrain_type" onChange={handleChange}>
//   <option value="">Select Terrain</option>
//   <option value="Low">Low</option>
//   <option value="Medium">Medium</option>
//   <option value="High">High</option>
// </select>

// <select name="infra_type" onChange={handleChange}>
//   <option value="">Select Infrastructure</option>
//   <option value="Aerial">Aerial</option>
//   <option value="Underground">Underground</option>
// </select>

// <input
//   name="pincode"
//   placeholder="Pincode"
//   onChange={handleChange}
// />

//       <button type="submit">Estimate Cost</button>

//     </form>
//   );
// }

// export default InputForm;

/* InputForm.css */

import React, { useState } from "react";
import axios from "axios";
import "./InputForm.css";

function InputForm({ setResult }) {
  const [formData, setFormData] = useState({
    location_type: "",
    distance_km: "",
    terrain_type: "",
    infra_type: "",
    base_material_cost: 5000,
    labor_rate_factor: 1.2,
    pincode: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.location_type) newErrors.location_type = "Please select location type";
    if (!formData.distance_km) newErrors.distance_km = "Please enter distance";
    else if (formData.distance_km <= 0) newErrors.distance_km = "Distance must be greater than 0";
    
    if (!formData.terrain_type) newErrors.terrain_type = "Please select terrain type";
    if (!formData.infra_type) newErrors.infra_type = "Please select infrastructure type";
    if (!formData.pincode) newErrors.pincode = "Please enter pincode";
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Pincode must be 6 digits";
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/estimate-cost",
        formData
      );
      
      setResult(response.data);
      
      // Show success animation
      const submitBtn = document.querySelector('.submit-btn');
      submitBtn.classList.add('success');
      setTimeout(() => submitBtn.classList.remove('success'), 2000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Failed to estimate cost. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldIcon = (fieldName) => {
    const icons = {
      location_type: "📍",
      distance_km: "📏",
      terrain_type: "⛰️",
      infra_type: "🏗️",
      pincode: "📮"
    };
    return icons[fieldName] || "•";
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>FTTP Cost Estimator</h2>
        <p className="subtitle">Fill in the details below to get accurate cost estimates</p>
      </div>
      
      <form onSubmit={handleSubmit} className="cost-estimation-form">
        <div className="form-grid">
          
          {/* Location Type */}
          <div className={`form-group ${errors.location_type ? 'error' : ''} ${activeField === 'location_type' ? 'active' : ''}`}>
            <label htmlFor="location_type">
              <span className="field-icon">{getFieldIcon('location_type')}</span>
              Location Type
            </label>
            <select 
              id="location_type"
              name="location_type" 
              value={formData.location_type}
              onChange={handleChange}
              onFocus={() => setActiveField('location_type')}
              onBlur={() => setActiveField(null)}
              className={formData.location_type ? 'filled' : ''}
            >
              <option value="">Select Location Type</option>
              <option value="Urban">🏙️ Urban</option>
              <option value="Rural">🌾 Rural</option>
            </select>
            {errors.location_type && <span className="error-message">{errors.location_type}</span>}
          </div>

          {/* Distance */}
          <div className={`form-group ${errors.distance_km ? 'error' : ''} ${activeField === 'distance_km' ? 'active' : ''}`}>
            <label htmlFor="distance_km">
              <span className="field-icon">{getFieldIcon('distance_km')}</span>
              Distance (km)
            </label>
            <input
              id="distance_km"
              type="number"
              step="0.1"
              min="0"
              name="distance_km"
              value={formData.distance_km}
              placeholder="e.g., 5.5"
              onChange={handleChange}
              onFocus={() => setActiveField('distance_km')}
              onBlur={() => setActiveField(null)}
              className={formData.distance_km ? 'filled' : ''}
            />
            {errors.distance_km && <span className="error-message">{errors.distance_km}</span>}
          </div>

          {/* Terrain Type */}
          <div className={`form-group ${errors.terrain_type ? 'error' : ''} ${activeField === 'terrain_type' ? 'active' : ''}`}>
            <label htmlFor="terrain_type">
              <span className="field-icon">{getFieldIcon('terrain_type')}</span>
              Terrain Type
            </label>
            <select
              id="terrain_type" 
              name="terrain_type"
              value={formData.terrain_type}
              onChange={handleChange}
              onFocus={() => setActiveField('terrain_type')}
              onBlur={() => setActiveField(null)}
              className={formData.terrain_type ? 'filled' : ''}
            >
              <option value="">Select Terrain Difficulty</option>
              <option value="Low">🟢 Low - Flat terrain</option>
              <option value="Medium">🟡 Medium - Rolling hills</option>
              <option value="High">🔴 High - Mountainous</option>
            </select>
            {errors.terrain_type && <span className="error-message">{errors.terrain_type}</span>}
          </div>

          {/* Infrastructure Type */}
          <div className={`form-group ${errors.infra_type ? 'error' : ''} ${activeField === 'infra_type' ? 'active' : ''}`}>
            <label htmlFor="infra_type">
              <span className="field-icon">{getFieldIcon('infra_type')}</span>
              Infrastructure Type
            </label>
            <select
              id="infra_type"
              name="infra_type"
              value={formData.infra_type}
              onChange={handleChange}
              onFocus={() => setActiveField('infra_type')}
              onBlur={() => setActiveField(null)}
              className={formData.infra_type ? 'filled' : ''}
            >
              <option value="">Select Infrastructure</option>
              <option value="Aerial">🪄 Aerial - On poles</option>
              <option value="Underground">🕳️ Underground - Buried</option>
            </select>
            {errors.infra_type && <span className="error-message">{errors.infra_type}</span>}
          </div>

          {/* Pincode */}
          <div className={`form-group full-width ${errors.pincode ? 'error' : ''} ${activeField === 'pincode' ? 'active' : ''}`}>
            <label htmlFor="pincode">
              <span className="field-icon">{getFieldIcon('pincode')}</span>
              Pincode
            </label>
            <input
              id="pincode"
              type="text"
              name="pincode"
              value={formData.pincode}
              placeholder="Enter 6-digit pincode"
              maxLength="6"
              onChange={handleChange}
              onFocus={() => setActiveField('pincode')}
              onBlur={() => setActiveField(null)}
              className={formData.pincode ? 'filled' : ''}
            />
            {errors.pincode && <span className="error-message">{errors.pincode}</span>}
          </div>
        </div>

        {errors.submit && <div className="submit-error">{errors.submit}</div>}

        <div className="form-actions">
          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Calculating...
              </>
            ) : (
              <>
                <span className="btn-icon">💰</span>
                Estimate Cost
              </>
            )}
          </button>
          
          <button 
            type="button" 
            className="reset-btn"
            onClick={() => {
              setFormData({
                location_type: "",
                distance_km: "",
                terrain_type: "",
                infra_type: "",
                base_material_cost: 5000,
                labor_rate_factor: 1.2,
                pincode: ""
              });
              setErrors({});
            }}
          >
            <span className="btn-icon">🔄</span>
            Reset
          </button>
        </div>

        <div className="form-footer">
          <p className="info-text">
            <span className="info-icon">ℹ️</span>
            All estimates are calculated based on current market rates and local factors
          </p>
        </div>
      </form>
    </div>
  );
}

export default InputForm;