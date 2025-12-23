import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TuitionCard from "./TuitionCard";
import Loading from "../../components/Loading/Loading";

const AllTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/tuitions") 
      .then((res) => {
        setTuitions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  // if (loading) return <p className="text-center mt-10">Loading tuitions...</p>;
  if (loading) return <Loading />;
  if (tuitions.length === 0) return <p className="text-center mt-10">No tuitions available.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All <span className=" bg-gradient-to-r from-primary via-indigo-500 to-primary bg-clip-text text-transparent md:text-2xltracking-wide">Tuitions</span></h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tuitions.map((tuition) => (
          <TuitionCard key={tuition._id} tuition={tuition} />
        ))}
      </div>
    </div>
  );
};

export default AllTuitions;


