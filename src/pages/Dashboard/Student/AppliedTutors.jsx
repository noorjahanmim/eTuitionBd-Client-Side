// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { CheckCircle, XCircle } from "lucide-react";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAuth from "../../../hooks/useAuth";
// ;

// const AppliedTutors = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchApplications = async () => {
//       try {
//         const res = await axiosSecure.get(`/applications/student/${user.email}`);
//         setApplications(res.data);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         toast.error("Failed to load applications.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, [axiosSecure, user?.email]);

//   // Reject handler
//   const handleReject = async (applicationId) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you really want to reject this tutor application?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, Reject",
//       cancelButtonText: "Cancel"
//     });

//     if (result.isConfirmed) {
//       try {
//         const res = await axiosSecure.patch(`/applications/${applicationId}`, { status: "Rejected" });
//         if (res.data.modifiedCount > 0) {
//           Swal.fire("Rejected!", "Tutor application has been rejected.", "success");
//           setApplications((prev) =>
//             prev.map((app) =>
//               app._id === applicationId ? { ...app, status: "Rejected" } : app
//             )
//           );
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to reject application.");
//       }
//     }
//   };

//   // Approve handler → Stripe checkout
//   const handleApprove = async (application) => {
//     try {
//       const paymentInfo = {
//         applicationId: application._id,
//         expectedSalary: application.expectedSalary,
//         tutorEmail: application.tutorEmail,
//         tutorName: application.tutorName,
//         subject: application.tuitionInfo?.subject,
//         tuitionClass: application.tuitionInfo?.class,
//         tuitionId: application.tuitionInfo?._id,
//         studentEmail: user?.email
//       };

//       if (!paymentInfo.subject || !paymentInfo.tuitionClass || !paymentInfo.tuitionId) {
//         return Swal.fire("Error", "Tuition info missing in application", "error");
//       }

//       const res = await axiosSecure.post("/payment-checkout-session", paymentInfo);
//       if (!res.data?.url) {
//         return Swal.fire("Error", "No payment URL received", "error");
//       }

//       window.location.assign(res.data.url);
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to start payment", "error");
//     }
//   };

//   return (
//     <div className="w-full min-h-screen">
//       <h2 className="text-3xl font-black text-slate-800 mb-6">Applied Tutors</h2>

//       {loading ? (
//         <div className="flex justify-center py-20">
//           <span className="loading loading-spinner loading-lg text-indigo-600"></span>
//         </div>
//       ) : (
//         <AnimatePresence>
//           {applications.length === 0 ? (
//             <div className="text-center py-20 text-slate-500 font-medium">
//               No Applications Yet
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="table table-zebra w-full">
//                 <thead>
//                   <tr className="text-slate-700">
//                     <th>Tutor Info</th>
//                     <th>Tuition Info</th>
//                     <th>Expected Salary</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {applications.map((a, index) => (
//                     <motion.tr
//                       key={a._id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                     >
//                       <td>
//                         <p className="font-bold">{a.tutorName}</p>
//                         <p className="text-xs text-slate-500">{a.tutorEmail}</p>
//                       </td>
//                       <td>
//                         <p className="font-semibold">{a.tuitionInfo?.subject}</p>
//                         <p className="text-xs text-slate-500">Class {a.tuitionInfo?.class}</p>
//                       </td>
//                       <td className="font-black text-indigo-600">৳ {a.expectedSalary}</td>
//                       <td>
//                         <span className={`badge ${
//                           a.status === "Approved" ? "badge-success" :
//                           a.status === "Rejected" ? "badge-error" :
//                           "badge-warning"
//                         }`}>
//                           {a.status || "Pending"}
//                         </span>
//                       </td>
//                       <td className="flex gap-2">
//                         <button
//                           onClick={() => handleReject(a._id)}
//                           disabled={a.status === "Approved" || a.status === "Rejected"}
//                           className={`btn btn-xs flex items-center gap-1 ${
//                             a.status === "Rejected" || a.status === "Approved"
//                               ? "btn-disabled"
//                               : "btn-outline btn-error"
//                           }`}
//                         >
//                           <XCircle size={14} /> Reject
//                         </button>

//                         <button
//                           onClick={() => handleApprove(a)}
//                           disabled={a.status === "Approved" || a.status === "Rejected"}
//                           className={`btn btn-xs flex items-center gap-1 ${
//                             a.status === "Rejected" || a.status === "Approved"
//                               ? "btn-disabled"
//                               : "btn-primary"
//                           }`}
//                         >
//                           <CheckCircle size={14} /> Accept
//                         </button>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </AnimatePresence>
//       )}
//     </div>
//   );
// };

// export default AppliedTutors;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Check, X } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


  const AppliedTutors = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchApplications = async () => {
      try {
        const res = await axiosSecure.get(`/my-applications/student/${user.email}`);
        setApplications(res.data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        toast.error("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user?.email, axiosSecure]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axiosSecure.put(`/applications/${id}`, { status: newStatus });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
      toast.success(`Application ${newStatus}`);
    } catch (err) {
      console.error("Status update failed:", err);
      toast.error("Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-bold text-slate-700 mb-2">
          No Applications Found
        </h3>
        <p className="text-slate-500">
          You have not received any applications yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {applications.map((app) => (
        <motion.div
          key={app._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-100 rounded-2xl p-6 shadow hover:shadow-lg transition-all"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            {app.tutorName}
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Applied on: {new Date(app.appliedAt || app.createdAt).toLocaleDateString()}
          </p>
          <p className="text-slate-700 mb-4">
            <span className="font-bold">Subject:</span> {app.subject}
          </p>
          <p className="text-slate-700 mb-4">
            <span className="font-bold">Message:</span> {app.message || "N/A"}
          </p>
          <div className="flex items-center gap-2 mb-4">
            <span className="font-bold text-sm">Status:</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                app.status === "approved"
                  ? "bg-emerald-100 text-emerald-600"
                  : app.status === "rejected"
                  ? "bg-rose-100 text-rose-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {app.status || "Pending"}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleStatusUpdate(app._id, "approved")}
              disabled={app.status === "approved"}
              className="flex-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 py-2 rounded-lg flex items-center justify-center gap-2 font-bold text-sm disabled:opacity-50"
            >
              <Check size={16} /> Approve
            </button>
            <button
              onClick={() => handleStatusUpdate(app._id, "rejected")}
              disabled={app.status === "rejected"}
              className="flex-1 bg-rose-50 text-rose-600 hover:bg-rose-100 py-2 rounded-lg flex items-center justify-center gap-2 font-bold text-sm disabled:opacity-50"
            >
              <X size={16} /> Reject
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AppliedTutors;
