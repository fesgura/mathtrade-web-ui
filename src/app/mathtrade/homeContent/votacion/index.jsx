import Container from "@/components/container";
import VotacionForm from "./form";
import Results from "./results";
import { useState } from "react";

const Votacion = () => {
  const [showResultes, setShowResultes] = useState(false);

  return (
    <Container>
      <div className="bg-white px-5 py-4 rounded-xl shadow-xl max-w-4xl mx-auto ">
        {showResultes ? (
          <Results />
        ) : (
          <VotacionForm setShowResultes={setShowResultes} />
        )}
      </div>
    </Container>
  );
};

export default Votacion;
