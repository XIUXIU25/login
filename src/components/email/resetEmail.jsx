import React from "react";
import logo from "../../assets/We-Independent-Logo-header.svg";

const PasswordResetEmail = ({ username, resetLink }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <img src={logo} alt="Logo" style={{ width: "50px", height: "50px", marginBottom: "20px",display:"block",marginLeft:"auto",marginRight:"auto"}} />

        {/* Title */}
        <h2 style={{ color: "#333", textAlign: "left", marginBottom: "5px",marginLeft:"20px"}}>Hi {username},</h2>
        <h3 style={{ color: "#333", textAlign: "left", fontSize: "16px", marginTop: "0",marginLeft:"20px" }}>Here are your password reset instructions</h3>

                
        <div style={{ height: "10px" }}></div>
        <div style={{ height: "1px", backgroundColor: "#d3d3d3", margin: "20px 0" }}></div>

        {/* Reset Instructions */}
        <p style={{ color: "#555", fontSize: "16px", lineHeight: "1.5" }}>
          A request to reset your <strong>We Independent</strong> password has
          been made.
        </p>
        <p style={{ color: "#555", fontSize: "16px", lineHeight: "1.5" }}>
          If you did not make this request, simply ignore this email.
        </p>
        <p style={{ color: "#555", fontSize: "16px", lineHeight: "1.5" }}>
          If you did make this request, please reset your password by clicking
          the button below:
        </p>

        {/* Reset Button */}
        <a
          href={resetLink}
          style={{
            display: "inline-block",
            backgroundColor: "#FF5634",
            color: "white",
            textDecoration: "none",
            fontSize: "18px",
            padding: "12px 20px",
            borderRadius: "5px",
            marginTop: "20px",
            fontWeight: "bold",
          }}
        >
          Reset Password
        </a>

        <p style={{ color: "#555", marginTop: "20px" }}>Thank you,</p>
        <p style={{ fontWeight: "bold" }}>Team We Independent</p>

        {/* Divider */}
        <div
          style={{
            margin: "30px 0",
            height: "1px",
            background: "#ddd",
          }}
        ></div>

        {/* Footer */}
        <div style={{ fontSize: "14px", color: "#777", marginTop: "20px" }}>
          <p>
            If the button above does not work, try copying and pasting the URL
            into your browser:
          </p>
          <p>
            <a href={resetLink} style={{ color: "#FF5634", textDecoration: "none" }}>
              {resetLink}
            </a>
          </p>
          <p>
            If you continue to have problems, please{" "}
            <a
              href="mailto:weindependentweb@gmail.com"
              style={{ color: "#FF5634", textDecoration: "none" }}
            >
              Contact Us
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetEmail;