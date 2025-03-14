import React from "react";
import logo from "../../assets/We-Independent-Logo-header.svg";

const PasswordResetEmail = ({ username, resetLink }) => {
  return (
    <div style={{ margin: "20px" }}>
      <div className="flex-col space-y-20 ">
        {/* Icon */}
        <img src={logo} alt="Logo" style={{ width: "50px", height: "50px", marginBottom: "20px",display:"block",marginLeft:"auto",marginRight:"auto"}} />

        {/* Title */}
        <h3>Hi {username},</h3>
        <h3>Here are your password reset instructions</h3>

                
        <div style={{ height: "5px" }}></div>
        <div style={{ height: "1px", backgroundColor: "#d3d3d3", margin: "20px 0" }}></div>
        
        {/* Reset Instructions */}
        <p style={{ color: "#555", fontSize: "16px", lineHeight: "1.5" }}>
          A request to reset your We Independent password has
          been made. If you did not make this request, simply ignore this email.If you did make this request, please reset your password by clicking
          the button below:
        </p>

        {/* Reset Button */}
        <button className="w-[220px]" style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}>
         Reset Password
        </button>

        <p style={{ color: "#555", marginTop: "20px" }}>Thank you,</p>
        <p >Team We Independent</p>

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
            into your browser.If you continue to have problems, please{" "}
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