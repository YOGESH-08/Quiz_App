import React, { useState } from "react";
import axios from "axios";

function Signup({ onAuthenticated }) {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullname || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/quize/register", {
        fullname: form.fullname,
        email: form.email,
        password: form.password,
      });
      setSuccess("Signup successful!");
      setError("");
      if (onAuthenticated) onAuthenticated(); 
      setForm({ fullname: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "18px" }}>
        <h3 className="mb-4 text-center text-success">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              autoComplete="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}
          <button type="submit" className="btn btn-success w-100 mt-2">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;