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
      gmail: 'mailto:ratul@gmail.com',
      facebook: 'https://facebook.com/ratul.fb',
      twitter: 'https://twitter.com/ratul',
      github: 'https://github.com/ratul-git',
      linkedin: 'https://linkedin.com/in/ratul-linkedin',
    }
  },
  {
    name: 'Kazi Ishmamul Haque',
    role: 'Developer',
    description: 'Ahsanullah University Of Science & Technology',
    image: '/images/dev2.jpg',
    social: {
      gmail: 'mailto:kazi@gmail.com',
      facebook: 'https://facebook.com/kazi.fb',
      twitter: 'https://twitter.com/kazi',
      github: 'https://github.com/kaziishmamul',
      linkedin: 'https://linkedin.com/in/kaziishmamul',
    }
  },
  {
    name: 'Faiyaz Fardin',
    role: 'Developer',
    description: 'Ahsanullah University Of Science & Technology',
    image: '/images/dev3.jpg',
    social: {
      gmail: 'mailto:faiyaz@gmail.com',
      facebook: 'https://facebook.com/faiyaz.fb',
      twitter: 'https://twitter.com/faiyaz',
      github: 'https://github.com/faiyazf',
      linkedin: 'https://linkedin.com/in/faiyazf',
    }
  },
  {
    name: 'Ashraful Hasan',
    role: 'Developer',
    description: 'Ahsanullah University Of Science & Technology',
    image: '/images/dev4.jpg',
    social: {
      gmail: 'mailto:ashraful@gmail.com',
      facebook: 'https://facebook.com/ashraful.fb',
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
