// Profile.js (completely redesigned)
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaSave, FaSignOutAlt, FaTimes, FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { MdReportProblem, MdCheckCircle, MdUpload } from "react-icons/md";
import "../css/Profile.css";

const API_URL = "http://localhost:5000/api/auth";
const REPORT_API_URL = "http://localhost:5000/api/report";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [error, setError] = useState("");
  const [reportsError, setReportsError] = useState("");
  const [myReports, setMyReports] = useState([]);

  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view your profile.");
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const u = res.data.user || res.data;
      setUser(u);
      setFormData({ name: u.name, phone: u.phone, address: u.address });
      setPreview(u.profilePic ? `http://localhost:5000${u.profilePic}` : null);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile.");
      navigate("/");
    }
    setLoading(false);
  }, [navigate]);

  const fetchMyReports = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setReportsLoading(true);
    try {
      const res = await axios.get(`${REPORT_API_URL}/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyReports(res.data);
      setReportsError("");
    } catch (err) {
      setReportsError(err.response?.data?.message || "Failed to load reports.");
    }
    setReportsLoading(false);
  }, []);

  useEffect(() => {
    fetchProfile();
    fetchMyReports();
  }, [fetchProfile, fetchMyReports]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    if (profilePicFile) data.append("profilePic", profilePicFile);

    setLoading(true);
    try {
      const res = await axios.put(`${API_URL}/profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(res.data.user || res.data);
      setEditMode(false);
      setPreview(res.data.user?.profilePic ? `http://localhost:5000${res.data.user.profilePic}` : preview);
      setProfilePicFile(null);
      setFormData({ name: res.data.user.name, phone: res.data.user.phone, address: res.data.user.address });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setProfilePicFile(null);
    setPreview(user.profilePic ? `http://localhost:5000${user.profilePic}` : null);
    setFormData({ name: user.name, phone: user.phone, address: user.address });
  };

  const handleDeleteReport = async (reportId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      await axios.delete(`${REPORT_API_URL}/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyReports(myReports.filter((report) => report._id !== reportId));
      setReportsError("");
    } catch (err) {
      setReportsError(err.response?.data?.message || "Failed to delete report.");
    }
  };

  const handleEditReport = (report) => {
    navigate(`/edit-report/${report._id}`, { state: { report } });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <div className="loader">Loading profile...</div>;
  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-bg">
        <div className="profile-card">
          <div className="profile-header">
            <h2>My Profile</h2>
            <button className="logout-btn" onClick={handleLogout} title="Logout" aria-label="Logout">
              <FaSignOutAlt /> Logout
            </button>
          </div>
          
          <div className="profile-pic-section">
            <div className="profile-pic-container">
              <img
                src={preview || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"}
                alt="Profile"
                className="profile-pic"
              />
              {editMode && (
                <label className="profile-pic-upload">
                  <MdUpload />
                  <input type="file" accept="image/*" onChange={handleFileChange} aria-label="Profile picture upload" />
                </label>
              )}
            </div>
          </div>
          
          {error && <div className="error-message">{error}</div>}

          {editMode ? (
            <div className="edit-form">
              <div className="form-group">
                <label>
                  <FaUser /> Name
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} aria-label="Name" />
              </div>
              
              <div className="form-group">
                <label>
                  <FaPhone /> Phone
                </label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} aria-label="Phone" />
              </div>
              
              <div className="form-group">
                <label>
                  <FaMapMarkerAlt /> Address
                </label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} aria-label="Address" />
              </div>
              
              <div className="btn-row">
                <button className="btn-primary" onClick={handleUpdate} disabled={loading} title="Save" aria-label="Save profile changes">
                  <FaSave /> Save Changes
                </button>
                <button className="btn-secondary" onClick={handleCancel} title="Cancel" aria-label="Cancel profile changes">
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="view-info">
              <div className="info-item">
                <FaUser />
                <div>
                  <span className="info-label">Name</span>
                  <span className="info-value">{user.name}</span>
                </div>
              </div>
              
              <div className="info-item">
                <FaPhone />
                <div>
                  <span className="info-label">Phone</span>
                  <span className="info-value">{user.phone}</span>
                </div>
              </div>
              
              <div className="info-item">
                <FaMapMarkerAlt />
                <div>
                  <span className="info-label">Address</span>
                  <span className="info-value">{user.address}</span>
                </div>
              </div>
              
              <button className="btn-primary" onClick={() => setEditMode(true)} title="Edit Profile" aria-label="Edit profile">
                <FaEdit /> Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User Reports Section */}
      <div className="reports-section">
        <h3>My Lost & Found Reports</h3>
        {reportsLoading ? (
          <div className="loader">Loading reports...</div>
        ) : reportsError ? (
          <div className="error-message">{reportsError}</div>
        ) : myReports.length === 0 ? (
          <div className="no-reports">
            <MdReportProblem size={48} />
            <p>You have not submitted any reports yet.</p>
          </div>
        ) : (
          <div className="report-grid">
            {myReports.map((r) => (
              <ReportCard 
                key={r._id} 
                report={r} 
                onEdit={handleEditReport} 
                onDelete={handleDeleteReport} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ReportCard = ({ report, onEdit, onDelete }) => {
  const { _id, itemName, status, category, location, dateTime, contact, image, description } = report;
  
  return (
    <div className="report-card">
      <div className="report-header">
        <h4>{itemName}</h4>
        <span className={`status ${status.toLowerCase()}`}>
          {status === "Lost" ? <MdReportProblem /> : <MdCheckCircle />}
          {status}
        </span>
      </div>
      
      <div className="report-meta">
        <span>{category}</span>
        <span>{location}</span>
      </div>
      
      {dateTime && (
        <div className="report-date">
          {new Date(dateTime).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      )}
      
      <div className="report-contact">Contact: {contact}</div>
      
      {image && (
        <img
          src={`http://localhost:5000${image}`}
          alt={itemName}
          className="report-image"
        />
      )}
      
      {description && <p className="report-desc">{description}</p>}
      
      <div className="report-actions">
        <button className="btn-outline" onClick={() => onEdit(report)} title="Edit Report" aria-label={`Edit report for ${itemName}`}>
          <FaEdit /> Edit
        </button>
        <button className="btn-danger" onClick={() => onDelete(_id)} title="Delete Report" aria-label={`Delete report for ${itemName}`}>
          <FaTimes /> Delete
        </button>
      </div>
    </div>
  );
};

export default Profile;