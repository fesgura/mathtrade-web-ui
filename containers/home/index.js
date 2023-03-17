import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import HomeView from "views/home";
import storage from "utils/storage";

const HomeContainer = () => {
  const [mathtradeData, set_mathtradeData] = useState(null);

  useEffect(() => {
    let timer = setInterval(() => {}, 500);

    const storeData = storage.get();
    if (storeData?.mathtrade) {
      set_mathtradeData(storeData?.mathtrade);
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Logic about HOME
  return (
    <PrivateEnv>
      <HomeView mathtradeData={mathtradeData} />
    </PrivateEnv>
  );
};

export default HomeContainer;
