import React, { useState } from "react";
import axios from "axios";
import styles from "../css/Registration.module.css";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", password: "", confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone required";
    if (!formData.address.trim()) newErrors.address = "Address required";
    if (!formData.password) newErrors.password = "Password required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post(`${API_URL}/register`, formData);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={styles.registrationPage}>
      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={`form-control ${errors.name ? "is-invalid" : ""}`} />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={`form-control ${errors.email ? "is-invalid" : ""}`} />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label>Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={`form-control ${errors.phone ? "is-invalid" : ""}`} />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <div className="mb-3">
            <label>Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} className={`form-control ${errors.address ? "is-invalid" : ""}`} />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className={`form-control ${errors.password ? "is-invalid" : ""}`} />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="mb-3">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`} />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
