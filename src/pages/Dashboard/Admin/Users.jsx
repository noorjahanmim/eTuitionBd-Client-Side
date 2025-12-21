import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    axiosSecure
      .get("/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setUsers([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete with SweetAlert2
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/users/${id}`);
        setUsers(users.filter((u) => u._id !== id));
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (err) {
        console.error("Delete failed:", err);
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      name: e.target.name.value,
      role: e.target.role.value,
      status: e.target.status.value,
    };

    try {
      await axiosSecure.put(`/users/${editingUser._id}`, updatedData);
      setUsers(
        users.map((u) => (u._id === editingUser._id ? { ...u, ...updatedData } : u))
      );
      setEditingUser(null);
      Swal.fire("Updated!", "User has been updated.", "success");
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire("Error!", "Failed to update user.", "error");
    }
  };

  if (loading)
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        👥 User Management ({users?.length || 0})
      </h2>

      {/* Edit Modal */}
      {editingUser && (
     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div className="bg-white p-6 rounded-2xl w-[400px]">
    <h3 className="text-xl font-bold mb-4">Edit User</h3>
    <form onSubmit={handleUpdate} className="space-y-3">
      {/* Name */}
      <input
        name="name"
        defaultValue={editingUser.name}
        className="w-full border rounded-lg px-3 py-2"
        placeholder="Name"
      />

      {/* Role */}
      <select
        name="role"
        defaultValue={editingUser.role || "student"}
        className="select select-bordered w-full"
      >
        <option value="student">Student</option>
        <option value="admin">Admin</option>
        <option value="teacher">Teacher</option>
      </select>

      {/* Status */}
      <select
        name="status"
        defaultValue={editingUser.status || "active"}
        className="select select-bordered w-full"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="banned">Banned</option>
      </select>

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={() => setEditingUser(null)}
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

      {/* Users Table */}
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role || "student"}</td>
              <td>{u.status || "active"}</td>
              <td className="flex gap-2">
                <button
                  className="btn btn-xs btn-warning"
                  onClick={() => setEditingUser(u)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;




