import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ShieldCheck,
    Eye,
    Smartphone,
    Monitor,
    Activity,
    UserX,
    ArrowRight,
    CheckCircle2,
    Lock,
    Cpu,
    Globe
} from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="home-container">
            {/* Navigation */}
            <nav className={`home-nav ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-logo">
                    <ShieldCheck className="logo-icon" />
                    <span>ProctorAI</span>
                </div>
                <div className="nav-links">
                    <a href="#problem">The Challenge</a>
                    <a href="#solution">Features</a>
                    <a href="#how-it-works">How It Works</a>
                    <button className="nav-btn-secondary" onClick={() => navigate('/login')}>
                        Login
                    </button>
                    <button className="nav-btn-primary" onClick={() => navigate('/verification')}>
                        Start Exam
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background">
                    <div className="glow-circle top-left"></div>
                    <div className="glow-circle bottom-right"></div>
                    <div className="grid-overlay"></div>
                </div>

                <div className="hero-content">
                    <div className="badge">Next-Gen Exam Integrity</div>
                    <h1 className="hero-title">
                        AI-Powered Online Exam Proctoring for <span className="highlight">Fair & Secure</span> Assessments
                    </h1>
                    <p className="hero-subtitle">
                        Real-time cheating detection using advanced computer vision and behavioral analysis to ensure academic integrity.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-primary" onClick={() => navigate('/verification')}>
                            Start Exam <ArrowRight className="btn-icon" />
                        </button>
                        <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
                            View Dashboard
                        </button>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section id="problem" className="problem-section">
                <div className="section-header">
                    <h2 className="section-title">The Challenge in Online Exams</h2>
                    <p className="section-description">Traditional online exams face critical vulnerabilities without human oversight.</p>
                </div>

                <div className="cards-grid problem-cards">
                    <div className="glass-card problem-card">
                        <div className="card-icon-wrapper red">
                            <UserX className="card-icon" />
                        </div>
                        <h3>Lack of Human Monitoring</h3>
                        <p>Without a physical proctor, maintaining strict exam discipline and verifying continuous presence is incredibly difficult.</p>
                    </div>

                    <div className="glass-card problem-card">
                        <div className="card-icon-wrapper orange">
                            <Monitor className="card-icon" />
                        </div>
                        <h3>Easy Tab Switching</h3>
                        <p>Candidates can easily switch browser tabs or applications to search for answers during unmonitored online assessments.</p>
                    </div>

                    <div className="glass-card problem-card">
                        <div className="card-icon-wrapper yellow">
                            <Smartphone className="card-icon" />
                        </div>
                        <h3>Unauthorized Devices</h3>
                        <p>The use of secondary devices like smartphones, smartwatches, or tablets out of view is a common method of cheating.</p>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section id="solution" className="solution-section">
                <div className="section-header">
                    <h2 className="section-title">Our <span className="highlight">AI-Based</span> Solution</h2>
                    <p className="section-description">A comprehensive suite of automated detection tools to secure every exam session.</p>
                </div>

                <div className="cards-grid solution-cards">
                    <div className="glass-card feature-card">
                        <ShieldCheck className="feature-icon" />
                        <h3 className="feature-title">Face & Presence</h3>
                        <p className="feature-desc">Continuous verification of the test-taker's identity and presence.</p>
                    </div>

                    <div className="glass-card feature-card">
                        <Eye className="feature-icon" />
                        <h3 className="feature-title">Eye & Head Tracking</h3>
                        <p className="feature-desc">Monitors suspicious eye movements and head panning away from the screen.</p>
                    </div>

                    <div className="glass-card feature-card">
                        <Smartphone className="feature-icon" />
                        <h3 className="feature-title">Device & Person Detection</h3>
                        <p className="feature-desc">Detects mobile phones and additional people in the camera frame.</p>
                    </div>

                    <div className="glass-card feature-card">
                        <Monitor className="feature-icon" />
                        <h3 className="feature-title">Tab & Screen Monitoring</h3>
                        <p className="feature-desc">Tracks unauthorized tab switches and full-screen exits immediately.</p>
                    </div>

                    <div className="glass-card feature-card">
                        <Activity className="feature-icon" />
                        <h3 className="feature-title">Risk Score Dashboard</h3>
                        <p className="feature-desc">Aggregates all violations into a live trust score for easy proctor review.</p>
                    </div>
                </div>
            </section>

            {/* How It Works (Flow Section) */}
            <section id="how-it-works" className="flow-section">
                <div className="section-header">
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-description">Seamless integration from candidate login to proctor review.</p>
                </div>

                <div className="flow-container">
                    <div className="flow-step">
                        <div className="step-number">1</div>
                        <div className="step-icon-wrapper">
                            <Monitor className="step-icon" />
                        </div>
                        <h4>Webcam Input</h4>
                        <p>Secure camera access initiated</p>
                    </div>

                    <div className="flow-connector"></div>

                    <div className="flow-step">
                        <div className="step-number">2</div>
                        <div className="step-icon-wrapper pulse">
                            <Cpu className="step-icon" />
                        </div>
                        <h4>AI Behavior Analysis</h4>
                        <p>Real-time ML models evaluate feed</p>
                    </div>

                    <div className="flow-connector"></div>

                    <div className="flow-step">
                        <div className="step-number">3</div>
                        <div className="step-icon-wrapper">
                            <Activity className="step-icon" />
                        </div>
                        <h4>Risk Score Calculation</h4>
                        <p>Violations trigger live alerts</p>
                    </div>

                    <div className="flow-connector"></div>

                    <div className="flow-step">
                        <div className="step-number">4</div>
                        <div className="step-icon-wrapper">
                            <ShieldCheck className="step-icon" />
                        </div>
                        <h4>Proctor Dashboard</h4>
                        <p>Comprehensive review interface</p>
                    </div>
                </div>
            </section>

            {/* India Impact Section */}
            <section className="impact-section">
                <div className="impact-content glass-panel">
                    <div className="impact-text">
                        <h2 className="section-title">Built for India’s Examination Ecosystem</h2>
                        <p className="impact-desc">Designed to address the unique challenges of massive-scale assessments across diverse connectivity and hardware conditions.</p>
                        <ul className="impact-list">
                            <li>
                                <CheckCircle2 className="list-icon" />
                                <span><strong>Low-cost solution:</strong> Accessible for institutions of all sizes.</span>
                            </li>
                            <li>
                                <CheckCircle2 className="list-icon" />
                                <span><strong>Works on basic laptops:</strong> Optimized ML models for entry-level hardware.</span>
                            </li>
                            <li>
                                <CheckCircle2 className="list-icon" />
                                <span><strong>Privacy-conscious:</strong> No persistent audio recording or invasive data storage.</span>
                            </li>
                            <li>
                                <CheckCircle2 className="list-icon" />
                                <span><strong>Scalable:</strong> Ready for large government exams and massive coaching institutes.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="impact-visual">
                        <div className="abstract-map">
                            <Globe className="globe-icon" />
                            <div className="node n1"></div>
                            <div className="node n2"></div>
                            <div className="node n3"></div>
                            <div className="node n4"></div>
                            <div className="node n5"></div>
                            <svg className="connecting-lines" viewBox="0 0 200 200">
                                <path d="M50,150 L100,100 L150,120 L180,60" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
                                <path d="M100,100 L120,40" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call To Action */}
            <section className="cta-section">
                <div className="cta-card glass-panel highlight-border">
                    <Lock className="cta-icon" />
                    <h2>Ready to Make Online Exams Fair?</h2>
                    <p>Join the next generation of secure, scalable, and intelligent assessment platforms.</p>
                    <button className="btn-primary large" onClick={() => navigate('/verification')}>
                        Launch Secure Exam <ArrowRight className="btn-icon" />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="nav-logo">
                            <ShieldCheck className="logo-icon" />
                            <span>ProctorAI</span>
                        </div>
                        <p>Ensuring integrity in digital assessments through advanced artificial intelligence.</p>
                    </div>
                    <div className="footer-links">
                        <div className="link-column">
                            <h4>Product</h4>
                            <a href="#problem">Features</a>
                            <a href="#how-it-works">How it Works</a>
                            <a href="/dashboard">Dashboard</a>
                        </div>
                        <div className="link-column">
                            <h4>Company</h4>
                            <a href="#">About Us</a>
                            <a href="#">Team</a>
                            <a href="#">Contact</a>
                        </div>
                        <div className="link-column">
                            <h4>Legal</h4>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">GitHub</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} ProctorAI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
