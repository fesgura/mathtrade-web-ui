import useFetch from "@/hooks/useFetch";

const useUserTable = () => {
  const [, list, loading, error] = useFetch({
    endpoint: "GET_MATHTRADE_USERS",
    initialState: [],
    autoLoad: true,
  });

  return {
    list,
    loading,
    error,
  };
};

export default useUserTable;
