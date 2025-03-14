// src/pages/About.jsx
import React, { useState } from "react";
import "../styles/About.css";

function About() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="about-us">
      <h1>About Us</h1>
      <div className="accordion">
        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => toggleSection(1)}
            aria-expanded={openSection === 1}
            aria-controls="section1"
            id="header1"
          >
            Our Mission
            <span className="arrow">{openSection === 1 ? "▼" : "▶"}</span>
          </button>
          {openSection === 1 && (
            <div
              className="accordion-body"
              id="section1"
              aria-labelledby="header1"
            >
              <p>
                Our mission is to embrace dependent visa holders, helping them build community, 
                gain access to critical resources, and overcome social isolation. 
                Through this supportive environment, we empower them to regain their independence, 
                integrate into U.S. society, and feel seen, valued, and capable of making meaningful contributions.
              </p>
            </div>
          )}
        </div>

        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => toggleSection(2)}
            aria-expanded={openSection === 2}
            aria-controls="section2"
            id="header2"
          >
            Our Vision
            <span className="arrow">{openSection === 2 ? "▼" : "▶"}</span>
          </button>
          {openSection === 2 && (
            <div
              className="accordion-body"
              id="section2"
              aria-labelledby="header2"
            >
              <p>
              Our vision is a world where dependent visa holders are empowered, 
              visible, and actively contributing to society—both mentally and 
              physically—through opportunities that allow them to grow and thrive within the community.
              </p>
            </div>
          )}
        </div>

        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => toggleSection(3)}
            aria-expanded={openSection === 3}
            aria-controls="section4"
            id="header4"
          >
            Our Purpose
            <span className="arrow">{openSection === 3 ? "▼" : "▶"}</span>
          </button>
          {openSection === 3 && (
            <div
              className="accordion-body"
              id="section4"
              aria-labelledby="header3"
            >
              <p>
              We aim to offer dependent visa holders the tools, community, 
              and resources they need to regain purpose, develop new skills, 
              and feel confident in navigating life in the U.S. 
              and contribute meaningfully.
              </p>
            </div>
          )}
        </div>

        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => toggleSection(4)}
            aria-expanded={openSection === 4}
            aria-controls="section3"
            id="header3"
          >
            Our Team
            <span className="arrow">{openSection === 4 ? "▼" : "▶"}</span>
          </button>
          {openSection === 4 && (
            <div
              className="accordion-body"
              id="section3"
              aria-labelledby="header4"
            >
              <p>
                Our team is comprised of talented professionals with expertise
                in technology, automotive industries, and customer experience.
                We work tirelessly to bring the best tools and services to our
                users.
              </p>
              <ul>
                <li>Sing Shu - Founder | CEO</li>
                <li>Ziyue Guo - Co-Founder | CDO</li>
                <li>Xiaolu Lin- Co-Founder | CFO</li>
                <li>Xinyue Lei - Co-Founder | Secretary</li>
                <li>Nicole Lu - Marketing Director</li>
              </ul>
            </div>
          )}
        </div>

        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => toggleSection(5)}
            aria-expanded={openSection === 5}
            aria-controls="section5"
            id="header5"
          >
            Contact Us
            <span className="arrow">{openSection === 5 ? "▼" : "▶"}</span>
          </button>
          {openSection === 5 && (
            <div
              className="accordion-body"
              id="section5"
              aria-labelledby="header5"
            >
              <p>
                Have questions or feedback? Reach out to us anytime:
                <br />
                <strong>Email:</strong>{" "}
                <a href="mailto:weindependentweb@gmail.com">weindependentweb@gmail.com</a>
                <br />
                {/* <strong>Phone:</strong> +1 (123) 456-7890 */}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default About;
