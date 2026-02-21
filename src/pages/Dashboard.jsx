import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ShieldCheck, LayoutDashboard, Video, Users, FileText, Settings,
    Search, Bell, Eye, AlertTriangle, BarChart2, CheckCircle2, Download, Plus, X, BookOpen, Clock, ArrowLeft
} from 'lucide-react';
import { mockUsers, mockTests, generateCSVLog } from '../data/mockData';
import { supabase } from '../lib/supabase';
import '../styles/dashboard.css';
import '../styles/admin.css';
import '../styles/test-cards.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [testForm, setTestForm] = useState({ name: '', date: '', duration: '', limit: '' });
    const [selectedTest, setSelectedTest] = useState(null);
    const [activeTab, setActiveTab] = useState('CURRENT');
    const [tests, setTests] = useState(mockTests);

    // Role: prefer location.state (just navigated), then localStorage (page refresh), then default
    const role = location.state?.role
        || localStorage.getItem('userRole')
        || 'student';

    const [isLoading, setIsLoading] = useState(true);

    // Optional: Log the recognized role for debugging
    useEffect(() => {
        console.log("Dashboard initialized with role:", role);
    }, [role]);

    // ── Fetch tests from Supabase; fall back to mockData if table is empty/missing ──
    useEffect(() => {
        const fetchTests = async () => {
            try {
                const { data, error } = await supabase
                    .from('tests')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (!error && data && data.length > 0) {
                    // Map Supabase column names to the shape the UI expects
                    const mapped = data.map(t => ({
                        id: t.id,
                        name: t.name,
                        date: t.date,
                        endDate: t.end_date || t.date,
                        duration: t.duration,
                        candidatesEnrolled: t.candidates_enrolled ?? 0,
                        status: t.status || 'UPCOMING',
                        assessments: t.assessments ?? 0,
                        assignments: t.assignments ?? 0,
                        handsOn: t.hands_on ?? 0,
                    }));
                    setTests(mapped);
                }
                // If error or empty, mockTests stays as the default state
            } catch (err) {
                console.warn('Tests fetch failed, using mock data:', err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTests();
    }, []);

    const handleCreateTest = async (e) => {
        e.preventDefault();

        const payload = {
            name: testForm.name,
            date: testForm.date,
            end_date: testForm.date,
            duration: testForm.duration,
            candidates_enrolled: testForm.limit ? parseInt(testForm.limit) : 0,
            status: 'UPCOMING',
            assessments: 0,
            assignments: 0,
            hands_on: 0,
        };

        // Try to persist in Supabase first
        const { data: inserted, error } = await supabase
            .from('tests')
            .insert([payload])
            .select()
            .single();

        const newTest = inserted
            ? {
                id: inserted.id,
                name: inserted.name,
                date: inserted.date,
                endDate: inserted.end_date || inserted.date,
                duration: inserted.duration,
                candidatesEnrolled: inserted.candidates_enrolled ?? 0,
                status: inserted.status || 'UPCOMING',
                assessments: inserted.assessments ?? 0,
                assignments: inserted.assignments ?? 0,
                handsOn: inserted.hands_on ?? 0,
            }
            : {   // fallback: local-only (table may not exist yet)
                id: `t-${Date.now()}`,
                name: testForm.name,
                date: testForm.date,
                endDate: testForm.date,
                duration: testForm.duration,
                candidatesEnrolled: 0,
                status: 'UPCOMING',
                assessments: 0, assignments: 0, handsOn: 0,
            };

        if (error) console.warn('Supabase insert failed, test saved locally only:', error.message);

        setTests(prev => [...prev, newTest]);
        setIsModalOpen(false);
        setTestForm({ name: '', date: '', duration: '', limit: '' });
        setActiveTab('UPCOMING');
    };

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
                            <h1>Welcome back, {role === 'admin' ? 'Admin' : 'Student'}</h1>
                            <p>{role === 'admin'
                                ? 'Global monitoring is active across all ongoing test sessions. System running smoothly.'
                                : 'Your secure examination environment is ready. Select an upcoming test to begin verification.'}</p>
                            <div className="welcome-actions">
                                {role === 'admin' && <button className="btn-outline-dark">Export Logs</button>}
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



                    {/* Dynamic View: Tests List OR Candidates Data Table */}
                    {!selectedTest ? (
                        <div className="tests-section">
                            <div className="tests-tabs">
                                <button className={`tests - tab ${activeTab === 'CURRENT' ? 'active' : ''} `} onClick={() => setActiveTab('CURRENT')}>
                                    CURRENT ({tests.filter(t => t.status === 'CURRENT').length})
                                </button>
                                <button className={`tests - tab ${activeTab === 'COMPLETED' ? 'active' : ''} `} onClick={() => setActiveTab('COMPLETED')}>
                                    COMPLETED ({tests.filter(t => t.status === 'COMPLETED').length})
                                </button>
                                <button className={`tests - tab ${activeTab === 'UPCOMING' ? 'active' : ''} `} onClick={() => setActiveTab('UPCOMING')}>
                                    UPCOMING ({tests.filter(t => t.status === 'UPCOMING').length})
                                </button>
                                <button className={`tests - tab ${activeTab === 'EXPIRED' ? 'active' : ''} `} onClick={() => setActiveTab('EXPIRED')}>
                                    EXPIRED ({tests.filter(t => t.status === 'EXPIRED').length})
                                </button>
                            </div>

                            <div className="tests-toolbar">
                                <div className="search-input-wrapper">
                                    <Search size={16} color="#9098A9" />
                                    <input type="text" placeholder="Search for a Course" />
                                </div>
                                <div className="filter-dropdown">
                                    Type:
                                    <select>
                                        <option>All</option>
                                    </select>
                                </div>
                                <div className="filter-dropdown">
                                    Sort:
                                    <select>
                                        <option>Recently Added</option>
                                    </select>
                                </div>

                                {role === 'admin' && (
                                    <button className="btn-cyan" style={{ marginLeft: 'auto', padding: '8px 16px', borderRadius: '8px' }} onClick={() => setIsModalOpen(true)}>
                                        <Plus size={16} strokeWidth={2.5} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                                        Create Test
                                    </button>
                                )}
                            </div>

                            <div className="tests-grid">
                                {tests.filter(t => t.status === activeTab).map(test => (
                                    <div key={test.id} className="test-card">
                                        <div className="test-card-header">
                                            <div className="test-card-icon">
                                                <BookOpen size={24} color="white" />
                                            </div>
                                            <h4 className="test-card-title">{test.name}</h4>
                                        </div>
                                        <div className="test-card-stats">
                                            <div className="test-stat-col">
                                                <span className="test-stat-val">{test.handsOn} Hands-on</span>
                                                <span className="test-stat-label">0 Pending</span>
                                            </div>
                                            <div className="test-stat-col">
                                                <span className="test-stat-val">{test.assessments} Assessment(s)</span>
                                                <span className="test-stat-label">1 Pending</span>
                                            </div>
                                            <div className="test-stat-col">
                                                <span className="test-stat-val">{test.assignments} Assignment(s)</span>
                                                <span className="test-stat-label">0 Pending</span>
                                            </div>
                                        </div>
                                        <div className="test-card-footer">
                                            <div>Regular | Start {test.date} - {test.endDate}</div>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <Clock size={14} />
                                                <button className="launch-btn" onClick={() => {
                                                    if (role === 'admin') {
                                                        setSelectedTest(test);
                                                    } else {
                                                        navigate('/verification', { state: { flow: 'authenticate', testId: test.id } });
                                                    }
                                                }}>
                                                    {role === 'admin' ? 'VIEW' : 'START VERIFICATION'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="candidates-section" style={{ background: 'transparent', padding: '0', border: 'none', margin: '0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h2>{selectedTest.name} Overview</h2>
                                <button className="back-btn" onClick={() => setSelectedTest(null)} style={{ margin: '0' }}>
                                    <ArrowLeft size={16} /> Back to Tests
                                </button>
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
                                    <div className="stat-value">{selectedTest.candidatesEnrolled}</div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-header">
                                        <div className="stat-icon purple">
                                            <Eye size={20} />
                                        </div>
                                        <div className="stat-badge cyan">Live Now</div>
                                    </div>
                                    <div className="stat-title">Live Exams</div>
                                    <div className="stat-value">{Math.floor(selectedTest.candidatesEnrolled * 0.3)}</div>
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

                            <div className="candidates-section" style={{ marginTop: '24px' }}>
                                <div className="table-header">
                                    <h3>Registered Candidates</h3>
                                    <div className="search-bar" style={{ width: '250px' }}>
                                        <Search size={16} color="#9098A9" />
                                        <input type="text" placeholder="Search students..." />
                                    </div>
                                </div>
                                <table className="candidates-table">
                                    <thead>
                                        <tr>
                                            <th>Candidate</th>
                                            <th>Assigned Test</th>
                                            <th>Status / Risk</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockUsers.map(user => (
                                            <tr key={user.id} className="table-row">
                                                <td className="candidate-cell">
                                                    <img src={user.avatar} alt={user.name} className="candidate-avatar" />
                                                    <div className="candidate-info">
                                                        <span className="candidate-name">{user.name}</span>
                                                        <span className="candidate-email">{user.email}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="test-badge">{user.testAssigned}</span>
                                                </td>
                                                <td>
                                                    <span className={`stat - badge ${user.status === 'active' ? 'green' :
                                                        user.status === 'flagged' ? 'red' :
                                                            user.status === 'completed' ? 'cyan' : 'gray'
                                                        } `} style={{ display: 'inline-block', marginBottom: '4px' }}>
                                                        {user.status.toUpperCase()}
                                                    </span>
                                                    {user.status !== 'idle' && (
                                                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                                            Risk: <span style={{ color: user.status === 'flagged' ? '#EF4444' : 'inherit' }}>{user.riskScore}</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <a
                                                        href={generateCSVLog(user)}
                                                        download={`log_${user.id}_${new Date().toISOString().split('T')[0]}.csv`}
                                                        className="csv-btn"
                                                    >
                                                        <Download size={16} /> Live CSV
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Create Test Modal */}
            <div className={`modal - overlay ${isModalOpen ? 'open' : ''} `}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Create New Test</h2>
                        <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>
                    <form onSubmit={handleCreateTest}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Test Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. JEE Mains Mock 2026"
                                    required
                                    value={testForm.name}
                                    onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group-row">
                                <div className="form-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={testForm.date}
                                        onChange={(e) => setTestForm({ ...testForm, date: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Duration (mins)</label>
                                    <input
                                        type="number"
                                        placeholder="180"
                                        required
                                        value={testForm.duration}
                                        onChange={(e) => setTestForm({ ...testForm, duration: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Candidate Limit</label>
                                <input
                                    type="number"
                                    placeholder="Optional"
                                    value={testForm.limit}
                                    onChange={(e) => setTestForm({ ...testForm, limit: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-cyan" style={{ border: 'none' }}>
                                Create Test
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
