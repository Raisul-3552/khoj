import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'image' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!formData.image) {
      setLoading(false);
      setMessage('Please upload a picture of the item to complete the report.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('itemName', formData.itemName);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('dateTime', formData.dateTime);
    data.append('location', formData.location);
    data.append('status', formData.status);
    data.append('contact', formData.contact);
    data.append('image', formData.image);

    try {
      await axios.post('http://localhost:5000/api/report', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Report submitted successfully!');
      setFormData({
        itemName: '',
        category: 'Electronics',
        description: '',
        dateTime: '',
        location: '',
        status: '',
        contact: '',
        image: null,
      });
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error submitting report:', error);
      setMessage(error.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-wrapper">
      <form className="report-card" onSubmit={handleSubmit}>
        <h2 className="form-title">Report Item</h2>

        {message && (
          <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

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
            <label>Upload Image <span style={{color: "red"}}>(required)</span></label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Report Item'}
        </button>
      </form>
    </div>
  );
}

export default Report;
