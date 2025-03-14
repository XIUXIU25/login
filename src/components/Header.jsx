// src/components/Header.jsx
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../styles/Header.css"
import ProfileIcon from "../assets/profile-icon.svg"
import Logo_header from "../assets/We-Independent-Logo-header.svg"
import DropdownIcon from "../assets/dropdown-icon.svg"
import AuthModal from "./AuthModal"

function Header ({ profile }) {
  const navigate = useNavigate()
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState(null)
  const userContext = useContext(UserContext || React.createContext({ user: null, isLoggedIn: false }));
  const { user, isLoggedIn } = userContext || { user: null, isLoggedIn: false };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen)
    setProfileDropdownOpen(false)
  }

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen)
    setDropdownOpen(false)
  }

  const toggleSubmenu = (itemName) => {
    setOpenSubMenu(openSubMenu === itemName ? null : itemName)
  }

  // ---------------- Auth Modal State Management ----------------
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState("Log In")
  const onOpenAuthModal = (modalType) => {
    // set modal type
    console.log(modalType)
    setModalType(modalType)
    // toggle modal visibility
    setModalVisible(!modalVisible)
  }
      // --------------- Function: Close Auth Modal ---------------
  const onCloseAuthModal = () => {
    setModalVisible(false)
  }
  // --------------- End Auth Modal State Management ---------------
  const menuItems = [
    {
      name: "Support Programs",
      path: "/support",
      subMenu: [
        { name: "English Support", path: "/support/english-support" },
        { name: "Career Compass", path: "/support/career-compass" },
        { name: "Legal Consulting", path: "/support/legal-consulting" },
        { name: "Mental Health", path: "/support/mental-health" },
      ],
    },
    { name: "Blogs", path: "/blogs" },
    { name: "Events", path: "/events" },
    // { name: "Add Your Events", path: "/add-events" },
    { name: "About", path: "/about" },
    { name: "Donate", path: "/donate" },
  ]

    // 渲染用户头像或登录/注册按钮
  const renderUserSection = () => {
    if (isLoggedIn && user) {
      return (
        <div className="user-avatar">
          <div onClick={() => navigate("/profile")}>
            {user.avatar ? (
              <Avatar src={user.avatar} />
            ) : (
              <Avatar icon={<UserOutlined />} style={{ backgroundColor: "#FF5634" }} />
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="auth-buttons">
          <button 
            onClick={() => onOpenAuthModal("Log In")}
            style={{ marginRight: "10px" }}
          >
            Log In
          </button>
          <button 
            type="primary" 
            onClick={() => onOpenAuthModal("Sign Up")}
            // style={{ backgroundColor: "#FF5634", borderColor: "#FF5634" }}
          >
            Sign Up
          </button>
        </div>
      );
    }
  };

  return (
    <header className="header">

      <a href="#main-content" className="skiplink">
        Skip to Main Content
      </a>


      <div className="logo" onClick={() => navigate("/")}>
        <img src={Logo_header} alt="Website Logo" className="logo-img" />
      </div>



      <nav className="nav">
        <ul className="full-nav">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              {item.subMenu ? (
                <>
                  <button className="menu-item" onClick={() => toggleSubmenu(item.name)}>
                    <span className="menu-text">{item.name}</span>
                    <img
                      src={DropdownIcon}
                      alt="Expand submenu"
                      className="dropdown-icon"
                      style={{
                        transform: openSubMenu === item.name ? "rotate(180deg)" : "",
                      }}
                    />
                  </button>
                  {openSubMenu === item.name && (
                    <ul className="submenu">
                      {item.subMenu.map((subItem) => (
                        <li key={subItem.path}>
                          <button
                            className="submenu-item"
                            onClick={() => navigate(subItem.path)}
                          >
                            {subItem.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <button
                  className="menu-item"
                  onClick={() => navigate(item.path)}
                >
                  {item.name}
                </button>
              )}
            </li>
          ))}
        </ul>


        {/* Mobile Menu (Hamburger) */}
        <button
          className="hamburger"
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
        {isDropdownOpen && (
          <ul className="dropdown-menu">
            <button
              className="nav-close-button"
              onClick={() => {
                setDropdownOpen(false)
              }}
            >
              ✕
            </button>
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  // href={`#${item.page}`}
                  className="menu-item"
                  onClick={() => {
                    navigate(item.path)
                    setDropdownOpen(false)
                  }}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <button
        className="translatingButton"
        onClick={() => {
          navigate("/translate")
        }}
      >English</button>

      {/* <button
        className="loginButton"
        onClick={() => { onOpenAuthModal("Login") }}
      >Login</button>

      <button
        className="signUpButton"
        onClick={() => { onOpenAuthModal("Sign Up") }}
      >Sign up</button> */}

      <div className="right-section">
        {renderUserSection()}
      </div>

      <AuthModal
        visible={modalVisible}
        onClose={onCloseAuthModal}
        setModalType={setModalType}
        type={modalType}
      />

      {/* <section className="profile">
        <img
          src={ProfileIcon}
          alt="Profile Icon"
          className="profile-icon"
          onClick={toggleProfileDropdown}
          aria-expanded={isProfileDropdownOpen}
        />
        {isProfileDropdownOpen && (
          <div className="profile-dropdown-menu">
            <img
            src={profile.profilePic}
            alt="Profile"
            className="header-profile-pic" />
            <div className="username">{profile.username}</div>
            <button
              className="profile-settings"
              onClick={() => {
                navigate("/profile");
                setProfileDropdownOpen(false);
              }}
            >
              Profile Settings
            </button>
          </div>
        )}
      </section> */}



    </header>
  )
}

export default Header
