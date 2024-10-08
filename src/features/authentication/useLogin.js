/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: async () => {
      try {
        // Fetch user details from the 'users' table
        const userDetails = await getCurrentUser();

        // Set user data in the cache
        queryClient.setQueryData(['user'], userDetails);

        toast.success('Login Successful!');
        navigate('/dashboard', { replace: true });
      } catch (error) {
        toast.error('Failed to fetch user details');
      }
    },
  });

  return { login, isLoading: isPending };
}
