const Users = () => {
  const users = []; // fetch from API

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">👥 User Management</h2>
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
              <td>{u.role}</td>
              <td>{u.status}</td>
              <td className="flex gap-2">
                <button className="btn btn-xs btn-warning">Edit</button>
                <button className="btn btn-xs btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Users;
