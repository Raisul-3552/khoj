import React from 'react';
import '../css/AboutUs.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const developers = [
  {
    name: 'A. B. M. Raisul Hasan Ratul',
    role: 'Developer',
    description: 'Ahsanullah University Of Science & Technology',
    image: '/images/dev1.jpg',
    social: {
      gmail: 'https://mail.google.com/mail/?view=cm&to=kaziishmamulhaque@gmail.com',
      facebook: 'https://www.facebook.com/raisul.ratul.56',
      twitter: 'https://twitter.com/ratul',
      github: 'https://github.com/Raisul-3552',
      linkedin: 'https://linkedin.com/in/ratul-linkedin',
    }
  },
  {
    name: 'Kazi Ishmamul Haque',
    role: 'Developer',
    description: 'Ahsanullah University Of Science & Technology',
    image: '/images/dev2.jpg',
    social: {
      gmail: 'https://mail.google.com/mail/?view=cm&to=kaziishmamulhaque@gmail.com',
      facebook: 'https://www.facebook.com/kazi.ishmamulhaque.1/',
      twitter: 'https://x.com/KaziIshmamul',
      github: 'https://github.com/Kazi-Ishmamul',
      linkedin: 'https://www.linkedin.com/in/kazi-ishmamul-haque-a52067372/',
    }
  },
  {
    name: 'Faiyaz Fardin',
    role: 'Developer',
    description: 'Ahsanullah University Of Science & Technology',
    image: '/images/dev31.jpg',
    social: {
      gmail: 'https://mail.google.com/mail/?view=cm&to=kaziishmamulhaque@gmail.com',
      facebook: 'https://www.facebook.com/faiyaz.fardin.464176',
      twitter: 'https://twitter.com/faiyaz',
      github: 'https://github.com/faiyazfardin',
      linkedin: 'https://linkedin.com/in/faiyazf',
    }
  },
  {
    name: 'Ashraful Hasan',
    role: 'Developer',
    description: 'Ahsanullah University Of Science & Technology',
    image: '/images/dev4.jpg',
    social: {
      gmail: 'https://mail.google.com/mail/?view=cm&to=kaziishmamulhaque@gmail.com',
      facebook: 'https://www.facebook.com/ashraful.ash.566',
      twitter: 'https://twitter.com/ashraful',
      github: 'https://github.com/ashrafuldev',
      linkedin: 'https://linkedin.com/in/ashrafuldev',
    }
  }
];

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1 className="about-title">Meet the Developers</h1>
      <div className="developer-grid">
        {developers.map((dev, index) => (
          <div className="developer-card" key={index}>
            <img src={dev.image} alt={dev.name} className="developer-image" />
            <h2 className="developer-name">{dev.name}</h2>
            <p className="developer-role">{dev.role}</p>
            <p className="developer-description">{dev.description}</p>
            <div className="social-links">
              <a href={dev.social.gmail} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-envelope"></i>
              </a>
              <a href={dev.social.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href={dev.social.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href={dev.social.github} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href={dev.social.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
