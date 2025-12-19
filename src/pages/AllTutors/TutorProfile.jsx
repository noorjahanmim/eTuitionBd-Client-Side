import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const TutorProfile = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/tutors/${id}`)
      .then((res) => setTutor(res.data))
      .catch((err) => console.error(err));
  }, [id, axiosSecure]);

  if (!tutor) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{tutor.name}</h2>
      <img
        src={tutor.photoUrl || "https://i.ibb.co/5GzXkwq/user.png"}
        alt={tutor.name}
        className="w-32 h-32 rounded-full"
      />
      <p>Email: {tutor.email}</p>
      <p>Qualifications: {tutor.qualifications}</p>
      <p>Experience: {tutor.experience} years</p>
    </div>
  );
};

export default TutorProfile;
