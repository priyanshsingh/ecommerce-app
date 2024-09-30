import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            alertMessage: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            this.setState({ alertMessage: 'Passwords do not match' });
            return;
        }

        try {
            const response = await axios.get('http://localhost:5000/users');
            const userExists = response.data.find((user) => user.username === username);

            if (userExists) {
                this.setState({ alertMessage: 'Username already exists' });
            } else {
                alert("added the user");
                await axios.post('http://localhost:5000/users', {
                    username,
                    password,
                });
                this.setState({ alertMessage: 'Registration successful! Please log in.' });
                this.props.history.push('/login'); // Redirect to login after successful registration
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    render() {
        const { username, password, confirmPassword, alertMessage } = this.state;

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

          .alert {
            color: red;
            text-align: center;
            margin-bottom: 20px;
          }

          h1 {
            text-align: center;
            margin-bottom: 30px;
            color: #333;
          }

          .login-link {
            text-align: center;
            margin-top: 20px;
          }

          .login-link a {
            color: #74ebd5;
            text-decoration: none;
            font-weight: bold;
          }

          .login-link a:hover {
            text-decoration: underline;
          }
          `}
                </style>

                <form onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    {alertMessage && <div className="alert">{alertMessage}</div>}
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        placeholder="Password"
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        placeholder="Confirm Password"
                        required
                    />
                    <button type="submit">Register</button>
                    <div className="login-link">
                        <p>Already a user? <Link to="/login">Login</Link></p>
                    </div>
                </form>


            </>
        );
    }
}

export default Register;
