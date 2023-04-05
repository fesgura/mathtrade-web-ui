import { useState } from "react";
import PrivateEnv from "environments/private";

const TempPage = () => {
  return <PrivateEnv>TempPage</PrivateEnv>;
};

export default TempPage;
