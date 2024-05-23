import Container from "@/components/container";
import VotacionForm from "./form";
import Results from "./results";

const showResultes = false;

const Votacion = () => {
  return (
    <Container>
      <div className="bg-white px-5 py-4 rounded-xl shadow-xl max-w-4xl mx-auto ">
        {showResultes ? <Results /> : <VotacionForm />}
      </div>
    </Container>
  );
};

export default Votacion;
