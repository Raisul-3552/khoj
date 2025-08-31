import React, { useState } from 'react';
import '../css/Report.css';

function Report() {
  const [formData, setFormData] = useState({
    itemName: '',
    category: 'Electronics',
    description: '',
    dateTime: '',
    location: '',
    status: '',
    contact: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'image' ? files[0] : value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Report submitted!");
  };

  return (
    <div className="report-wrapper">
      <form className="report-card" onSubmit={handleSubmit}>
        <h2 className="form-title">Report Item</h2>

        
        <div className="form-row">
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Enter item name"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Documents</option>
              <option>Accessories</option>
              <option>Others</option>
            </select>
          </div>
        </div>

       
        <div className="form-row">
          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              placeholder="Give the description of the product Found/Lost..."
              required
            />
          </div>
        </div>
        

       
        <div className="form-row">
          <div className="form-group">
            <label>Date & Time</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Location (Where Lost/Found)</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
            />
          </div>
        </div>

       
        <div className="form-row">
          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Status --</option>
              <option>Lost</option>
              <option>Found</option>
            </select>
          </div>

          <div className="form-group">
            <label>Contact Information</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter phone or email"
              required
            />
          </div>
        </div>

        
        <div className="form-row">
          <div className="form-group full-width">
            <label>Upload Image (if available)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
        </div>

       
        <button type="submit" className="submit-button">
          Report Item
        </button>
      </form>
    </div>
  );
}

export default Report;
