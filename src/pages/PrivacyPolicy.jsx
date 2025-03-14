import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Privacy Policy</h1>
      <Button 
        onClick={() => navigate(-1)} 
        style={{ marginTop: '1rem', backgroundColor: "#FF5634", color: "white" }}
      >
        Back
      </Button>
    </div>
  );
};

export default PrivacyPolicy;