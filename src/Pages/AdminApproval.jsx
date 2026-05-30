// ==========================================
// WeddingFrontend/src/Pages/AdminApproval.jsx
// ==========================================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminApproval = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  // ==========================================
  // FETCH PENDING REQUESTS
  // ==========================================
  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/admin/requests");
      
      if (response.data && response.data.success) {
        setRequests(response.data.data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load requests. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Protect the route by checking if user is actually admin
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      navigate("/"); // Redirect non-admins back to the landing page
    } else {
      fetchRequests();
    }
  }, [navigate]);

  // ==========================================
  // APPROVE USER API CALL (UPDATED FOR FINGERPRINT)
  // ==========================================
  const handleApprove = async (name, visitorId) => {
    try {
      const response = await API.post("/admin/allow", {
        name,
        visitorId, // UPDATED: Changed from ipAddress to visitorId
      });
      alert(response.data.message || `${name}'s device has been approved.`);
      fetchRequests(); // Refresh the list after successful action
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to approve user device.");
    }
  };

  // ==========================================
  // REJECT USER API CALL (UPDATED FOR FINGERPRINT)
  // ==========================================
  const handleReject = async (name, visitorId) => {
    if (!window.confirm(`Are you sure you want to reject this device request for ${name}?`)) return;
    
    try {
      const response = await API.post("/admin/reject", {
        name,
        visitorId, // UPDATED: Changed from ipAddress to visitorId
      });
      alert(response.data.message || `${name}'s device request has been rejected.`);
      fetchRequests(); // Refresh the list after successful action
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to reject user device.");
    }
  };

  // ==========================================
  // UI RENDER
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-['Montserrat',sans-serif]">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500 mt-2">Manage incoming website access requests by device identification.</p>
          </div>
          <button 
            onClick={() => navigate("/home")}
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 px-4 py-2 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Error / Loading States */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading requests...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-center border border-red-200">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && requests.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No pending requests</h3>
            <p className="mt-1 text-sm text-gray-500">You are all caught up! There are no device fingerprints waiting for approval.</p>
          </div>
        )}

        {/* Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {!loading && requests.map((user, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 capitalize">{user.name}</h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-2">
                    {user.status || "Pending"}
                  </span>
                </div>
              </div>

              {/* UPDATED: Loop over user.fingerprints instead of user.ipAddress */}
              <div className="space-y-3 mb-6">
                {user.fingerprints && user.fingerprints.map((fingerprint, i) => (
                  <div key={i} className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-md border border-gray-100 break-all">
                    <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11a5 5 0 00-10 0c0 .265.011.528.031.789m15.969 0a14.003 14.003 0 01-1.537 6.45M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ID: {fingerprint}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                {/* UPDATED: Passing the first fingerprint identification token associated with the request */}
                <button
                  onClick={() => handleApprove(user.name, user.fingerprints[0])}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-4 rounded-xl transition-colors duration-200 flex justify-center items-center"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(user.name, user.fingerprints[0])}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2.5 px-4 rounded-xl transition-colors duration-200 flex justify-center items-center"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminApproval;