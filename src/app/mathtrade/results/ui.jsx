import SectionCommon from "@/components/sections/common";
import Container from "@/components/container";
import useResults from "./useResults";
import PillsResults from "@/components/results/pills";
import UserSelector from "@/components/results/userSelector";
import Tabs from "@/components/tabs";
import ResultsVisual from "@/components/results/visual";
import ResultsTable from "@/components/results/table";
import PrintTags from "@/components/results/printTags";

export default function ResultsUI() {
  const { screenViewResults, setScreenViewResults, loading } = useResults();

  const listContent = [<ResultsVisual />, <ResultsTable />, <PrintTags />];

  return (
    <>
      <SectionCommon loading={loading}>
        <Container>
          <PillsResults />
          <UserSelector />
          <Tabs
            list={[
              "results.screen.visual",
              "results.screen.grid",
              "results.screen.printTags",
            ]}
            value={screenViewResults}
            onChange={setScreenViewResults}
          />

          {listContent[screenViewResults]}
        </Container>
      </SectionCommon>
    </>
  );
}
