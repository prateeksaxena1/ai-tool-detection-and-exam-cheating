export const mockUsers = [
    {
        id: 'c-1001',
        name: 'Alex Johnson',
        email: 'alex.j@example.com',
        testAssigned: 'JEE Mains Mock Test 1',
        status: 'active',
        riskScore: '12%',
        avatar: 'https://i.pravatar.cc/150?u=alex',
        lastPing: '2s ago',
    },
    {
        id: 'c-1002',
        name: 'Priya Sharma',
        email: 'psharma@example.com',
        testAssigned: 'JEE Mains Mock Test 1',
        status: 'flagged',
        riskScore: '89%',
        avatar: 'https://i.pravatar.cc/150?u=priya',
        lastPing: '1s ago',
    },
    {
        id: 'c-1003',
        name: 'Michael Chen',
        email: 'mchen@example.com',
        testAssigned: 'Advanced Mathematics Final',
        status: 'completed',
        riskScore: '4%',
        avatar: 'https://i.pravatar.cc/150?u=michael',
        lastPing: '1hr ago',
    },
    {
        id: 'c-1004',
        name: 'Sarah Williams',
        email: 'swilliams@example.com',
        testAssigned: 'JEE Mains Mock Test 1',
        status: 'idle',
        riskScore: 'N/A',
        avatar: 'https://i.pravatar.cc/150?u=sarah',
        lastPing: '15m ago',
    },
    {
        id: 'c-1005',
        name: 'David Nkosi',
        email: 'dnkosi@example.com',
        testAssigned: 'Computer Science 101',
        status: 'active',
        riskScore: '8%',
        avatar: 'https://i.pravatar.cc/150?u=david',
        lastPing: '5s ago',
    },
];

export const mockTests = [
    {
        id: 't-101',
        name: 'Jan-June 2026-IET-PROG0078-CLASS',
        date: '2023-07-01',
        endDate: '2027-06-30',
        duration: '180 mins',
        candidatesEnrolled: 1250,
        status: 'CURRENT',
        assessments: 1,
        assignments: 0,
        handsOn: 0
    },
    {
        id: 't-102',
        name: 'Advanced Mathematics Final',
        date: '2026-03-20',
        endDate: '2026-03-20',
        duration: '120 mins',
        candidatesEnrolled: 840,
        status: 'UPCOMING',
        assessments: 1,
        assignments: 2,
        handsOn: 1
    }
];

export const generateCSVLog = (user) => {
    // Generates a mock CSV blob representing live tracking logs
    const headers = "Timestamp,Event_Type,Risk_Score,Confidence,Details\n";
    const rows = [
        `2026-02-21 10:00:01,Session Started,0%,100%,Standard initialization`,
        `2026-02-21 10:05:22,Face Detected,0%,98%,Normal framing`,
        `2026-02-21 10:15:45,Multiple Faces Detected,${user.status === 'flagged' ? '85%' : '15%'},80%,Background movement`,
        `2026-02-21 10:30:10,Audio Spike,${user.status === 'flagged' ? '92%' : '5%'},95%,Noise detected`
    ].join("\n");

    const csvContent = headers + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return URL.createObjectURL(blob);
};
