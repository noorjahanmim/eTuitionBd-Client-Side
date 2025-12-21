// const MyApplications = () => {
//   const applications = []; // fetch from API

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">📋 My Applications</h2>
//       {applications.length === 0 ? (
//         <p className="text-gray-500">You haven’t applied to any tuitions yet.</p>
//       ) : (
//         <div className="grid gap-4">
//           {applications.map((app) => (
//             <div key={app._id} className="p-4 border rounded-lg shadow hover:shadow-md">
//               <h3 className="font-semibold text-lg">{app.subject}</h3>
//               <p>Class: {app.class}</p>
//               <p>Status: <span className="font-bold">{app.status}</span></p>
//               <div className="flex gap-3 mt-2">
//                 <button className="btn btn-sm btn-warning">Update</button>
//                 <button className="btn btn-sm btn-error">Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// export default MyApplications;



// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAuth from "../../../hooks/useAuth";


// const MyApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   useEffect(() => {
//     if (user?.email) {
//       axiosSecure.get(`/applications/tutor/${user.email}`)
//         .then(res => setApplications(res.data))
//         .catch(err => console.error("Error fetching applications:", err));
//     }
//   }, [user, axiosSecure]);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">📋 My Applications</h2>
//       {applications.length === 0 ? (
//         <p className="text-gray-500">You haven’t applied to any tuitions yet.</p>
//       ) : (
//         <div className="grid gap-4">
//           {applications.map((app) => (
//             <div key={app._id} className="p-4 border rounded-lg shadow hover:shadow-md">
//               <h3 className="font-semibold text-lg">
//                 {app.tuition?.subject || "Unknown Subject"}
//               </h3>
//               <p>Class: {app.tuition?.class || "N/A"}</p>
//               <p>Status: <span className="font-bold">{app.status}</span></p>
//               <div className="flex gap-3 mt-2">
//                 <button className="btn btn-sm btn-warning">Update</button>
//                 <button className="btn btn-sm btn-error">Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyApplications;



import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [editingApp, setEditingApp] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const fetchApplications = () => {
    axiosSecure
      .get(`/applications/tutor/${user.email}`)
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Error fetching applications:", err));
  };

  useEffect(() => {
    if (user?.email) fetchApplications();
  }, [user, axiosSecure]);

  // 🔥 DELETE
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can't undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/applications/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Application removed.", "success");
          fetchApplications();
        }
      }
    });
  };

  // 🔥 UPDATE SUBMIT
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const status = form.status.value;

    const res = await axiosSecure.patch(`/applications/${editingApp._id}`, {
      status,
    });

    if (res.data.modifiedCount > 0) {
      Swal.fire("Updated!", "Application updated successfully", "success");
      setEditingApp(null);
      fetchApplications();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        📋 My Applications ({applications.length})
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-500">
          You haven’t applied to any tuitions yet.
        </p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="p-4 border rounded-lg shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-lg">
                {app.tuition?.subject || "Unknown Subject"}
              </h3>
              <p>Class: {app.tuition?.class || "N/A"}</p>

              <p>
                Status:
                <span className="font-bold ml-1 capitalize">
                  {app.status}
                </span>
              </p>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setEditingApp(app)}
                  className="btn btn-sm btn-warning"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(app._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 Update Modal */}
      {editingApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[420px]">
            <h3 className="text-xl font-bold mb-4">Update Application</h3>

            <form onSubmit={handleUpdate} className="space-y-3">
              <select
                name="status"
                defaultValue={editingApp.status}
                className="select select-bordered w-full"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingApp(null)}
                  className="px-4 py-2 bg-slate-200 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
