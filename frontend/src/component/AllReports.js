import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AllReports.css"; // We'll create this CSS file

const API_URL = "http://localhost:5000/api/report/all";

function AllReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(API_URL);
        setReports(res.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const lost = reports.filter((r) => r.status === "Lost");
  const found = reports.filter((r) => r.status === "Found");

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    return new Date(dateTimeString).toLocaleString();
  };

  const ReportCard = ({ report }) => (
    <div 
      className="report-card" 
      onClick={() => setSelectedReport(report)}
    >
      <div className="report-header">
        <h3 className="item-name">{report.itemName}</h3>
        <span className={`status-badge ${report.status.toLowerCase()}`}>
          {report.status}
        </span>
      </div>
      
      <div className="report-details">
        <p className="category"><strong>Category:</strong> {report.category}</p>
        <p className="location"><strong>Location:</strong> {report.location}</p>
        <p className="date"><strong>Date:</strong> {formatDateTime(report.dateTime)}</p>
        <p className="contact"><strong>Contact:</strong> {report.contact}</p>
      </div>

      {report.image && (
        <div className="image-preview">
          <img 
            src={`http://localhost:5000${report.image}`} 
            alt={report.itemName}
            className="report-image"
          />
        </div>
      )}

      <div className="description-preview">
        <p>{report.description?.substring(0, 100)}...</p>
      </div>
    </div>
  );

  const ReportModal = ({ report, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>{report.itemName}</h2>
          <span className={`status-badge large ${report.status.toLowerCase()}`}>
            {report.status}
          </span>
        </div>

        <div className="modal-body">
          <div className="modal-grid">
            <div className="modal-info">
              <div className="info-group">
                <h4>Details</h4>
                <p><strong>Category:</strong> {report.category}</p>
                <p><strong>Location:</strong> {report.location}</p>
                <p><strong>Date & Time:</strong> {formatDateTime(report.dateTime)}</p>
                <p><strong>Contact:</strong> {report.contact}</p>
              </div>

              <div className="info-group">
                <h4>Description</h4>
                <p className="full-description">{report.description}</p>
              </div>
            </div>

            {report.image && (
              <div className="modal-image">
                <img 
                  src={`http://localhost:5000${report.image}`} 
                  alt={report.itemName}
                  className="full-image"
                />
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <p className="report-id"><small>Report ID: {report._id}</small></p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="all-reports-container">
      <div className="reports-header">
        <h1>Lost & Found Reports</h1>
        <p className="total-count">Total: {reports.length} reports</p>
      </div>

      <div className="reports-grid">
        <div className="reports-column">
          <div className="column-header">
            <h2>Lost Items ({lost.length})</h2>
          </div>
          {lost.length === 0 ? (
            <div className="empty-state">
              <p>No lost items reported yet.</p>
            </div>
          ) : (
            lost.map((report) => (
              <ReportCard key={report._id} report={report} />
            ))
          )}
        </div>

        <div className="reports-column">
          <div className="column-header">
            <h2>Found Items ({found.length})</h2>
          </div>
          {found.length === 0 ? (
            <div className="empty-state">
              <p>No found items reported yet.</p>
            </div>
          ) : (
            found.map((report) => (
              <ReportCard key={report._id} report={report} />
            ))
          )}
        </div>
      </div>

      {selectedReport && (
        <ReportModal 
          report={selectedReport} 
          onClose={() => setSelectedReport(null)} 
        />
      )}
    </div>
  );
}

export default AllReports;