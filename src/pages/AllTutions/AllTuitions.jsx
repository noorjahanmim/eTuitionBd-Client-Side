import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TuitionCard from "./TuitionCard";

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

  if (loading) return <p className="text-center mt-10">Loading tuitions...</p>;
  if (tuitions.length === 0) return <p className="text-center mt-10">No tuitions available.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Tuitions</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tuitions.map((tuition) => (
          <TuitionCard key={tuition._id} tuition={tuition}></TuitionCard>
        ))}
      </div>
    </div>
  );
};

export default AllTuitions;


