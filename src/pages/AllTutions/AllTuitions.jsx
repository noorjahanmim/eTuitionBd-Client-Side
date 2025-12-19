// // src/pages/AllTuitions/AllTuitions.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const AllTuitions = () => {
//   const [tuitions, setTuitions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:3000/tuition") // backend API
//       .then((res) => res.json())
//       .then((data) => {
//         setTuitions(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading tuitions...</p>;

//   if (tuitions.length === 0) return <p className="text-center mt-10">No tuitions available.</p>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">All Tuitions</h1>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {tuitions.map((tuition) => (
//           <div key={tuition._id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
//             <h2 className="text-xl font-semibold mb-2">{tuition.subject}</h2>
//             <p>Class: {tuition.class}</p>
//             <p>Location: {tuition.location}</p>
//             <p>Budget: ${tuition.budget}</p>
//             <Link
//               to={`/tuitions/${tuition._id}`}
//               className="mt-3 inline-block text-blue-600 hover:underline"
//             >
//               View Details
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllTuitions;



// src/pages/AllTuitions/AllTuitions.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TuitionCard from "./TuitionCard";

const AllTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/tuitions") // plural
      .then((res) => {
        setTuitions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) return <p className="text-center mt-10">Loading tuitions...</p>;
  if (tuitions.length === 0) return <p className="text-center mt-10">No tuitions available.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Tuitions</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tuitions.map((tuition) => (
          <TuitionCard key={tuition._id} tuition={tuition}></TuitionCard>
          // <div key={tuition._id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
          //   <h2 className="text-xl font-semibold mb-2">{tuition.subject}</h2>
          //   <p>Class: {tuition.class}</p>
          //   <p>Location: {tuition.location}</p>
          //   <p>Budget: ${tuition.budget}</p>
          
          //   <Link
          //     to={`/tuitions/${tuition._id}`} // matches router
          //     className="mt-3 inline-block text-blue-600 hover:underline"
          //   >
          //     View Details
          //   </Link>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default AllTuitions;


