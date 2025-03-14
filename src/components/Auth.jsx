/*
 * Author: Yifan/Evan
 * Created: Tue Feb 25 2025 12:37:09
 * Updated: Tue Feb 25 2025 12:37:09
 */

import { useState, version } from "react"
import { useNavigate } from "../hooks/useNavigateTo"
import { Form, Input, Button, Typography, message, Card } from "antd"
import { api_url, secret_key, version } from "../utils/config" 
import md5 from "md5" 
import axios from "axios"
import md5 from "md5"

const { Title } = Typography

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

// --------   Required Metadata for the API  --------
  // const api_url = process.env.REACT_APP_API_URL
  // const secret_key  = process.env.REACT_APP_SECRET_KEY
  // const version = process.env.REACT_APP_VERSION
  const timestamp = new Date().toISOString()

// --------   Generate Signature as IT IS REQUIRED ----------
  const generateSignature = (data) => {
    return md5(version + timestamp + secret_key)
  }

// --------   Handle Submit Function for Login and Register  --------
  const handleSubmit = async (values) => {
    const endpoint = isLogin ? "/login" : "/register"
    try {
      const sign = generateSignature()
      const response = await axios.post(
        `${api_url}${endpoint}`,
        values,
        {
          headers:{
            "Content-Type": 'application/json;charset=UTF-8',
            "version": version,
            "timestamp": timestamp,
            "sign": sign
          }
        }
      )
      if(isLogin){
        localStorage.setItem("token", response.data.token)
        message.success(response.data.msg || "Login successful");
      } else {
        //TODO: Login After Register????
        message.success(response.data.msg || "Registration successful")
        setIsLogin(true)
      }
      navigate("/profile")
    } catch (err) {
      message.error(err.response?.data?.msg|| "Something went wrong")
    }
  }
  return (
    <div className="auth">
      <Card >
        <Title level={2}>{isLogin ? "Login" : "Register"}</Title>
        <Form onFinish={handleSubmit} layout="vertical">
        {/* Login and Register forms */}
        {/* Username */}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
        {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, min:6, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        {/* Save for future use like name register, etc. */}
          {/* {!isLogin && (
            <Form.Item
              label="Actual Name"
              name="actualName"
              rules={[{ required: true, message: "Please input your actual name!" }]}
            >
              <Input />
            </Form.Item>
          )} */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isLogin ? "Login" : "Register"}
            </Button>
          </Form.Item>
        </Form>
        <Button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </Button>
      </Card>
    </div>
  )
}
export default Auth