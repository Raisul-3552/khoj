import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/Profile.css"; // Make sure you create this CSS file

const API_URL = "http://localhost:5000/api/auth"; // Your backend auth URL

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [editMode, setEditMode] = useState(false);

  // Fetch profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/"); // Redirect to home if not logged in

      try {
        const res = await axios.get(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user || res.data); // Depending on backend response
        setFormData({
          name: res.data.user?.name || res.data.name,
          phone: res.data.user?.phone || res.data.phone,
          address: res.data.user?.address || res.data.address,
        });
      } catch {
        navigate("/"); // Redirect to home if error
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(`${API_URL}/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user || res.data);
      setEditMode(false);
    } catch {
      alert("Update failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/"); // Redirect to home page
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className={styles.profileContainer}>
      <h2>My Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>

      {editMode ? (
        <div className={styles.editForm}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <button className={styles.saveBtn} onClick={handleUpdate}>Save</button>
          <button className={styles.cancelBtn} onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div className={styles.viewInfo}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <button className={styles.editBtn} onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}

      <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
