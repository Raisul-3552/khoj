import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Registration.module.css";

const API_URL = "http://localhost:5000/api/auth";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePic: file }));
      setPreview(URL.createObjectURL(file));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.profilePic;
        return newErrors;
      });
    } else {
      setFormData((prev) => ({ ...prev, profilePic: null }));
      setPreview(null);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    )
      newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.profilePic) newErrors.profilePic = "Profile image is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("address", formData.address);
      data.append("password", formData.password);
      data.append("profilePic", formData.profilePic);

      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        body: data,
      });

      if (res.ok) navigate("/login");
    } catch (err) {}
    setLoading(false);
  };

  const password = formData.password;
  const showUpper = !/[A-Z]/.test(password);
  const showLower = !/[a-z]/.test(password);
  const showLength = password.length < 6;

  return (
    <div className={styles.registrationPage}>
      <div className={styles.registrationBox}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? styles.invalid : ""}
            />
            {errors.name && <div className={styles.error}>{errors.name}</div>}
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.invalid : ""}
            />
            {errors.email && (
              <div className={styles.error}>{errors.email}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? styles.invalid : ""}
            />
            {errors.phone && (
              <div className={styles.error}>{errors.phone}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? styles.invalid : ""}
            />
            {errors.address && (
              <div className={styles.error}>{errors.address}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles.invalid : ""}
            />
            <div className={styles.error}>
              {showUpper && <div>• Minimum 1 uppercase letter required</div>}
              {showLower && <div>• Minimum 1 lowercase letter required</div>}
              {showLength && <div>• Minimum length 6 required</div>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? styles.invalid : ""}
            />
            {errors.confirmPassword && (
              <div className={styles.error}>{errors.confirmPassword}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Profile Picture</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {errors.profilePic && (
              <div className={styles.error}>{errors.profilePic}</div>
            )}
            {preview && (
              <img src={preview} alt="preview" className={styles.preview} />
            )}
          </div>

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
