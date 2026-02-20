import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Chrome } from 'lucide-react';
import '../styles/login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            // Simulate authentication and route to dashboard
            navigate('/dashboard');
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="login-content">
                    <div className="brand-wrapper">
                        <div className="brand-icon">
                            <ShieldCheck size={24} strokeWidth={2.5} />
                        </div>
                        <span className="brand-name">ProctoAI</span>
                    </div>

                    <h1 className="login-heading">
                        AI-Powered<br />
                        <span className="gradient-text">Exam Monitoring</span>
                    </h1>

                    <p className="login-subtitle">
                        Smart. Secure. Intelligent.
                    </p>

                    <div className="pagination-dots">
                        <div className="dot active"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
            </div>

            <div className="login-right">
                <div className="login-box">
                    <div className="form-header">
                        <h2>Welcome Back</h2>
                        <p>Enter your credentials to access the dashboard</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="password-header">
                                <label htmlFor="password">Password</label>
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me for 30 days</label>
                        </div>

                        <button type="submit" className="btn-primary">
                            Sign In
                        </button>
                    </form>

                    <div className="divider">
                        <span>Or continue with</span>
                    </div>

                    <button type="button" className="btn-outline">
                        <Chrome size={20} />
                        Sign in with Google
                    </button>

                    <p className="create-account">
                        Don't have an account? <a href="#">Create an account</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
