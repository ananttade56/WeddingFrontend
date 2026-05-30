// ==========================================
// src/pages/LandingPage.jsx
// ==========================================

import { useState, useEffect } from "react"; // NEW: Imported useEffect
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import fpPromise from "@fingerprintjs/fingerprintjs"; // NEW: Imported FingerprintJS

const LandingPage = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [visitorId, setVisitorId] = useState(""); // NEW: State to store the device ID

  const navigate = useNavigate();

  // ==========================================
  // NEW: GENERATE DEVICE ID ON PAGE LOAD
  // ==========================================
  useEffect(() => {
    const getFingerprint = async () => {
      const fp = await fpPromise.load();
      const result = await fp.get();
      setVisitorId(result.visitorId);
    };
    getFingerprint();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Please enter name");
      return;
    }

    // NEW: Ensure the ID is ready before submitting
    if (!visitorId) {
      alert("Still verifying device securely. Please wait a second and try again.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // ==========================================
      // CHECK USER ACCESS (UPDATED)
      // ==========================================
      // Added visitorId to the URL parameters
      const response = await API.get(`/?name=${name}&visitorId=${visitorId}`);

      console.log(response.data);

      // USER APPROVED
      if (response.data.success) {
        localStorage.setItem("userName", name);

        // ==========================================
        // ADMIN CHECK INTEGRATION
        // ==========================================
        if (response.data.isAdmin) {
          localStorage.setItem("isAdmin", "true");
        } else {
          localStorage.setItem("isAdmin", "false");
        }

        navigate("/home");
      }
    } catch (error) {
      console.log(error);

      // ==========================================
      // SEND ACCESS REQUEST (UPDATED)
      // ==========================================
      try {
        const requestResponse = await API.post("/request/user", {
          name,
          visitorId, // NEW: Added visitorId to the request body
        });

        console.log(requestResponse.data);

        setMessage(requestResponse.data.message);

        setTimeout(() => {
          navigate("/pending");
        }, 1500);
      } catch (err) {
        console.log(err);

        setMessage(err.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Enter your name to access website
        </p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-6 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
        >
          {loading ? "Please wait..." : "Submit"}
        </button>

        {message && (
          <div className="mt-5 bg-gray-100 p-3 rounded-lg text-center text-sm text-gray-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;