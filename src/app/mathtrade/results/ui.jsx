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
  const { screenViewResults, setScreenViewResults, loading, MathTradeResults } =
    useResults();

  return (
    <>
      <SectionCommon loading={loading}>
        <Container>
          <PillsResults />
          <UserSelector />
          {MathTradeResults ? (
            <Tabs
              list={[
                "results.screen.visual",
                "results.screen.grid",
                "results.screen.printTags",
              ]}
              value={screenViewResults}
              onChange={setScreenViewResults}
            />
          ) : null}

          {screenViewResults === 0 ? (
            <ResultsVisual />
          ) : screenViewResults === 1 ? (
            <ResultsTable />
          ) : (
            <PrintTags />
          )}
        </Container>
      </SectionCommon>
    </>
  );
}
