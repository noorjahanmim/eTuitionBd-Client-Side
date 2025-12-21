import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const Tuitions = () => {
  const axiosSecure = useAxiosSecure();
  const [tuitions, setTuitions] = useState([]);

  // Load all tuitions
  useEffect(() => {
    axiosSecure
      .get("/tuitions")
      .then((res) => setTuitions(res.data))
      .catch((err) => console.log(err));
  }, [axiosSecure]);

  // ---- Approve Handler ----
  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this tuition?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/tuitions/${id}/status`, { status: "Approved" })
          .then((res) => {
            if (res.data.modifiedCount > 0 || res.data.success) {
              Swal.fire("Approved!", "Tuition has been approved.", "success");

              setTuitions((prev) =>
                prev.map((t) =>
                  t._id === id ? { ...t, status: "Approved" } : t
                )
              );
            }
          })
          .catch(() =>
            Swal.fire("Error", "Something went wrong!", "error")
          );
      }
    });
  };

  // ---- Reject Handler ----
  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Tuition?",
      text: "Once rejected, tutors cannot see this post.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/tuitions/${id}/status`, { status: "Rejected" })
          .then((res) => {
            if (res.data.modifiedCount > 0 || res.data.success) {
              Swal.fire("Rejected!", "Tuition has been rejected.", "success");

              setTuitions((prev) =>
                prev.map((t) =>
                  t._id === id ? { ...t, status: "Rejected" } : t
                )
              );
            }
          })
          .catch(() =>
            Swal.fire("Error", "Something went wrong!", "error")
          );
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📚 Tuition Management</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Class</th>
            <th>Location</th>
            <th>Budget</th>
            <th>Status</th>
            <th>Approve / Reject</th>
          </tr>
        </thead>

        <tbody>
          {tuitions?.map((t) => (
            <tr key={t._id}>
              <td>{t.subject}</td>
              <td>{t.class}</td>
              <td>{t.location}</td>
              <td>${t.budget}</td>
              <td className="font-semibold">{t.status}</td>

              <td className="flex gap-2">
                <button
                  onClick={() => handleApprove(t._id)}
                  className="btn btn-xs btn-success"
                  disabled={t.status === "Approved"}
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(t._id)}
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

export default Tuitions;

