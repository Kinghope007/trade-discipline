import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };
      console.log(formData);
      const res = await axios.post('http://localhost:3000/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      console.log(res.data);  
      window.location.href = '/dashboard';
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="input-group">
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
