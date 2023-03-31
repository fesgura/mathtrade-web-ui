import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import PostMTView from "views/mathtrade/post-mathtrade";
import storage from "utils/storage";
import { useApi, MathTradeService } from "api_serv";
import useCanEdit from "hooks/useCanEdit";

const PostMT = () => {
  //const canViewResults = useCanEdit("results");

  const [getPostMathTrade, data, loading, errors] = useApi({
    promise: MathTradeService.getPostMathTrade,
    initialState: [],
    // format: (data) => {
    //   return data[0];
    // },
  });

  useEffect(() => {
    getPostMathTrade();
  }, []);

  console.log(data);

  return (
    <PrivateEnv>
      <PostMTView data={data} loading={loading} errors={errors} />
    </PrivateEnv>
  );
};

export default PostMT;
