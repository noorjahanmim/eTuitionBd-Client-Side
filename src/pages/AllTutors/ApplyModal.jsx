import { useState } from "react";

const ApplyModal = ({ tutor, tuitionId, closeModal }) => {
  const [formData, setFormData] = useState({
    qualifications: "",
    experience: "",
    expectedSalary: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    const application = {
      tutorId: tutor._id,
      tutorEmail: tutor.email,
      tuitionId,
      ...formData
    };

    fetch("http://localhost:3000/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application)
    })
      .then(res => res.json())
      .then(() => {
        alert("Application submitted!");
        closeModal();
      });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Apply for Tuition</h2>
        <p>Name: {tutor.name}</p>
        <p>Email: {tutor.email}</p>

        <input
          type="text"
          placeholder="Qualifications"
          value={formData.qualifications}
          onChange={e => setFormData({ ...formData, qualifications: e.target.value })}
          className="input input-bordered w-full my-2"
        />

        <input
          type="text"
          placeholder="Experience"
          value={formData.experience}
          onChange={e => setFormData({ ...formData, experience: e.target.value })}
          className="input input-bordered w-full my-2"
        />

        <input
          type="number"
          placeholder="Expected Salary"
          value={formData.expectedSalary}
          onChange={e => setFormData({ ...formData, expectedSalary: e.target.value })}
          className="input input-bordered w-full my-2"
        />

        <button type="submit" className="btn btn-primary w-full mt-4">Submit</button>
      </form>
    </div>
  );
};

export default ApplyModal;
