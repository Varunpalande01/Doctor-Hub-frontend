  // src/utils/adminDashboardDummyData.js

  export const adminDashboardData = {
    stats: {
      totalDoctors: 350,
      totalPatients: 1200,
      totalAppointments: 5400,
      pendingVerifications: 12,
      revenue: "$12,450"
    },
    pendingDoctors: [
      { id: 1, name: "Dr. Aisha Khan", specialty: "Dermatologist", experience: "8 yrs", appliedDate: "2023-10-24", status: "Pending" },
      { id: 2, name: "Dr. Marc Post", specialty: "Cardiology", experience: "15 yrs", appliedDate: "2023-10-25", status: "Pending" },
    ],
    allDoctors: [
      { id: 101, name: "Dr. Smith", specialty: "General Physician", status: "Active", patients: 450 },
      { id: 102, name: "Dr. Sarah", specialty: "Pediatrics", status: "Inactive", patients: 210 },
    ],
    systemLogs: [
      { id: 1, action: "New doctor registered", user: "System", time: "2 mins ago", type: "info" },
      { id: 2, action: "Database Backup", user: "Admin", time: "1 hour ago", type: "success" },
      { id: 3, action: "Failed Login Attempt", user: "Unknown", time: "3 hours ago", type: "critical" },
    ]
  };