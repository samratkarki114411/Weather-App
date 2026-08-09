import { useState } from "react";
import {
  FaFacebook, FaInstagram, FaGithub, FaLinkedin,
  FaMapMarkerAlt, FaEnvelope, FaPhoneAlt
} from "react-icons/fa";

const contactInfo = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    lines: ["Kathmandu, Nepal"],
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    lines: ["weatherapp@example.com"],
  },
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    lines: ["+977-9800000000"],
  },
];

const socials = [
  {
    icon: <FaFacebook />,
    name: "Facebook",
    url: "#",
  },
  {
    icon: <FaInstagram />,
    name: "Instagram",
    url: "#",
  },
  {
    icon: <FaGithub />,
    name: "GitHub",
    url: "https://github.com/samratkarki114411",
  },
  {
    icon: <FaLinkedin />,
    name: "LinkedIn",
    url: "#",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been submitted.");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">
      <header className="contact-hero">
        <span className="about-badge">💬 Contact Us</span>
        <h1>Get in Touch</h1>
        <p className="contact-description">
          Have a question, feedback, or just want to say hello? Drop us a
          message and we will get back to you as soon as possible.
        </p>
      </header>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>

          <div className="contact-cards">
            {contactInfo.map((item, index) => (
              <div className="contact-card" key={index}>
                <span className="contact-icon">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  {item.lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="social-links">
            <span className="social-label">Follow us</span>
            <div className="social-row">
              {socials.map((social, index) => (
                <a
                  className="social-link"
                  key={index}
                  href={social.url}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>

          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Samrat Shiv Jung Karki"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Your Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="samrat@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message..."
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message 🚀</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
