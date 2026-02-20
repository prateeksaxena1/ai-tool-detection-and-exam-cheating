import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanFace, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import '../styles/login.css';

const Login = () => {
    const navigate = useNavigate();
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form states — Sign In
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Form states — Sign Up
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupRole, setSignupRole] = useState('student'); // Default role
    const [signupError, setSignupError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState('');

    /* ── SIGN IN ──────────────────────────────────── */
    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoginError('');
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginEmail,
            password: loginPassword,
        });

        setLoading(false);

        if (error) {
            setLoginError(error.message);
            return;
        }

        if (data?.user) {
            // Check metadata if set, else fallback. For demo purposes, check email.
            let userRole = data.user.user_metadata?.role;
            if (!userRole) {
                userRole = loginEmail.includes('admin') ? 'admin' : 'student';
            }
            navigate('/dashboard', { state: { role: userRole } });
        }
    };

    /* ── SIGN UP ──────────────────────────────────── */
    const handleSignUp = async (e) => {
        e.preventDefault();
        setSignupError('');
        setSignupSuccess('');
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: signupEmail,
            password: signupPassword,
            options: {
                data: { full_name: signupName, role: signupRole },
            },
        });

        setLoading(false);

        if (error) {
            setSignupError(error.message);
            return;
        }

        // Supabase sends a confirmation email by default.
        // If email confirmations are disabled, data.user will be set immediately.
        if (data?.user && data.user.identities?.length === 0) {
            setSignupError('This email is already registered. Please sign in instead.');
        } else if (data?.user) {
            setSignupSuccess('Account created! Routing to dashboard...');
            // Immediately route to the dashboard with the explicitly chosen role
            navigate('/dashboard', { state: { role: signupRole } });
        }
    };

    /* ── FORGOT PASSWORD ──────────────────────────── */
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!loginEmail) {
            setLoginError('Enter your email above first, then click Forgot Password.');
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(loginEmail, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        setLoading(false);
        if (error) {
            setLoginError(error.message);
        } else {
            setLoginError('');
            alert(`Password reset email sent to ${loginEmail}`);
        }
    };

    return (
        <div className="login-wrapper">
            <div className={`container ${isRightPanelActive ? 'active' : ''}`} id="container">

                {/* ── SIGN UP PANEL ── */}
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
                            disabled={loading}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <input
                            type="password"
                            placeholder="Password (min 6 chars)"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            required
                            minLength={6}
                            disabled={loading}
                        />

                        <select
                            value={signupRole}
                            onChange={(e) => setSignupRole(e.target.value)}
                            required
                            disabled={loading}
                            style={{
                                backgroundColor: 'var(--panel-bg)', width: '100%', padding: '12px 15px',
                                margin: '8px 0', border: '1px solid var(--border-color)', borderRadius: '8px',
                                color: 'white', fontFamily: 'inherit'
                            }}
                        >
                            <option value="student">Student</option>
                            <option value="admin">Administrator</option>
                        </select>

                        {/* Error / Success messages */}
                        {signupError && <p className="auth-error">{signupError}</p>}
                        {signupSuccess && <p className="auth-success">{signupSuccess}</p>}

                        <div className="face-recognition" onClick={() => navigate('/verification', { state: { flow: 'register' } })}>
                            <ScanFace size={18} />
                            <span>Register your Face</span>
                        </div>

                        <button type="submit" className="primary-action-btn" disabled={loading}>
                            {loading ? <Loader2 size={18} className="spin" /> : 'Sign Up'}
                        </button>
                    </form>
                </div>

                {/* ── SIGN IN PANEL ── */}
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
                            disabled={loading}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                            disabled={loading}
                        />

                        {/* Error message */}
                        {loginError && <p className="auth-error">{loginError}</p>}

                        <div className="face-recognition" onClick={() => navigate('/verification', { state: { flow: 'authenticate' } })}>
                            <ScanFace size={18} />
                            <span>Sign in with Face</span>
                        </div>

                        <a href="#" className="forgot-password" onClick={handleForgotPassword}>
                            Forgot password?
                        </a>

                        <button type="submit" className="primary-action-btn" disabled={loading}>
                            {loading ? <Loader2 size={18} className="spin" /> : 'Sign In'}
                        </button>
                    </form>
                </div>

                {/* ── TOGGLE OVERLAY ── */}
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to access the ProctorAI dashboard and monitor your assessments.</p>
                            <button className="hidden-btn" onClick={() => setIsRightPanelActive(false)}>
                                Sign In
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>New to ProctorAI?</h1>
                            <p>Register an account to experience next-generation, AI-powered secure examination environments.</p>
                            <button className="hidden-btn" onClick={() => setIsRightPanelActive(true)}>
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
