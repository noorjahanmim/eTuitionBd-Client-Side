import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight,Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Star, MapPin, GraduationCap, CheckCircle2 } from "lucide-react";
import TutorCard from "./TutorCard";

const AllTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // API URL based on your local environment
    fetch(`http://localhost:3000/tutors?page=${page}&limit=6&search=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setTutors(data.tutors || []);
        setTotalPages(data.totalPages || 1);
      });
  }, [page, searchTerm]);




  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-24">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Simple Header & Search */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">All Available Tutors</h2>
            <p className="text-sm text-gray-500">Find the right mentor for your academic needs</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search subject or name..."
              className="input input-bordered w-full pl-10 bg-gray-50 focus:outline-primary border-gray-200"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* Tutors Grid */}
        {tutors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor) => (

<TutorCard key={tutor._id} tutor={tutor} ></TutorCard>






            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500">No tutors found matching your search.</p>
          </div>
        )}

        {/* Normal Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="join shadow-sm bg-white border border-gray-200 p-1 rounded-xl">
              <button
                disabled={page === 1}
                onClick={() => { setPage(page - 1); window.scrollTo(0, 0); }}
                className="join-item btn btn-ghost btn-sm md:btn-md disabled:bg-transparent"
              >
                <ChevronLeft size={20} />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setPage(i + 1); window.scrollTo(0, 0); }}
                  className={`join-item btn btn-sm md:btn-md border-none ${
                    page === i + 1 ? "btn-primary text-white" : "btn-ghost"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => { setPage(page + 1); window.scrollTo(0, 0); }}
                className="join-item btn btn-ghost btn-sm md:btn-md disabled:bg-transparent"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTutors;

