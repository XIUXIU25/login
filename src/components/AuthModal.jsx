/*
 * 认证模态框组件 - 处理用户登录和注册流程
 * Author: Yifan/Evan, Chunjingwen(Aria) Cui
 * Created: Tue Feb 25 2025
 * Updated: Tue Mar 12 2025
 */

import React, { useState, useEffect } from "react"
import { Modal, Form, Input, Button, Divider, Checkbox, Select, Space } from "antd"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import { google_client_id } from "../utils/config.js"
import { GoogleLoginURL } from "../utils/config.js"
import { Link } from "react-router-dom"
// import jwtDecode from 'jwt-decode'
import { FcGoogle } from "react-icons/fc"
import { checkPasswordStrength } from "../utils/passwordStrength.js"
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
// TODO: import { FaApple } from "react-icons/fa" Stop Apple Integration for now
import "../styles/fonts.css"

// 选项数据 - 语言选项
const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'chinese', label: '中文' },
  { value: 'spanish', label: 'Español' }
];

/**
 * 
 * @param {Object} options - The options object
 * @param {boolean} options.visible - The visibility of the modal
 * @param {Function} options.onContinue - The function to call when the user continues
 * @param {string} options.type - The type of the modal
 * @returns {JSX.Element} The AuthModal component  
 */

const AuthModal = ({ visible, onClose, type, setModalType }) => {
  // check if the modal is visible and type of modal 
  console.log(visible, type) //-------------- False/True, Sign Up/Log In
  // console.log(google_client_id) ----------- [orginate from google cloud platform]

   // ================ 状态管理 ================
  const [form] = Form.useForm()
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const [rememberMe, setRememberMe] = useState(true)
  // 注册步骤状态 (1: 邮箱密码, 2: 用户信息)
  const [step, setStep] = useState(1) 
  // 密码强度状态
  const [passwordStrength, setPasswordStrength] = useState({ level: '', score: 0, criteria: {} })
  // 忘记密码流程状态
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  // 订阅状态
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false)
  // 保存注册第一步的表单数据
  const [signupData, setSignupData] = useState({})


  // ================ 事件处理函数 ================

  /**
   * 处理 "Remember Me" 选项变更
   * @param {Event} e - 事件对象
   */
  const onRememberMeChange = (e) => {
    setRememberMe(e.target.checked)
  }

  // 处理密码输入变化，实时更新密码强度
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    if (password) {
      const strength = checkPasswordStrength(password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ level: '', score: 0, criteria: {} });
    }
  };

  /**
   * 获取密码强度对应的颜色
   * @returns {string} 颜色代码
   */
  const getStrengthColor = () => {
    switch (passwordStrength.level) {
      case 'Weak':
        return '#ff4d4f'; // 红色
      case 'Medium':
        return '#faad14'; // 黄色
      case 'Strong':
        return '#52c41a'; // 绿色
      default:
        return '#d9d9d9'; // 默认灰色
    }
  };

  /**
   * 表单提交处理
   * @param {Object} values - 表单值
   */
  const onFinish = (values) => {
    // 注册逻辑
    if (type === "Sign Up") {
      if (step === 1) {
        // 第一步: 邮箱和密码验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        let hasErrors = false;
      
        // 检查邮箱格式
        if (!emailRegex.test(values.email)) {
          form.setFields([
            { name: "email", errors: ["Incorrect or invalid info"] }
          ]);
          hasErrors = true;
        }
        
        // 检查密码格式
        if (!strongPasswordRegex.test(values.password)) {
          form.setFields([
            { name: "password", errors: ["Incorrect or invalid info"] }
          ]);
          hasErrors = true;
        }
        
        if (hasErrors) {
          return;
        }
        // 保存第一步数据
        setSignupData({
          email: values.email,
          password: values.password,
          subscribe: values.subscribe || false
        });
        setStep(2); // 进入第二步
      } else {
        // 第二步: 用户名和语言验证
        if (!values.username || !values.language) {
          form.setFields([
            { name: "username", errors: values.username ? [] : ["Username is required"] },
            { name: "language", errors: values.language ? [] : ["Language preference is required"] },
          ]);
          return;
        }
        // 合并第一步和第二步的数据
        const finalData = {
          ...signupData,
          username: values.username,
          language: values.language,
          visaType: values.visaType
        };
        console.log("Final Sign Up Data:", finalData);

        // 注册成功后，设置用户为登录状态
        const newUser = {
          id: Date.now().toString(), // 临时ID，实际应该由后端生成
          username: values.username,
          email: signupData.email,
          avatar: null, // 默认头像，暂时为null
          language: values.language
        };
        
        // 更新全局用户状态
        setUser(newUser);
        setIsLoggedIn(true);
        
        // 关闭模态框
        onClose();
      }
    } else {
      // 登录逻辑
      console.log("Log In", values);
      
      // 模拟登录成功
      const loggedInUser = {
        id: Date.now().toString(),
        username: "User", // 临时名称，应当从后端获取
        email: values.email,
        avatar: null,
      };
      
      // 更新全局用户状态
      setUser(loggedInUser);
      setIsLoggedIn(true);
      
      onClose();
    }
  };

  /**
   * 处理忘记密码表单提交
   * @param {Object} values - 表单值
   */
  const handleForgotPasswordSubmit = (values) => {
    if (forgotPasswordStep === 1) {
      setForgotPasswordEmail(values.email);
      setForgotPasswordStep(2);
    }
  };

  /**
   * 返回到忘记密码第一步
   */
  const handleChangeEmail = () => {
    setForgotPasswordStep(1);
  };

  /**
   * 重新发送邮件
   */
  const handleResendEmail = () => {
    console.log("Resending email to:", forgotPasswordEmail);
    // 这里可以添加重新发送邮件的逻辑
  };

  /**
   * 切换登录/注册模式
   */
  const onSwitchType = () => {
    setModalType(type === "Sign Up" ? "Log In" : "Sign Up")
    setStep(type === "Sign Up" ? 1 : step) // Reset step
    form.resetFields();
    setPasswordStrength({ level: '', score: 0, criteria: {} });
  }

  /**
   * 返回到注册第一步
   */
  const handleGoBack = () => {
    setStep(1);
  };

  /**
   * 处理谷歌登录
   */
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log('Google login success:', response)
      // Handle success (e.g., send token to backend)
    },
    onError: (error) => {
      console.error('Google login error:', error)
    },
  })

  /**
   * 打开忘记密码模态框
   */
  const openForgotPassword = () => {
    // 先关闭当前的登录模态框
    onClose();
    // 然后打开忘记密码模态框
    setShowForgotPassword(true);
  };

  /**
   * 关闭忘记密码模态框
   */
  const closeForgotPassword = () => {
    setShowForgotPassword(false);
    setForgotPasswordStep(1);
    setForgotPasswordEmail("");
  };

  // ================ 渲染函数 ================

  // 渲染忘记密码模态框
  const renderForgotPasswordModal = () => {
    return (
      <Modal
        open={showForgotPassword}
        onCancel={closeForgotPassword}
        footer={null}
        centered
        width={500}
        title={
          <h1 style={{
            textAlign: "center",
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "28px",
            marginTop: "1rem",
          }}>
            {forgotPasswordStep === 1 ? "Forget Password?" : "Email Sent"}
          </h1>
        }
      >
        {forgotPasswordStep === 1 ? (
          <Form onFinish={handleForgotPasswordSubmit} layout="vertical" 
          style={{ 
            maxWidth: "80%", margin: "auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              Don't worry we will send you reset instruction
            </div>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email!' }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                htmlType="submit"
                size="large"
                block
                style={{ marginTop: "1rem", backgroundColor: "#FF5634", color: "white", borderRadius: "100px" }}
              >
                Send Reset Instruction
              </Button>
            </Form.Item>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Space>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FF5634" }}></div>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#d9d9d9" }}></div>
              </Space>
            </div>
          </Form>
        ) : (
          <div style={{ textAlign: "center", maxWidth: "80%", margin: "auto" }}>
            <p>We sent an email to {forgotPasswordEmail}!</p>
            <p>If this email is connected to a We Independent account, you'll be able to reset your password.</p>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem", width: "100%" }}>
            <Button 
              onClick={handleChangeEmail} 
              size="large" 
              style={{ borderRadius: "100px",  flex: 1, minWidth: "220px" }}
            >
              Change email address
            </Button>
            <Button 
              onClick={handleResendEmail} 
              size="large" 
              style={{ borderRadius: "100px",  flex: 1, minWidth: "220px" }}
            >
              Resend Email
            </Button>
          </div>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Space>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#d9d9d9" }}></div>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FF5634" }}></div>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    );
  };

  // 渲染密码强度指示器
  const renderPasswordStrength = () => {
    if (!form.getFieldValue('password')) return null;
    
    return (
    <div style={{ marginTop: "-1rem", marginBottom: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        {/* 将进度条分为三段 */}
        <div style={{ display: "flex", flex: 1, gap: "4px" }}>
          <div style={{ 
            flex: 1, 
            height: "8px", 
            backgroundColor: passwordStrength.score >= 1 ? getStrengthColor() : "#f0f0f0",
            borderRadius: "4px"
          }}></div>
          <div style={{ 
            flex: 1, 
            height: "8px", 
            backgroundColor: passwordStrength.score >= 2 ? getStrengthColor() : "#f0f0f0",
            borderRadius: "4px"
          }}></div>
          <div style={{ 
            flex: 1, 
            height: "8px", 
            backgroundColor: passwordStrength.score >= 3 ? getStrengthColor() : "#f0f0f0",
            borderRadius: "4px"
          }}></div>
        </div>
        <div style={{ marginLeft: "10px", color: getStrengthColor(),  minWidth: "70px", textAlign: "right" }}>
          {passwordStrength.level}
        </div>
      </div>
      <div style={{ fontSize: "12px", color: "#9A9A9A"}}>
        Minimum of 6 characters, with upper and lowercase and a number, or a symbol.
      </div>
    </div>
  );
};

  // 渲染注册第二步表单
  const renderSignUpStep2 = () => {
    return (
      <>
        <div
          style={{
            fontFamily: "Mulish",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0%",
            textAlign: "center",
            marginBottom: "2rem",
            fontWeight: 300
          }}
        >
          Welcome! Start your new journey in
          <span style={{ color: "#FF5634" }}> We Independent</span>
        </div>
        
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: "50%", margin: "auto", color: "#9A9A9A" }}
          initialValues={{ email: signupData.email }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          
          <Form.Item
            label="Language Preference"
            name="language"
            rules={[{ required: true, message: 'Select your language preference' }]}
          >
            <Select placeholder="Select your preferred language" options={languageOptions} />
          </Form.Item>
          
          <Form.Item
            label="What is your dependent visa type? (Optional)"
            name="visaType"
          >
            <Input  />
          </Form.Item>
          
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              htmlType="submit"
              size="large"
              block
              style={{ marginTop: "1rem", backgroundColor: "#FF5634", color: "white", borderRadius: "100px", width: "220px" }}
            >
              Sign Up
            </Button>
          </Form.Item>
          
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Button
              type="link"
              onClick={handleGoBack}
              style={{ padding: 0, color: "#6F6F6F" }}
            >
              Go Back
            </Button>
          </div>
        </Form>
      </>
    );
  };

  // 添加渲染注册第一步表单的函数
  const renderSignUpStep1 = () => {
    return (
      <>
        <div
          style={{
            fontFamily: "Mulish",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0%",
            textAlign: "center",
            marginBottom: "2rem",
            fontWeight: 300
          }}
        >
          Welcome! Start your new journey in
          <span style={{ color: "#FF5634" }}> We Independent</span>
        </div>
        
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: "50%", margin: "auto", color: "#9A9A9A" }}
        >
          {/* 邮箱输入框 */}
          <Form.Item
            label="Email"
            name="email"
            labelstyle={{
              fontWeight: 300,
              color: "#9A9A9A",
            }}
            width={424}
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          
          {/* 密码输入框 */}
          <Form.Item
            label="Password"
            name="password"
            labelstyle={{
              fontWeight: 300,
              color: "#9A9A9A",
            }}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              placeholder="Enter your password" 
              onChange={handlePasswordChange}
            />
          </Form.Item>
          
          {/* 密码强度指示器 */}
          {renderPasswordStrength()}
          
          {/* 订阅选项 */}
          <div>
            <Form.Item name="subscribe" valuePropName="checked" noStyle>
              <Checkbox
                style={{
                  padding: 0,
                  marginRight: "0.5rem",
                  transform: "scale(0.8)"
                }}
              >
              </Checkbox>
            </Form.Item>
            <span style={{ color: "#9A9A9A", size: "14px", lineHeight: "20px", display: "inline", }}>
              <small>
                Subscribe our news letter and never miss what matters to you
              </small>
            </span>
          </div>

          {/* 提交按钮 */}
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              htmlType="submit"
              size="large"
              block
              style={{ marginTop: "1rem", backgroundColor: "#FF5634", color: "white", borderRadius: "100px", width: "220px" }}
            >
              Continue
            </Button>
          </Form.Item>
          
          {/* 服务条款 */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <small>
              By creating an account, you agree to the{' '}
              <a 
                href="/terms-of-service" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: "#FF5634" }}
              >
                Terms of Service
              </a>
              {' '}and{' '}
              <a 
                href="/privacy-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: "#FF5634" }}
              >
                Privacy Policy
              </a>
            </small>
          </div>
          
          <Divider>or</Divider>
          
          {/* Google 登录按钮 */}
          <Form.Item style={{ textAlign: "center" }}>
            <Button
              onClick={() => (window.location.href = GoogleLoginURL)}
              icon={<FcGoogle />}
              block
              style={{ borderRadius: "100px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
            >
              Sign Up with Google
            </Button>
          </Form.Item>
          
          {/* 切换到登录 */}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            Already have an account?{" "}
            <Button
              type="link"
              onClick={onSwitchType}
              style={{ padding: 0 }}
            >
              Login
            </Button>
          </div>
        </Form>
      </>
    );
  };

  // 渲染登录表单
  const renderLoginForm = () => {
    return (
      <>
        <div
          style={{
            fontFamily: "Mulish",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0%",
            textAlign: "center",
            marginBottom: "2rem",
            fontWeight: 300
          }}
        >
          Welcome back! Your journey continues in
          <span style={{ color: "#FF5634" }}> We Independent</span>
        </div>
        
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: "50%", margin: "auto", color: "#9A9A9A" }}
        >
          {/* 邮箱输入框 */}
          <Form.Item
            label="Email"
            name="email"
            labelstyle={{
              fontWeight: 300,
              color: "#9A9A9A",
            }}
            width={424}
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          
          {/* 密码输入框 */}
          <Form.Item
            label="Password"
            name="password"
            labelstyle={{
              fontWeight: 300,
              color: "#9A9A9A",
            }}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          
          {/* 忘记密码链接 */}
          <div style={{ textAlign: "right", marginTop: "-1.5rem", marginBottom: "1rem" }}>
            <Button
              type="link"
              onClick={openForgotPassword}
              style={{
                padding: 0,
                color: "#FF5634",
                fontSize: "12px",
                lineHeight: "20px",
                display: "inline",
                textDecoration: "underline"
              }}
            >
              Forget Password?
            </Button>
          </div>
          
          {/* Remember Me 选项 */}
          <div>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox
                checked={rememberMe}
                onChange={onRememberMeChange}
                style={{
                  padding: 0,
                  marginRight: "0.5rem",
                  transform: "scale(0.8)"
                }}
              >
              </Checkbox>
            </Form.Item>
            <span style={{ color: "#9A9A9A", size: "14px", lineHeight: "20px", display: "inline", }}>
              <small>
                Remember me
              </small>
            </span>
          </div>

          {/* 登录按钮 */}
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              htmlType="submit"
              size="large"
              block
              style={{ marginTop: "1rem", backgroundColor: "#FF5634", color: "white", borderRadius: "100px", width: "220px" }}
            >
              Continue
            </Button>
          </Form.Item>
          
          {/* 服务条款 */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <small>
              By logging in, you agree to the{' '}
              <a 
                href="/terms-of-service" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: "#FF5634" }}
              >
                Terms of Service
              </a>
              {' '}and{' '}
              <a 
                href="/privacy-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: "#FF5634" }}
              >
                Privacy Policy
              </a>
            </small>
          </div>
          
          <Divider>or</Divider>
          
          {/* Google 登录按钮 */}
          <Form.Item style={{ textAlign: "center" }}>
            <Button
              onClick={() => (window.location.href = GoogleLoginURL)}
              icon={<FcGoogle />}
              block
              style={{ borderRadius: "100px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
            >
              Log In with Google
            </Button>
          </Form.Item>
          
          {/* 切换到注册 */}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            Don't have an account?{" "}
            <Button
              type="link"
              onClick={onSwitchType}
              style={{ padding: 0 }}
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </>
    );
  };

  // ================ 组件渲染 ================
  return (
    <>
      {/* 忘记密码模态框 */}
      {renderForgotPasswordModal()}
      
      {/* 主认证模态框 */}
      <Modal
        open={visible}
        onCancel={onClose}
        style={{ borderRadius: "100px" }}
        title={
          <h1
            style={{
              textAlign: "center",
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: "32px",
              lineHeight: "35.2px",
              letterSpacing: "-4%",
              marginTop: "2rem",
              marginBottom: "1rem",
            }}
          >
            {type}
          </h1>
        }
        footer={null}
        centered
        width={724}
        height={722}
      >
        {/* 根据类型和步骤渲染不同的表单 */}
        {type === "Sign Up" && step === 2 ? (
          renderSignUpStep2()
        ) : type === "Sign Up" && step === 1 ? (
          renderSignUpStep1()
        ) : (
          renderLoginForm()
        )}
      </Modal>
    </>
  )
}

export default AuthModal