import { ref } from 'vue';
import useSupabase from 'src/boot/supabase';

const user = ref(null);

interface AuthParams {
  email: string;
  password: string;
  meta?: any[];
}

export default function useAuthUser() {
  const { supabase } = useSupabase();

  const login = async ({ email, password }: Omit<AuthParams, 'meta'>) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return user;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isLoggedIn = () => {
    return !!user.value;
  };

  const register = async ({ email, password, ...meta }: AuthParams) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: meta,
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });
    if (error) throw error;
    return user;
  };

  const update = async (data: any) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.updateUser(data);
    if (error) throw error;
    return user;
  };

  const sendPasswordRestEmail = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return data;
  };

  return {
    user,
    login,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
  };
}
