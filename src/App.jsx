import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import AuthModal from "./components/AuthModal"

import HomePage from "./pages/Homepage"
import Events from "./pages/Events"
import AddEvents from "./pages/AddEvents"
import Blogs from "./pages/Blogs"
import About from "./pages/About"
import ProfilePage from "./pages/ProfilePage"
import DonatePage from "./pages/DonatePage"
// import AuthModal from "./components/AuthModal"
// import FormComponent from "./components/FormComponent"
import ResetYourPassword from "./components/ResetYourPassword"

import { UserProvider } from "./contexts/UserContext"



function App () {
  // const [currentPage, setCurrentPage] = useState("home");

  const [events, setEvents] = useState([
    { id: 1, name: "Tesla Model S", type: "electric", price: "79,990", image: "/img/models.jpg" },
    { id: 2, name: "Ford Mustang", type: "petrol", price: "55,300", image: "/img/mustang.jpg" },
    { id: 3, name: "Toyota Prius", type: "hybrid", price: "28,000", image: "/img/prius.jpg" },
    { id: 4, name: "Tesla Model 3", type: "electric", price: "42,490", image: "/img/tesla.jpg" },
    { id: 5, name: "Toyota Supra", type: "petrol", price: "45,540", image: "/img/supra.jpg" },
    { id: 6, name: "BMW M4", type: "petrol", price: "79,100", image: "/img/bmw.jpg" },
  ])

  const addEvents = (newEvents) => {
    setEvents([...events, { ...newEvents, id: events.length + 1 }])
  }


  const [blogs, setBlogs] = useState([
    { id: 1, name: "blog1", type: "type1", price: "1", image: "/img/models.jpg" },
    { id: 2, name: "blog2", type: "type2", price: "2", image: "/img/mustang.jpg" },
  ])

  const addBlogs = (newBlog) => {
    setBlogs([...blogs, { ...newBlog, ID: blogs.length + 1 }])
  }

  const [profile, setProfile] = useState({
    profilePic: './img/pic1.jpg',
    username: 'default',
    actualName: 'default',
    isCarFree: false,
  })
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <UserProvider>

    <Router>
      <div className="app">
        <Header profile={profile} />

        <main id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<Events events={events} />} />
            <Route path="/add-events" element={<AddEvents addEvents={addEvents} />} />
            <Route path="/blogs" element={<Blogs blogs={blogs} />} />
            <Route path="/profile" element={<ProfilePage profile={profile} setProfile={setProfile} />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/reset-password" element={<ResetYourPassword visible={true} onClose={() => {}} />} />

            {/* <Route path="/email-preview" element={<PasswordResetEmail username="John Doe" resetLink="https://yourwebsite.com/reset-password/12345" />} /> */}
            {/* As login/register modal is component not SPA, we prefer not include them in router list */}
            {/* <Route path="/login" element={<AuthModal />} /> */}
            {/* <Route path="/register" element={<AuthModal />} /> */}
          </Routes>

        </main>

        <Footer />
        {/*  */}

      </div>
    </Router>
    </UserProvider>


    // <div className="app">
    //   <Header navigateTo={setCurrentPage} currentPage={currentPage} profile={profile} />

    //   <main id="main-content">
    //     {renderPageContent()}
    //   </main>

    //   <Footer />
    // </div>
  )
}

export default App
