import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
  if (/[0-9!@#$%^&*]/.test(password)) strength++;
  return strength;
};

const ResetYourPassword = ({ visible, onClose }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setStep(2);
  };
  
  const handleBackToLogin = () => {
    navigate("/login");
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ["Weak", "Medium", "Strong"];
  const strengthColors = ["#ff4d4f", "#faad14", "#52c41a"];

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
      title={
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "28px",
            marginTop: "1rem",
          }}
        >
          {step === 1 ? "Reset Your Password" : "Password changed!"}
        </h1>
      }
    >
      {step === 1 ? (
        <>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            Enter a new password to update your account securely.
          </div>
          <Form onFinish={handleSubmit} layout="vertical" style={{ maxWidth: "80%", margin: "auto" }}>
            <Form.Item
              label={<span style={{ color: "grey" }}>Password</span>}
              name="password"
              required={false}
            >
              <Input.Password
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
              {password && (
                <>
                  <div style={{ display: "flex", alignItems: "center", marginTop: "2px" }}>
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        style={{
                          flex: 1,
                          height: "4px",
                          marginRight: index < 2 ? "2px" : "0",
                          backgroundColor: index < strength ? strengthColors[strength - 1] : "#e0e0e0",
                        }}
                      ></div>
                    ))}
                  </div>
                  <div style={{ textAlign: "right", fontSize: "12px", marginTop: "5px", color: strengthColors[strength - 1] }}>
                    {strength > 0 ? strengthLabels[strength - 1] : ""}
                  </div>
                  <div style={{ fontSize: "12px", textAlign: "center", marginTop: "5px" }}>
                    Minimum of 6 characters with upper and lowercase letters and a number or a symbol.
                  </div>
                </>
              )}
            </Form.Item>
            <Form.Item
              label={<span style={{ color: "grey" }}>Confirm Password</span>}
              name="confirmPassword"
              required={false}
            >
              <Input.Password 
                placeholder="Confirm your password" 
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
              />
            </Form.Item>
            {error && <div style={{ color: "#ff4d4f", textAlign: "center", marginBottom: "1rem" }}>{error}</div>}
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                htmlType="submit"
                size="large"
                block
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#FF5634",
                  color: "white",
                  borderRadius: "100px",
                }}
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            Your password has been changed successfully.
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              size="large"
              onClick={handleBackToLogin}
              style={{
                backgroundColor: "#FF5634",
                color: "white",
                borderRadius: "100px",
              }}
            >
              Back to Login
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ResetYourPassword;