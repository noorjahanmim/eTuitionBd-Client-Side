import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TuitionCard from "../../AllTutions/TuitionCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const LatestTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/latest-tuitions")
      .then((res) => {
        setTuitions(res.data); 
      })
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  return (
    <section className="py-16">
      {/* Header with Show More */}
      <div className="flex justify-between items-center px-6 mb-10">
        <h2 className="text-3xl font-bold">Latest Tuition Posts</h2>
        <Link
          to="/all-tuitions"
          className="text-primary font-semibold hover:underline"
        >
          Show More →
        </Link>
      </div>

      {/* Grid of 4 cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {tuitions.map((tuition) => (
          <TuitionCard key={tuition._id} tuition={tuition} />
        ))}
      </div>
    </section>
  );
};

export default LatestTuitions;

