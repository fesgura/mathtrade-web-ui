import SectionCommon from "@/components/sections/common";
import Container from "@/components/container";
import useResults from "./useResults";
import PillsResults from "@/components/results/pills";
import UserSelector from "@/components/results/userSelector";
import Tabs from "@/components/tabs";
import ResultsVisual from "@/components/results/visual";
import ResultsTable from "@/components/results/table";
import PrintTags from "@/components/results/printTags";
import PaymentInfo from "@/components/results/paymentInfo";
import Downloads from "../statistics/currentMT/downloads";

export default function ResultsUI() {
  const { screenViewResults, setScreenViewResults, loading, MathTradeResults } =
    useResults();

  return (
    <>
      <SectionCommon loading={loading}>
        <Container>
          <PillsResults />
          <div className="max-w-[1100px] mx-auto mb-5 pt-3">
            <Downloads accordion />
          </div>

          <UserSelector />
          {MathTradeResults ? (
            <Tabs
              list={[
                "results.screen.visual",
                "results.screen.grid",
                "results.screen.printTags",
                "results.screen.payment",
              ]}
              value={screenViewResults}
              onChange={setScreenViewResults}
            />
          ) : null}

          {screenViewResults === 0 ? (
            <ResultsVisual />
          ) : screenViewResults === 1 ? (
            <ResultsTable />
          ) : screenViewResults === 2 ? (
            <PrintTags />
          ) : (
            <PaymentInfo />
          )}
        </Container>
      </SectionCommon>
    </>
  );
}
