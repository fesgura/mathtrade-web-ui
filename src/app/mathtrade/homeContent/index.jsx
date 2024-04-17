import Container from "@/components/container";
import Timeline from "./timeline";
import Videohelp from "./videohelp";
import Status from "./status";
import Glossary from "./glossary";
import Iconshelp from "./iconshelp";

const HomeContent = () => {
  return (
    <Container>
      <Timeline />
      <Videohelp />
      <Status />
      <Glossary />
      <Iconshelp />
    </Container>
  );
};

export default HomeContent;
