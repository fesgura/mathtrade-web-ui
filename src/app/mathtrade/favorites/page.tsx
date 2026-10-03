"use client";
import SectionCommon from "@/components/sections/common";
import PageHeader from "@/components/pageHeader";
import FavoritesPanel from "./favorites";

const FavoritesPage = () => {
  return (
    <>
      <PageHeader variant="compact" title="title.Favorites" />
      <SectionCommon>
        <FavoritesPanel />
      </SectionCommon>
    </>
  );
};

export default FavoritesPage;
