import React, { useState } from "react";
import axios from "axios";

function Signin({ onAuthenticated }) {
  const [form, setForm] = useState({
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
    if (!form.email || !form.password) {
      setError("Both fields are required.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/quize/login", {
         loginEmail: form.email,
  loginPassword: form.password,
      });
      setSuccess("Signin successful!");
      setError("");
      setForm({ email: "", password: "" });
      if (onAuthenticated) onAuthenticated();
    } catch (err) {
      setError(err.response?.data?.message || "Signin failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "18px" }}>
        <h3 className="mb-4 text-center text-primary">Sign In</h3>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary w-100 mt-2">Sign In</button>
        </form>
      </div>
    </div>
  );
}
export default Signin;