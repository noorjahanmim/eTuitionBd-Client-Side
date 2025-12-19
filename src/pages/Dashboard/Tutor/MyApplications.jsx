const MyApplications = () => {
  const applications = []; // fetch from API

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📋 My Applications</h2>
      {applications.length === 0 ? (
        <p className="text-gray-500">You haven’t applied to any tuitions yet.</p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div key={app._id} className="p-4 border rounded-lg shadow hover:shadow-md">
              <h3 className="font-semibold text-lg">{app.subject}</h3>
              <p>Class: {app.class}</p>
              <p>Status: <span className="font-bold">{app.status}</span></p>
              <div className="flex gap-3 mt-2">
                <button className="btn btn-sm btn-warning">Update</button>
                <button className="btn btn-sm btn-error">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MyApplications;
