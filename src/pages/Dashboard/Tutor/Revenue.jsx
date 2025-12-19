const Revenue = () => {
  const revenues = []; // fetch from API

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">💰 Revenue History</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Tuition</th>
            <th>Amount</th>
            <th>Transaction ID</th>
          </tr>
        </thead>
        <tbody>
          {revenues.map((r) => (
            <tr key={r._id}>
              <td>{r.date}</td>
              <td>{r.tuition}</td>
              <td>${r.amount}</td>
              <td>{r.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Revenue;
