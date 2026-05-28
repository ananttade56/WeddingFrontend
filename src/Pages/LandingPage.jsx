// ==========================================
// src/pages/LandingPage.jsx
// ==========================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Please enter name");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // ==========================================
      // CHECK USER ACCESS
      // ==========================================
      const response = await API.get(`/?name=${name}`);

      console.log(response.data);

      // USER APPROVED
      if (response.data.success) {
        localStorage.setItem("userName", name);

        // ==========================================
        // ADMIN CHECK INTEGRATION
        // ==========================================
        // If the backend says this user is the admin, save the flag
        if (response.data.isAdmin) {
          localStorage.setItem("isAdmin", "true");
        } else {
          // Ensure standard users don't accidentally keep admin privileges 
          // if you log out and log back in as someone else
          localStorage.setItem("isAdmin", "false"); 
        }

        navigate("/home");
      }
    } catch (error) {
      console.log(error);

      // ==========================================
      // SEND ACCESS REQUEST
      // ==========================================
      try {
        const requestResponse = await API.post(
          "/request/user",
          {
            name,
          }
        );

        console.log(requestResponse.data);

        setMessage(requestResponse.data.message);

        setTimeout(() => {
          navigate("/pending");
        }, 1500);
      } catch (err) {
        console.log(err);

        setMessage(
          err.response?.data?.message ||
            "Something went wrong"
        );
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