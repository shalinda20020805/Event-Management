import React from "react";

const FeedbackCard = ({ feedback }) => {
  const cardStyle = {
    width: "100%",
    maxWidth: "300px", // Smaller card size
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "left",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const cardHoverStyle = {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
  };

  const titleStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#333",
  };

  const textStyle = {
    fontSize: "13px",
    color: "#555",
    marginBottom: "4px",
  };

  const ratingStyle = {
    fontSize: "13px",
    fontWeight: "bold",
    color: feedback.rating >= 4 ? "green" : feedback.rating >= 2 ? "orange" : "red",
  };

  return (
    <div
      style={cardStyle}
      className="feedback-card"
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
    >
      <div style={titleStyle}>⭐ Feedback from {feedback.name}</div>
      <p style={textStyle}>
        <strong>Email:</strong> {feedback.email}
      </p>
     
      <p style={textStyle}>
        <strong>Message:</strong> {feedback.message}
      </p>
    </div>
  );
};

const FeedbackView = () => {
  const feedbackData = [
    { name: "John Doe", email: "john@example.com", message: "Great service!" },
    { name: "Jane Smith", email: "jane@example.com",  message: "It was okay, needs improvement." },
    { name: "Alice Brown", email: "alice@example.com",  message: "Very satisfied with the experience!" },
    { name: "Robert Williams", email: "robert@example.com",  message: "Highly recommended!" },
    { name: "Emma Johnson", email: "emma@example.com",  message: "Could be better." },
    { name: "Michael Davis", email: "michael@example.com",  message: "Impressed by the service!" },
    { name: "Sophia Wilson", email: "sophia@example.com",  message: "Average experience." },
    { name: "Liam Brown", email: "liam@example.com", message: "Will use this again!" },
    { name: "Olivia Garcia", email: "olivia@example.com",  message: "Nice and smooth process." },
    { name: "Mason Martin", email: "mason@example.com",  message: "It was okay." },
    { name: "Isabella Lee", email: "isabella@example.com", message: "Fantastic experience!" },
    { name: "Ethan Thomas", email: "ethan@example.com",  message: "Good customer support!" },
  ];

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 cards per row
    gap: "25px", // Increased gap between cards
    padding: "30px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    justifyContent: "center",
    alignItems: "center",
  };

  const headerStyle = {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  };

  return (
    <div>
      <h2 style={headerStyle}>📝 Customer Feedback</h2>
      <div style={containerStyle}>
        {feedbackData.map((item, index) => (
          <FeedbackCard key={index} feedback={item} />
        ))}
      </div>
    </div>
  );
};

export default FeedbackView;
