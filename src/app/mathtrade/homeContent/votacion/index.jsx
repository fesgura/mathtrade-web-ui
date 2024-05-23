import Container from "@/components/container";
import Results from "./results";
import { useState } from "react";

const Votacion = () => {
  return (
    <Container>
      <div className="bg-white px-5 py-4 rounded-xl shadow-xl max-w-4xl mx-auto ">
        <Results />
      </div>
    </Container>
  );
};

export default Votacion;
