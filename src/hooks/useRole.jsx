import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useRole = () => {
  const { user } = useAuth();
  
  
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email || user?.providerData?.[0]?.email) {
      const email = user?.email || user?.providerData?.[0]?.email
      axiosSecure.get(`/users/${email}/role`)
        .then(res => {
          setRole(res.data.role);
          setRoleLoading(false);
        })
        .catch(err => {
          console.error(err);
          setRoleLoading(false);
        });
    }
  }, [user, axiosSecure]);

  return { role, roleLoading };
};

export default useRole;
