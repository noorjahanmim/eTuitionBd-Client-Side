import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, BookOpen, MapPin, Banknote, Calendar, MoreHorizontal, Trash2, Edit3, Search } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // ✅ import

const MyTuitions = () => {
  const { user } = useAuth();
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [editingTuition, setEditingTuition] = useState(null);


  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/tuitions/${id}`);
      setTuitions((prev) => prev.filter((t) => t._id !== id)); // UI থেকে remove করো
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };


  const handleUpdate = async (id) => {
    const updatedData = {
      subject: "Updated Subject",
      budget: 6000,
    };
    try {
      await axiosSecure.put(`/tuitions/${id}`, updatedData);
      setTuitions((prev) =>
        prev.map((t) => (t._id === id ? { ...t, ...updatedData } : t))
      );
    } catch (err) {
      console.error("Update failed:", err);
    }
  };


  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/my-tuitions/${user.email}`)
      .then((res) => {
        setTuitions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setTuitions([]);
        setLoading(false);
      });
  }, [user, axiosSecure]);

  return (
    <div className="w-full">
      {editingTuition && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl w-[400px]">
      <h3 className="text-xl font-bold mb-4">Edit Tuition</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const updatedData = {
            subject: e.target.subject.value,
            budget: parseInt(e.target.budget.value),
            location: e.target.location.value,
          };
          try {
            await axiosSecure.put(`/tuitions/${editingTuition._id}`, updatedData);
            setTuitions((prev) =>
              prev.map((t) =>
                t._id === editingTuition._id ? { ...t, ...updatedData } : t
              )
            );
            setEditingTuition(null);
          } catch (err) {
            console.error("Update failed:", err);
          }
        }}
      >
        <div className="space-y-3">
          <input
            name="subject"
            defaultValue={editingTuition.subject}
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            name="budget"
            type="number"
            defaultValue={editingTuition.budget}
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            name="location"
            defaultValue={editingTuition.location}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={() => setEditingTuition(null)}
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

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <span className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
              <BookOpen size={28} />
            </span>
            My Tuitions
          </h2>
          <p className="text-slate-500 mt-1 ml-1">Manage and track your posted tuition requests</p>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/dashboard/student/post-tuition"
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            <Plus size={20} /> Post New Tuition
          </Link>
        </motion.div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-indigo-600"></span>
        </div>
      ) : (
        <AnimatePresence>
          {tuitions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] py-20 text-center"
            >
              <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">No Tuitions Found</h3>
              <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                You haven't posted any tuition requests yet. Start finding your perfect tutor today!
              </p>
              <Link
                to="/dashboard/student/post-tuition"
                className="btn btn-outline border-slate-300 hover:bg-indigo-600 hover:border-indigo-600 rounded-xl px-8"
              >
                Create First Post
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tuitions.map((tuition, index) => (
                <motion.div
                  key={tuition._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white border border-slate-100 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Status Badge */}
                  <div className="absolute top-0 right-0 p-4">
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-100">
                      {tuition.status || "Pending"}
                    </span>
                  </div>

                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <h3 className="text-xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">
                        {tuition.subject}
                      </h3>
                      <p className="flex items-center gap-1 text-slate-400 text-xs font-medium uppercase tracking-tighter">
                        <Calendar size={14} /> Posted on {new Date(tuition.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-slate-50 p-3 rounded-2xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Class</p>
                        <p className="font-bold text-slate-700">{tuition.class}</p>
                      </div>
                      <div className="bg-indigo-50/50 p-3 rounded-2xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Salary</p>
                        <p className="font-bold text-indigo-600">৳{tuition.budget}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
                      <MapPin size={16} className="text-rose-500" />
                      <span className="font-medium">{tuition.location}</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    

                      <div className="flex gap-2">
                        {/* <button
                          onClick={() => handleUpdate(tuition._id)}
                          className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-all"
                        >
                          <Edit3 size={18} />
                        </button> */}

                        <button
  onClick={() => setEditingTuition(tuition)}
  className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-all"
>
  <Edit3 size={18} />
</button>

                        <button
                          onClick={() => handleDelete(tuition._id)}
                          className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <button className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
                        View Applicants <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
    
  );


  
};






export default MyTuitions;
