import { useEffect, useState } from "react";

const TutorDashboard = ({ tutorEmail }) => {
  const [applications, setApplications] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    // My Applications
    fetch(`http://localhost:3000/applications/tutor/${tutorEmail}`)
      .then(res => res.json())
      .then(data => setApplications(data));

    // Ongoing Tuitions
    fetch(`http://localhost:3000/tutor/ongoing/${tutorEmail}`)
      .then(res => res.json())
      .then(data => setOngoing(data));

    // Revenue History
    fetch(`http://localhost:3000/payments/tutor/${tutorEmail}`)
      .then(res => res.json())
      .then(data => setRevenue(data));
  }, [tutorEmail]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tutor Dashboard</h2>

      <section>
        <h3 className="text-xl font-semibold">My Applications</h3>
        {applications.map(app => (
          <div key={app._id} className="border p-2 my-2">
            <p>Tuition: {app.tuitionId}</p>
            <p>Status: {app.status}</p>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-xl font-semibold mt-6">Ongoing Tuitions</h3>
        {ongoing.map(tuition => (
          <div key={tuition._id} className="border p-2 my-2">
            <p>Subject: {tuition.subject}</p>
            <p>Class: {tuition.class}</p>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-xl font-semibold mt-6">Revenue History</h3>
        {revenue.map(pay => (
          <div key={pay._id} className="border p-2 my-2">
            <p>Amount: {pay.amount} BDT</p>
            <p>Date: {new Date(pay.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TutorDashboard;
