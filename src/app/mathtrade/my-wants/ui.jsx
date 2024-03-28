"use client";
import SectionCommon from "@/components/sections/common";
import PageHeader from "@/components/pageHeader";
import I18N from "@/i18n";
import useWants from "./useWants";
import Tabs from "@/components/tabs";
import Visual from "./visual";
import Grid from "./grid";
import Footer from "./footer";
import ErrorAlert from "@/components/errorAlert";
import Container from "@/components/container";
import ModalPreviewerItem from "@/components/previewerItem/modal";
import { GotoTopContextProvider } from "@/context/goto-top";

export default function MyWantsUI() {
  const { screenView, setScreenView, loading, error } = useWants();

  return (
    <>
      <PageHeader
        title="title.MyWants"
        name="myWants"
        description={
          <>
            <p className="text-sm max-w-5xl mx-auto">
              <I18N id="Items.page.explanation" />
            </p>
          </>
        }
      />
      <SectionCommon loading={loading}>
        <Tabs
          list={["want.screen.visual", "want.screen.grid"]}
          value={screenView}
          onChange={setScreenView}
        />
        {error ? (
          <Container>
            <ErrorAlert error={error} />
          </Container>
        ) : (
          false
        )}
        <GotoTopContextProvider>
          {screenView === 0 ? <Visual /> : <Grid />}
          <Footer />
        </GotoTopContextProvider>
      </SectionCommon>

      <ModalPreviewerItem />
    </>
  );
}
