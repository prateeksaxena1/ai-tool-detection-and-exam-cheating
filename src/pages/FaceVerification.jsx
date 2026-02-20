import React, { useState, useEffect, useRef } from 'react';
import { Camera, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import '../styles/verification.css';

const FaceVerification = () => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [status, setStatus] = useState('initializing'); // initializing, active, error, captured
    const [errorMsg, setErrorMsg] = useState('');

    const startCamera = async () => {
        try {
            setStatus('initializing');
            setErrorMsg('');
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: false
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                setStatus('active');
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            setStatus('error');
            setErrorMsg('Camera access denied or unavailable. Please check permissions.');
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }
    };

    useEffect(() => {
        startCamera();
        return () => stopCamera(); // Cleanup on unmount
    }, []);

    const handleCapture = () => {
        if (status === 'active') {
            setStatus('captured');
            // For a real app, you would draw the video frame to a canvas here and get the data URL
            stopCamera();
            setTimeout(() => {
                alert("Face successfully captured! Proceeding to exam...");
                // navigate('/dashboard') or similar
            }, 1000);
        }
    };

    const handleRetry = () => {
        setStatus('initializing');
        startCamera();
    };

    return (
        <div className="verification-layout">
            {/* Header */}
            <header className="secure-header">
                <div className="secure-brand">
                    <div className="secure-icon">P-AI</div>
                    <div className="secure-name">
                        ProctorAI<span>Secure</span>
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
                    <div className={`glowing-oval ${status === 'active' ? 'pulse' : ''}`}></div>

                    {/* Outer corners matching the design */}
                    <div className="corner top-left" style={{ top: '40px', left: '160px', opacity: 0.5 }}></div>
                    <div className="corner top-right" style={{ top: '40px', right: '160px', opacity: 0.5 }}></div>

                    <div className="live-feed-box relative">
                        <div className="corner top-left"></div>
                        <div className="corner top-right"></div>
                        <div className="corner bottom-left"></div>
                        <div className="corner bottom-right"></div>

                        {/* Video Element */}
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className={`w-full h-full object-cover rounded-lg ${status !== 'active' ? 'hidden' : ''}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
                        />

                        {/* Overlays based on status */}
                        {status === 'initializing' && (
                            <div className="feed-placeholder absolute inset-0 flex flex-col items-center justify-center text-center">
                                <div className="feed-text">Accessing Camera...</div>
                                <div className="feed-subtext animate-pulse">Please allow permissions</div>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="feed-placeholder absolute inset-0 flex flex-col items-center justify-center text-center text-red-400">
                                <AlertCircle size={48} className="mb-4 text-red-500" />
                                <div className="feed-text text-red-500">Camera Error</div>
                                <div className="feed-subtext max-w-[80%]">{errorMsg}</div>
                            </div>
                        )}

                        {status === 'captured' && (
                            <div className="feed-placeholder absolute inset-0 flex flex-col items-center justify-center text-center bg-green-900/50">
                                <CheckCircle2 size={64} className="mb-4 text-green-400" />
                                <div className="feed-text text-green-400">Captured Successfully</div>
                            </div>
                        )}
                    </div>

                    <div className="status-pills mt-6">
                        <div className={`status-pill ${status === 'active' ? 'active' : ''}`}>
                            <span className="pill-dot"></span>
                            {status === 'active' ? 'FACE DETECTED' : 'WAITING FOR CAMERA'}
                        </div>
                        <div className={`status-pill ${status === 'active' ? 'active text-blue-400' : ''}`}>
                            <span className="pill-dot" style={{ backgroundColor: status === 'active' ? '#60a5fa' : '' }}></span>
                            IDENTITY MATCHING...
                        </div>
                        <div className={`status-pill ${status === 'active' ? 'active text-green-400' : ''}`}>
                            <span className="pill-dot" style={{ backgroundColor: status === 'active' ? '#4ade80' : '' }}></span>
                            POSITION ALIGNED
                        </div>
                    </div>
                </div>

                <div className="verification-actions mt-8">
                    <button
                        className={`btn-capture ${status !== 'active' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleCapture}
                        disabled={status !== 'active'}
                    >
                        <Camera size={20} />
                        Capture Face
                    </button>
                    <button
                        className="btn-retry"
                        onClick={handleRetry}
                    >
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
