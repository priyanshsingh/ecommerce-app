import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.get('http://localhost:5000/users');
    const user = response.data.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      if (username === 'admin') {
        navigate('/admin');
      } else {
        navigate('/products');
      }
    } else {
      setAlertMessage('Invalid credentials');
    }
  };

  return (
    <>
      <style>
        {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #74ebd5, #acb6e5);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        form {
          background-color: #fff;
          padding: 40px 30px;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        form input {
          width: 100%;
          padding: 12px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
          transition: border-color 0.3s;
        }

        form input:focus {
          border-color: #74ebd5;
          outline: none;
        }

        form button {
          width: 100%;
          padding: 12px;
          background-color: #74ebd5;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        form button:hover {
          background-color: #57c8d3;
        }

        form button:active {
          background-color: #47b6c0;
        }

        form input::placeholder {
          color: #aaa;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }

        .alert {
          color: red;
          text-align: center;
          margin-bottom: 20px;
        }

        .signup-link {
          text-align: center;
          margin-top: 20px;
        }

        .signup-link a {
          color: #74ebd5;
          text-decoration: none;
          font-weight: bold;
        }

        .signup-link a:hover {
          text-decoration: underline;
        }
        `}
      </style>

      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        {alertMessage && <div className="alert">{alertMessage}</div>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
        <div className="signup-link">
          <p>New user? <Link to="/register">Sign up here</Link></p>
        </div>
      </form>

    </>
  );
};

export default Login;
