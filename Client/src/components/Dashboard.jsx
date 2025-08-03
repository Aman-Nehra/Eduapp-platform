import React, { useRef, useState} from 'react';
import '../../Styling/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const homeRef = useRef(null);
  const coursesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  //Registration state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try{
      const response = await fetch('https://eduapp-platform.cloudfunctions.net/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, password}),
      });

      const data = await response.json();

      if(data.success){
        alert(`Registered successfully! Your ID is ${data.id}`);
        setName('');
        setEmail('');
        setPassword('');
      }
      else{
        alert(`${data.message}`);
      }
    }
    catch(err){
      alert('Server error: Could not register.');
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="logo">EduApp</div>
        <ul className="nav-links">
          <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToRef(homeRef); }}>Home</a></li>
          <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToRef(coursesRef); }}>Courses</a></li>
          <li><a href="#aboutUs" onClick={(e) => { e.preventDefault(); scrollToRef(aboutRef); }}>About Us</a></li>
          <li><a href="#contactUs" onClick={(e) => { e.preventDefault(); scrollToRef(contactRef); }}>Contact Us</a></li>
        </ul>
        <button className="login-nav-btn" onClick={() => navigate('/login')}>LOG IN</button>
      </nav>

      <div ref={homeRef} className="main-box">
        <div className="left-image-box">
          <img src="/Images/side_image.jpg" alt="side visual" className="side-img" />
        </div>
        <div className="register-box">
          <h2>REGISTER NOW !!</h2>
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}/>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
          <button className="register-button" onClick={handleRegister}>Register</button>
          <p className="login-link">Already have an account?<span onClick={() => navigate('/login')}>Login</span></p>
        </div>
      </div>

      <section ref={coursesRef} className="courses-section">
        <h2 className="courses-title">Courses Offered</h2>
        <div className="course-grid">
          {[
            { name: 'Data Structures and Algorithms', img: '/Images/dsa.jpg', id: 'dsa' },
            { name: 'Computer Architecture', img: '/Images/architecture.jpg', id: 'arch' },
            { name: 'Operating Systems', img: '/Images/os.jpg', id: 'os' },
            { name: 'Machine Learning', img: '/Images/aiml.jpg', id: 'ml' },
            { name: 'Computer Networks', img: '/Images/cn.jpg', id: 'cn' },
          ].map((course) => (
            <div className="course-card" key={course.name} onClick={() => navigate(`/lesson/${course.id}`)}>
              <img src={course.img} alt={course.name} />
              <p>{course.name}</p>
            </div>
          ))}
        </div>
      </section>
  <section ref={aboutRef} className="placeholder-section">
  <div className="translucent-box">
    <h2>About Us</h2>
    <p>
      EduApp is an interactive learning platform dedicated to helping students master core computer science concepts through engaging content, expert-led courses, and real-world projects. Our mission is to make high-quality education accessible and enjoyable.
    </p>
  </div>
  <div className="translucent-box" ref={contactRef}>
    <h2>Contact Us</h2>
    <p>Email : support@eduapp.com</p>
    <p>Mobile Number : +91-9876543210</p>
    <p>Address : EduApp HQ, Knowledge Park, Mumbai, India</p>
    <p>We'd love to hear from you. Reach out for any support or queries!</p>
  </div>
</section>
    </div>
  );
};

export default Dashboard;