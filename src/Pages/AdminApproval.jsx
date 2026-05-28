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
    // Optional: Protect the route by checking if user is actually admin
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      navigate("/"); // Redirect non-admins back to the landing page
    } else {
      fetchRequests();
    }
  }, [navigate]);

  // ==========================================
  // APPROVE USER API CALL
  // ==========================================
  const handleApprove = async (name, ipAddress) => {
    try {
      const response = await API.post("/admin/allow", {
        name,
        ipAddress,
      });
      alert(response.data.message || `${name} has been approved.`);
      fetchRequests(); // Refresh the list after successful action
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to approve user.");
    }
  };

  // ==========================================
  // REJECT USER API CALL
  // ==========================================
  const handleReject = async (name, ipAddress) => {
    if (!window.confirm(`Are you sure you want to reject ${name}?`)) return;
    
    try {
      const response = await API.post("/admin/reject", {
        name,
        ipAddress,
      });
      alert(response.data.message || `${name} has been rejected.`);
      fetchRequests(); // Refresh the list after successful action
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to reject user.");
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
            <p className="text-gray-500 mt-2">Manage incoming website access requests.</p>
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
            <p className="mt-1 text-sm text-gray-500">You are all caught up! There are no users waiting for approval.</p>
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

              <div className="space-y-3 mb-6">
                {user.ipAddress.map((ip, i) => (
                  <div key={i} className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-md border border-gray-100">
                    <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    IP: {ip}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                {/* Assuming you want to approve/reject the first IP associated with the request */}
                <button
                  onClick={() => handleApprove(user.name, user.ipAddress[0])}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-4 rounded-xl transition-colors duration-200 flex justify-center items-center"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(user.name, user.ipAddress[0])}
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