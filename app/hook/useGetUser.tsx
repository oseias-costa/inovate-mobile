import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { router } from 'expo-router'
import { useEffect } from "react";

type User = {
  createAt: string;
  email: string;
  id: string;
  name: string;
  password: string;
  reamlID: string;
  status: string;
  type: string;
  updateAt: string;
};

export default function useGetUser() {

  const getUser = async () => {
    const token = await AsyncStorage.getItem('token')

    const user = await axios({
      method: "GET",
      baseURL: `http://10.0.0.101:3009/users/get-user/${token}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return user.data;
  };

  const { data, isError, error } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });

  const redirectUser = async () => {
      const getError = error as AxiosError;
      if (getError.response?.status === 401) {
        await AsyncStorage.removeItem("token");
        return router.navigate("/auth/login");
      }
  }

  useEffect(() => {
    if (error) {
        redirectUser()
    }
  }, [error]);

  return { user: data, isError };
}
