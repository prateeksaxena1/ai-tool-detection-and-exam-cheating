import React from 'react';
import {
    ShieldCheck, LayoutDashboard, Video, Users, FileText, Settings,
    Search, Bell, Eye, AlertTriangle, BarChart2
} from 'lucide-react';
import '../styles/dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-brand-icon">
                        <ShieldCheck size={20} strokeWidth={2.5} />
                    </div>
                    <span className="sidebar-brand-name">ProctoAI</span>
                </div>

                <nav className="nav-links">
                    <a href="#" className="nav-link active">
                        <LayoutDashboard size={20} />
                        Overview
                    </a>
                    <a href="#" className="nav-link">
                        <Video size={20} />
                        Live Monitoring
                    </a>
                    <a href="/verification" className="nav-link">
                        {/* Using face verification link here just to allow navigation for demo */}
                        <Users size={20} />
                        Candidates
                    </a>
                    <a href="#" className="nav-link">
                        <FileText size={20} />
                        Reports
                    </a>
                    <a href="#" className="nav-link">
                        <Settings size={20} />
                        Settings
                    </a>
                </nav>

                <div className="upgrade-card">
                    <div className="upgrade-title">Upgrade Plan</div>
                    <div className="upgrade-plan">Enterprise Pro</div>
                    <button className="upgrade-btn">Go Unlimited</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {/* Topbar */}
                <header className="topbar">
                    <div className="search-bar">
                        <Search size={18} color="#9098A9" />
                        <input type="text" placeholder="Search for candidates or logs..." />
                    </div>

                    <div className="topbar-right">
                        <div className="system-status">
                            <span className="status-dot"></span>
                            SYSTEM ACTIVE
                        </div>

                        <button className="notification-btn">
                            <Bell size={20} />
                            <span className="notification-badge"></span>
                        </button>

                        <div className="profile-section">
                            <div className="profile-info">
                                <span className="profile-name">Dr. Sarah Connor</span>
                                <span className="profile-role">Chief Examiner</span>
                            </div>
                            <div className="profile-avatar">
                                {/* AI generated portrait placeholder via unsplash source or generic image */}
                                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" alt="Sarah Connor" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Body */}
                <div className="dashboard-body">
                    {/* Welcome Hero */}
                    <div className="welcome-hero">
                        <div className="welcome-info">
                            <h1>Welcome back, Examiner</h1>
                            <p>Your AI Proctor is currently analyzing <span className="highlight-text">1,284 sessions</span> across 4 continents. Everything is running smoothly.</p>
                            <div className="welcome-actions">
                                <button className="btn-cyan">View Live Stream</button>
                                <button className="btn-outline-dark">Export Logs</button>
                            </div>
                        </div>
                        <div className="radar-wrapper">
                            <div className="radar-circle outer"></div>
                            <div className="radar-circle middle"></div>
                            <div className="radar-core">
                                <ShieldCheck size={32} />
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon cyan">
                                    <Users size={20} />
                                </div>
                                <div className="stat-badge green">+12%</div>
                            </div>
                            <div className="stat-title">Total Candidates</div>
                            <div className="stat-value">42,892</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon purple">
                                    <Eye size={20} />
                                </div>
                                <div className="stat-badge cyan">Live Now</div>
                            </div>
                            <div className="stat-title">Live Exams</div>
                            <div className="stat-value">1,284</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon red">
                                    <AlertTriangle size={20} />
                                </div>
                                <div className="stat-badge red">Critical</div>
                            </div>
                            <div className="stat-title">Flags Detected</div>
                            <div className="stat-value">48</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon yellow">
                                    <BarChart2 size={20} />
                                </div>
                                <div className="stat-badge gray">Global Avg</div>
                            </div>
                            <div className="stat-title">Avg Risk Score</div>
                            <div className="stat-value">12.4%</div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="charts-section">
                        {/* Activity Chart */}
                        <div className="chart-card">
                            <div className="chart-header">
                                <div className="chart-title">
                                    <h3>Monitoring Activity</h3>
                                    <p>Activity logs for the last 24 hours</p>
                                </div>
                                <div className="chart-toggle">
                                    <button className="toggle-btn active">Day</button>
                                    <button className="toggle-btn">Week</button>
                                </div>
                            </div>
                            <div className="bar-chart">
                                <div className="bar-col" style={{ height: '40%' }}></div>
                                <div className="bar-col" style={{ height: '30%' }}></div>
                                <div className="bar-col" style={{ height: '50%' }}></div>
                                <div className="bar-col" style={{ height: '60%' }}></div>
                                <div className="bar-col" style={{ height: '45%' }}></div>
                                <div className="bar-col" style={{ height: '20%' }}></div>
                                <div className="bar-col" style={{ height: '35%' }}></div>
                                <div className="bar-col" style={{ height: '50%' }}></div>
                                <div className="bar-col active" style={{ height: '80%' }}></div>
                                <div className="bar-col" style={{ height: '40%' }}></div>
                            </div>
                            <div className="chart-x-axis">
                                <span>00:00</span>
                                <span>06:00</span>
                                <span>12:00</span>
                                <span>18:00</span>
                                <span>NOW</span>
                            </div>
                        </div>

                        {/* Risk Index Donut */}
                        <div className="chart-card">
                            <div className="chart-header">
                                <div className="chart-title" style={{ textAlign: "center", width: "100%", textTransform: "uppercase", letterSpacing: "1px" }}>
                                    <h3>Global Risk Index</h3>
                                </div>
                            </div>
                            <div className="doughnut-container">
                                <div className="doughnut">
                                    <div className="doughnut-inner">
                                        <div className="doughnut-value">24<span>%</span></div>
                                        <div className="doughnut-label">Moderate Risk</div>
                                    </div>
                                </div>
                                <div className="doughnut-legend">
                                    <div className="legend-item">
                                        <span className="legend-label">Safe</span>
                                        <span className="legend-val">76%</span>
                                    </div>
                                    <div className="legend-item" style={{ alignItems: "flex-end" }}>
                                        <span className="legend-label">Violations</span>
                                        <span className="legend-val red">3.2%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
