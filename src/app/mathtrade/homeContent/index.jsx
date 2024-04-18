import I18N from "@/i18n";
import { linksToHelp } from "@/config/linksToHelp";
import Container from "@/components/container";
import Timeline from "./timeline";
import Videohelp from "./videohelp";
import Status from "./status";
import Glossary from "./glossary";
import Iconshelp from "./iconshelp";

const HomeContent = () => {
  return (
    <Container>
      <div className="rich-text text-center pb-4">
        <p className="max-w-5xl mx-auto m-0">
          <I18N
            id="home.lead2"
            values={[linksToHelp.video, linksToHelp.bgg, linksToHelp.telegram]}
          />
        </p>
      </div>
      <Timeline />
      <Videohelp />
      <Status />
      <Glossary />
      <Iconshelp />
    </Container>
  );
};

export default HomeContent;
