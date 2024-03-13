"use client";
import Filters from "@/components/filters";
import useGames from "./useGames";
import I18N from "@/i18n";
import PageHeader from "@/components/pageHeader";
import SectionWithSidebar, {
  SidebarGrid,
  Sidebar,
} from "@/components/sections/with-sidebar";
import StickyHeader from "@/components/sticky-header";
import Header from "./header";
import ErrorAlert from "@/components/errorAlert";
import GameGrid from "@/components/game/game-grid";
import EmptyList from "@/components/emptyList";
import BanUsersModal from "@/components/ban/users/modal";
import ModalPreviewer from "@/components/previewer/modal";

const ItemsPage = () => {
  const { isLoaded, games, expandedGame, setExpandedGame, loading, error } =
    useGames();

  return (
    <>
      <PageHeader
        title="title.GameList"
        name="games"
        description={
          <>
            <p className="text-sm max-w-5xl mx-auto">
              <I18N id="Games.page.explanation" />
            </p>
          </>
        }
      />
      <SectionWithSidebar name="games" className="py-4" loading={loading}>
        <StickyHeader>
          <Header />
        </StickyHeader>
        <SidebarGrid>
          <Sidebar>
            <Filters type="game" />
          </Sidebar>
          <div>
            <div className="game-grid">
              {games.list.map((gameRaw) => {
                return (
                  <GameGrid
                    key={gameRaw.bgg_id}
                    gameRaw={gameRaw}
                    expanded={expandedGame}
                    setExpanded={setExpandedGame}
                  />
                );
              })}
            </div>
            <EmptyList
              visible={isLoaded && !(games?.list?.length || 0) && !error}
              message="EmptyList.games"
            />
            <ErrorAlert error={error} className="mt-3" />
          </div>
        </SidebarGrid>
      </SectionWithSidebar>
      <BanUsersModal />
      <ModalPreviewer />
    </>
  );
};

export default ItemsPage;
