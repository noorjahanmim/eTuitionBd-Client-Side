const Tuitions = () => {
  const tuitions = []; // fetch from API

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
            <th>Approve/Reject</th>
          </tr>
        </thead>
        <tbody>
          {tuitions.map((t) => (
            <tr key={t._id}>
              <td>{t.subject}</td>
              <td>{t.class}</td>
              <td>{t.location}</td>
              <td>${t.budget}</td>
              <td>{t.status}</td>
              <td className="flex gap-2">
                <button className="btn btn-xs btn-success">Approve</button>
                <button className="btn btn-xs btn-error">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Tuitions;
