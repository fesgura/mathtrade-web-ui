import PrivateEnv from "environments/private";
import ResultsView from "views/mathtrade/results";

const Results = () => {
  return (
    <PrivateEnv>
      <ResultsView />
    </PrivateEnv>
  );
};

export default Results;
