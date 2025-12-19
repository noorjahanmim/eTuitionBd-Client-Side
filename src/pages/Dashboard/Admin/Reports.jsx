const Reports = () => {
  const reports = []; // fetch from API

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📊 Reports & Analytics</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="p-6 bg-indigo-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Earnings</h3>
          <p className="text-2xl font-bold">$0</p>
        </div>
        <div className="p-6 bg-green-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Transactions</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="p-6 bg-yellow-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Active Tutors</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Amount</th>
            <th>Transaction ID</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r._id}>
              <td>{r.date}</td>
              <td>{r.user}</td>
              <td>${r.amount}</td>
              <td>{r.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Reports;
