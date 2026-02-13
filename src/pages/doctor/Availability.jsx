// // src/pages/doctor/Availability.jsx
// import React, { useState, useEffect } from "react";
// import "./Availability.css";

// const Availability = ({ doctorId }) => {
//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
//   const defaultSlots = [
//     "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
//     "11:00 AM", "11:30 AM", "12:00 PM",
//     "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"
//   ];

//   const [slots, setSlots] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [popup, setPopup] = useState(null);

//   // Fetch availability
//   const fetchAvailability = async () => {
//     if (!doctorId) return; // Graceful fallback if doctorId not available
//     try {
//       setLoading(true);
//       const res = await fetch(`http://localhost:8080/api/doctor-availability/${doctorId}`);
//       console.log("Fetch response status:", res.status);
//       if (!res.ok) throw new Error("Failed to fetch availability");
//       const data = await res.json();
//       console.log("Fetched availability:", data);

//       const temp = {};
//       days.forEach(day => {
//         temp[day] = defaultSlots.map(time => {
//           const slot = Array.isArray(data) ? data.find(s => s.day === day && s.time === time) : null;
//           return { time, status: slot?.status || "available" };
//         });
//       });
//       setSlots(temp);
//     } catch (err) {
//       console.error(err);
//       setPopup({ text: "Failed to fetch availability", type: "warning" });

//       // fallback: all slots available
//       const temp = {};
//       days.forEach(day => {
//         temp[day] = defaultSlots.map(time => ({ time, status: "available" }));
//       });
//       setSlots(temp);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAvailability();
//   }, [doctorId]);

//   // Check if day is fully blocked
//   const isDayFullyBlocked = (day) =>
//     slots[day]?.every(slot => slot.status === "blocked");

//   // Block/unblock full day
//   const handleBlockFullDay = async (day) => {
//     if (!doctorId) return;
//     try {
//       const url = `http://localhost:8080/api/doctor-availability/${doctorId}/block-day?day=${encodeURIComponent(day)}`;
//       const res = await fetch(url, { method: "PUT" });
//       if (res.ok) {
//         const updated = { ...slots };
//         updated[day] = updated[day].map(slot => ({ ...slot, status: "blocked" }));
//         setSlots(updated);
//         setPopup({ text: `All slots for ${day} blocked`, type: "warning" });
//       }
//     } catch (err) {
//       console.error(err);
//       setPopup({ text: "Failed to block day", type: "warning" });
//     }
//   };

//   const handleUnblockFullDay = async (day) => {
//     if (!doctorId) return;
//     try {
//       const url = `http://localhost:8080/api/doctor-availability/${doctorId}/unblock-day?day=${encodeURIComponent(day)}`;
//       const res = await fetch(url, { method: "PUT" });
//       if (res.ok) {
//         const updated = { ...slots };
//         updated[day] = updated[day].map(slot => ({ ...slot, status: "available" }));
//         setSlots(updated);
//         setPopup({ text: `All slots for ${day} are now available`, type: "success" });
//       }
//     } catch (err) {
//       console.error(err);
//       setPopup({ text: "Failed to unblock day", type: "warning" });
//     }
//   };

//   // Update single slot
//   const handleSlotAction = async (day, time) => {
//     if (!doctorId) return;
//     try {
//       const slot = slots[day]?.find(s => s.time === time);
//       if (!slot) return;

//       let newStatus = slot.status === "available" ? "blocked" : "available";
//       if (slot.status === "booked") newStatus = "blocked";

//       const url = `http://localhost:8080/api/doctor-availability/${doctorId}/update-slot?day=${encodeURIComponent(day)}&time=${encodeURIComponent(time)}&status=${encodeURIComponent(newStatus)}`;
//       const res = await fetch(url, { method: "PUT" });

//       if (res.ok) {
//         const updated = { ...slots };
//         updated[day] = updated[day].map(s => s.time === time ? { ...s, status: newStatus } : s);
//         setSlots(updated);
//         setPopup({ text: `Slot ${time} is now ${newStatus}`, type: "success" });
//       } else {
//         console.error("Failed to update slot");
//         setPopup({ text: "Failed to update slot", type: "warning" });
//       }
//     } catch (err) {
//       console.error(err);
//       setPopup({ text: "Failed to update slot", type: "warning" });
//     }
//   };

//   // Auto-hide popup
//   useEffect(() => {
//     if (popup) {
//       const timer = setTimeout(() => setPopup(null), 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [popup]);

//   // If doctorId is missing
//   // Doctor panel always has doctorId
// if (!doctorId) {
//   // For safety, just show loading
//   return <div className="doctor-page"><h2>Loading Availability...</h2></div>;
// }


//   if (loading) return <div className="doctor-page"><h2>Loading Availability...</h2></div>;

//   return (
//     <div className="doctor-page">
//       <h2>Doctor Availability</h2>
//       <div className="availability-container">
//         {days.map(day => (
//           <div key={day} className="availability-day">
//             <div className="day-header">
//               <h4>{day}</h4>
//               {!isDayFullyBlocked(day) ? (
//                 <button className="block-day-btn" onClick={() => handleBlockFullDay(day)}>Block Full Day</button>
//               ) : (
//                 <button className="unblock-day-btn" onClick={() => handleUnblockFullDay(day)}>Unblock Day</button>
//               )}
//             </div>

//             <div className="slots-container">
//               {slots[day]?.map(slot => (
//                 <button
//                   key={slot.time}
//                   className={`slot-btn ${slot.status}`}
//                   onClick={() => handleSlotAction(day, slot.time)}
//                   disabled={slot.status === "booked"}
//                 >
//                   {slot.time}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {popup && (
//         <div className={`availability-popup ${popup.type}`}>
//           <p>{popup.text}</p>
//           <button onClick={() => setPopup(null)}>×</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Availability;



// src/pages/doctor/Availability.jsx
import React, { useState, useEffect } from "react";
import "./Availability.css";

const Availability = () => {

  const days = [
    "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const defaultSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM",
    "4:00 PM", "4:30 PM", "5:00 PM",
    "5:30 PM", "6:00 PM", "6:30 PM"
  ];

  // 🔹 Create initial dummy slots (NO useEffect needed)
const createInitialSlots = () => {
  const temp = {};

  days.forEach(day => {
    temp[day] = defaultSlots.map(time => {
      
      // 👇 Example dummy booked logic
      const isBooked =
        (day === "Monday" && time === "10:00 AM") ||
        (day === "Wednesday" && time === "4:30 PM");

      return {
        time,
        status: isBooked ? "booked" : "available"
      };
    });
  });

  return temp;
};

  // ✅ Only ONE state declaration
  const [slots, setSlots] = useState(createInitialSlots);
  const [popup, setPopup] = useState(null);

  // 🔹 Check if full day is blocked
  const isDayFullyBlocked = (day) =>
    slots[day]?.every(slot => slot.status === "blocked");

  // 🔹 Block full day
  const handleBlockFullDay = (day) => {
    const updated = { ...slots };

    updated[day] = updated[day].map(slot => ({
      ...slot,
      status: "blocked"
    }));

    setSlots(updated);
    setPopup({ text: `All slots for ${day} blocked`, type: "warning" });
  };

  // 🔹 Unblock full day
  const handleUnblockFullDay = (day) => {
    const updated = { ...slots };

    updated[day] = updated[day].map(slot => ({
      ...slot,
      status: "available"
    }));

    setSlots(updated);
    setPopup({ text: `All slots for ${day} are now available`, type: "success" });
  };

  // 🔹 Toggle single slot
const handleSlotAction = (day, time) => {
  const updated = { ...slots };

  updated[day] = updated[day].map(slot => {

    // ❌ If booked → do nothing
    if (slot.status === "booked") {
      return slot;
    }

    if (slot.time === time) {
      const newStatus =
        slot.status === "available" ? "blocked" : "available";

      return { ...slot, status: newStatus };
    }

    return slot;
  });

  setSlots(updated);
};


  // 🔹 Auto hide popup
  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => setPopup(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  return (
    <div className="doctor-page">
      <h2>Doctor Availability</h2>

      <div className="availability-container">
        {days.map(day => (
          <div key={day} className="availability-day">

            <div className="day-header">
              <h4>{day}</h4>

              {!isDayFullyBlocked(day) ? (
                <button
                  className="block-day-btn"
                  onClick={() => handleBlockFullDay(day)}
                >
                  Block Full Day
                </button>
              ) : (
                <button
                  className="unblock-day-btn"
                  onClick={() => handleUnblockFullDay(day)}
                >
                  Unblock Day
                </button>
              )}
            </div>

            <div className="slots-container">
              {slots[day]?.map(slot => (
                <button
  key={slot.time}
  className={`slot-btn ${slot.status}`}
  onClick={() => handleSlotAction(day, slot.time)}
  disabled={slot.status === "booked"}
>
                  {slot.time}
                </button>
              ))}
            </div>

          </div>
        ))}
      </div>

      {popup && (
        <div className={`availability-popup ${popup.type}`}>
          <p>{popup.text}</p>
          <button onClick={() => setPopup(null)}>×</button>
        </div>
      )}
    </div>
  );
};

export default Availability;
