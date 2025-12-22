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
        return "User";
      }
      const res = await axiosSecure.get(`/users/${email}/role`);
      return res.data?.role || "User"; 
    },
    enabled: !!email,
  });

  return { role, roleLoading };
};

export default useRole;


