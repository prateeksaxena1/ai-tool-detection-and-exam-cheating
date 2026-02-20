import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanFace } from 'lucide-react';
import '../styles/login.css';

const Login = () => {
    const navigate = useNavigate();
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    // Form states
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

    const handleSignIn = (e) => {
        e.preventDefault();
        if (loginEmail && loginPassword) {
            // Simulate authentication
            navigate('/dashboard');
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (signupName && signupEmail && signupPassword) {
            // Simulate account creation
            navigate('/dashboard');
        }
    };

    return (
        <div className="login-wrapper">
            <div className={`container ${isRightPanelActive ? 'active' : ''}`} id="container">

                {/* SIGN UP PANEL */}
                <div className="form-container sign-up">
                    <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <span className="subtitle">Register to ProctorAI Secure</span>

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={signupName}
                            onChange={(e) => setSignupName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            required
                        />

                        <div className="face-recognition" onClick={() => navigate('/verification')}>
                            <ScanFace size={18} />
                            <span>Register your Face</span>
                        </div>

                        <button type="submit" className="primary-action-btn">Sign Up</button>
                    </form>
                </div>

                {/* SIGN IN PANEL */}
                <div className="form-container sign-in">
                    <form onSubmit={handleSignIn}>
                        <h1>Sign In</h1>
                        <span className="subtitle">Access your ProctorAI Dashboard</span>

                        <input
                            type="email"
                            placeholder="Email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                        />

                        {/* Note: OTP flow can be managed via state if needed later */}
                        <div className="otp-section hidden">
                            <button type="button" className="secondary-action-btn">Send OTP</button>
                            <input type="text" placeholder="Enter OTP" />
                        </div>

                        <div className="face-recognition" onClick={() => navigate('/verification')}>
                            <ScanFace size={18} />
                            <span>Sign in with Face</span>
                        </div>

                        <a href="#" className="forgot-password">Forgot password?</a>

                        <button type="submit" className="primary-action-btn">Sign In</button>
                    </form>
                </div>

                {/* TOGGLE OVERLAY */}
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to access the ProctorAI dashboard and monitor your assessments.</p>
                            <button
                                className="hidden-btn"
                                onClick={() => setIsRightPanelActive(false)}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>New to ProctorAI?</h1>
                            <p>Register an account to experience next-generation, AI-powered secure examination environments.</p>
                            <button
                                className="hidden-btn"
                                onClick={() => setIsRightPanelActive(true)}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
