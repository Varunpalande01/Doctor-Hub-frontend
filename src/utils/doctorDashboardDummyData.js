// src/utils/doctorDashboardDummyData.js

export const doctorDashboardData = {
  stats: {
    totalPatients: 125,
    todayAppointments: 8,
    pendingApprovals: 3,
  },
  todaysAppointments: [
    { id: 1, patient: "John Doe", time: "09:00 AM", status: "Scheduled" },
    { id: 2, patient: "Jane Smith", time: "09:30 AM", status: "Checked-in" },
    { id: 3, patient: "Michael Brown", time: "10:00 AM", status: "Scheduled" },
    { id: 4, patient: "Sara Khan", time: "10:30 AM", status: "Cancelled" },
    { id: 5, patient: "Alex Turner", time: "11:00 AM", status: "Scheduled" },
    { id: 6, patient: "Priya Verma", time: "11:30 AM", status: "Scheduled" },
    { id: 7, patient: "David Lee", time: "12:00 PM", status: "Checked-in" },
    { id: 8, patient: "Emma Watson", time: "12:30 PM", status: "Scheduled" },
  ],
  notifications: [
    "Lab report uploaded for patient Jane Smith",
    "Patient Michael Brown canceled appointment",
    "Reminder: Follow up with patient Sara Khan",
    "System update: Your profile has been verified",
  ],
};
