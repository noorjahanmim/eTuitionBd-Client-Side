import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TuitionCard from "./TuitionCard";
import Loading from "../../components/Loading/Loading";

const AllTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/tuitions")
      .then((res) => {
        setTuitions(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure]);

  if (loading) return <Loading />;
  if (tuitions.length === 0) return <p className="text-center mt-10">No tuitions available.</p>;

  const searched = tuitions.filter(t =>
    t.subject?.toLowerCase().includes(search.toLowerCase()) ||
    t.location?.toLowerCase().includes(search.toLowerCase()) ||
    t.class?.toLowerCase().includes(search.toLowerCase())
  );

  const filtered = searched.filter(t =>
    (filterClass === "All" || t.class === filterClass) &&
    (filterSubject === "All" || t.subject === filterSubject) &&
    (filterLocation === "All" || t.location === filterLocation)
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (sortOption) {
      case "budgetHigh": return b.budget - a.budget;
      case "budgetLow": return a.budget - b.budget;
      case "dateNew": return new Date(b.date) - new Date(a.date);
      case "dateOld": return new Date(a.date) - new Date(b.date);
      default: return 0;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTuitions = sorted.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sorted.length / itemsPerPage);

  const classOptions = ["All Classes", ...new Set(tuitions.map(t => t.class))];
  const subjectOptions = ["All Subjects", ...new Set(tuitions.map(t => t.subject))];
  const locationOptions = ["All Locations", ...new Set(tuitions.map(t => t.location))];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-10 text-center">
        All <span className="bg-gradient-to-r from-primary via-indigo-500 to-primary bg-clip-text text-transparent  tracking-wide">Tuitions</span>
      </h1>

      {/* ✅ Search + Filter + Sort Box */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by subject, location, or class..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-md w-full md:w-1/2 focus:outline-none bg-gray-50"
          />

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-50 focus:outline-none"
          >
            <option value="">Sort by</option>
            <option value="budgetHigh">Budget: High to Low</option>
            <option value="budgetLow">Budget: Low to High</option>
            <option value="dateNew">Date: Newest First</option>
            <option value="dateOld">Date: Oldest First</option>
          </select>
        </div>

        {/* ✅ Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="px-4 py-2 rounded-md bg-gray-50 focus:outline-none">
            {classOptions.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
          <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} className="px-4 py-2 rounded-md bg-gray-50 focus:outline-none">
            {subjectOptions.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
          <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} className="px-4 py-2 rounded-md bg-gray-50 focus:outline-none">
            {locationOptions.map((l, i) => <option key={i} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {/* ✅ Show count */}
      <p className="text-sm text-gray-600 mb-4">
        Showing {currentTuitions.length} of {sorted.length} tuitions
      </p>

      {/* ✅ Tuition Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {currentTuitions.map((tuition) => (
          <TuitionCard key={tuition._id} tuition={tuition} />
        ))}
      </div>

      {/* ✅ Pagination */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllTuitions;

