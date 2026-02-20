import React from 'react';
import { Camera, RotateCcw } from 'lucide-react';
import '../styles/verification.css';

const FaceVerification = () => {
    return (
        <div className="verification-layout">
            {/* Header */}
            <header className="secure-header">
                <div className="secure-brand">
                    <div className="secure-icon">P-AI</div>
                    <div className="secure-name">
                        ProctoAI<span>Secure</span>
                    </div>
                </div>
                <div className="security-level">
                    SECURITY LEVEL: HIGH (BIOMETRIC)
                </div>
            </header>

            {/* Main Content */}
            <main className="verification-content">
                <div className="verification-titles">
                    <h1>Face Verification in Progress</h1>
                    <p>Align your face within the frame and look directly at the camera.</p>
                </div>

                <div className="feed-container">
                    {/* Glowing oval wrapper */}
                    <div className="glowing-oval"></div>

                    {/* Outer corners matching the design */}
                    <div className="corner top-left" style={{ top: '40px', left: '160px', opacity: 0.5 }}></div>
                    <div className="corner top-right" style={{ top: '40px', right: '160px', opacity: 0.5 }}></div>

                    <div className="live-feed-box">
                        <div className="corner top-left"></div>
                        <div className="corner top-right"></div>
                        <div className="corner bottom-left"></div>
                        <div className="corner bottom-right"></div>

                        <div className="feed-text">Live Feed</div>
                        <div className="feed-subtext">Placeholder</div>
                    </div>

                    <div className="status-pills">
                        <div className="status-pill active">
                            <span className="pill-dot"></span>
                            FACE DETECTED
                        </div>
                        <div className="status-pill">
                            <span className="pill-dot"></span>
                            IDENTITY MATCHING...
                        </div>
                        <div className="status-pill">
                            <span className="pill-dot"></span>
                            POSITION ALIGNED
                        </div>
                        <div className="status-pill">
                            <span className="pill-dot"></span>
                            LIGHTING SUFFICIENT
                        </div>
                    </div>
                </div>

                <div className="verification-actions">
                    <button className="btn-capture">
                        <Camera size={20} />
                        Capture Face
                    </button>
                    <button className="btn-retry">
                        <RotateCcw size={20} />
                        Retry
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="secure-footer">
                <span>ENCRYPTION: AES-256</span>
                <span className="dot">•</span>
                <span>PROCTOR ID: #6821-X</span>
                <span className="dot">•</span>
                <span>ISO 27001 CERTIFIED</span>
            </footer>
        </div>
    );
};

export default FaceVerification;
