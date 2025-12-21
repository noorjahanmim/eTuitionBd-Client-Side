// import { useEffect, useState } from 'react';
// import useAxiosSecure from './useAxiosSecure';
// import useAuth from './useAuth';

// const useRole = () => {
//   const { user } = useAuth();
  
  
//   const axiosSecure = useAxiosSecure();

//   const [role, setRole] = useState(null);
//   const [roleLoading, setRoleLoading] = useState(true);

//   useEffect(() => {
//     if (user?.email || user?.providerData?.[0]?.email) {
//       const email = user?.email || user?.providerData?.[0]?.email
//       axiosSecure.get(`/users/${email}/role`)
//         .then(res => {
//           setRole(res.data.role);
          
//           setRoleLoading(false);
//         })
//         .catch(err => {
//           console.error(err);
//           setRoleLoading(false);
//         });
//     }
//   }, [user, axiosSecure]);

//   return { role, roleLoading };
// };

// export default useRole;


import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const email = user?.email || user?.providerData?.[0]?.email;

  const { isLoading: roleLoading, data: role = "User" } = useQuery({
    queryKey: ['user-role', email],
    queryFn: async () => {
      if (!email) {
        return "User"; // ✅ always return something
      }
      const res = await axiosSecure.get(`/users/${email}/role`);
      return res.data?.role || "User"; 
    },
    enabled: !!email, // 
  });

  return { role, roleLoading };
};

export default useRole;


