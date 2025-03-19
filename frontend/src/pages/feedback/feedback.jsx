import React, { useState } from "react";

const feedback = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", feedback);
    alert("Thank you for your feedback!");
    setFeedback({ name: "", email: "", message: ""});
  };

  const pageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  };

  const formStyle = {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    textAlign: "center",
  };

  const labelStyle = {
    display: "block",
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  };

  const textareaStyle = {
    ...inputStyle,
    height: "100px",
    resize: "none",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  return (
    <div style={pageStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: "15px", color: "#333" }}>Feedback Form</h2>

        <label style={labelStyle} htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={feedback.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle} htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={feedback.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />

       
       
        <label style={labelStyle} htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={feedback.message}
          onChange={handleChange}
          style={textareaStyle}
          required
        />

        <button
          type="submit"
          style={{ ...buttonStyle }}
          onMouseOver={(e) => (e.target.style.background = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.background = buttonStyle.backgroundColor)}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default feedback;
