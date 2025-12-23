import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TuitionManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [tuitions, setTuitions] = useState([]);

  // Load all tuitions
  useEffect(() => {
    axiosSecure
      .get("/tuitionManagement")
      .then((res) => setTuitions(res.data))
      .catch((err) => console.error("Failed to load tuitions", err));
  }, [axiosSecure]);

  // ---- Status Update Handler ----
  const updateStatus = async (id, newStatus) => {
    const confirm = await Swal.fire({
      title: `${newStatus} Tuition?`,
      text:
        newStatus === "Approved"
          ? "You are approving this tuition post"
          : "Once rejected, tutors cannot see this tuition",
      icon: newStatus === "Approved" ? "question" : "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${newStatus}`,
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/tuitions/${id}/status`, {
        status: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire(`${newStatus}!`, `Tuition has been ${newStatus.toLowerCase()}.`, "success");

        setTuitions((prev) =>
          prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
        );
      }
    } catch {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div>
     <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
  📚 Tuition Management
  <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
    {tuitions.length} Posts
  </span>
</h2>


      <table className="table w-full">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Class</th>
            <th>Location</th>
            <th>Budget</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tuitions?.map((t) => (
            <tr key={t._id}>
              <td>{t.subject}</td>
              <td>{t.class}</td>
              <td>{t.location}</td>
              <td>৳ {t.budget}</td>
              <td className="font-semibold">{t.status}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => updateStatus(t._id, "Approved")}
                  className="btn btn-xs btn-success"
                  disabled={t.status === "Approved"}
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(t._id, "Rejected")}
                  className="btn btn-xs btn-error"
                  disabled={t.status === "Rejected"}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TuitionManagement;
