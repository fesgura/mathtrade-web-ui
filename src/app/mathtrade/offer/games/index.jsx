import Filters from "@/components/filters";
import { GotoTopContextProvider } from "@/context/goto-top";
import useGames from "./useGames";
import SectionWithSidebar, {
  SidebarGrid,
  Sidebar,
} from "@/components/sections/with-sidebar";
import StickyHeader from "@/components/sticky-header";
import Header from "./header";
import ErrorAlert from "@/components/errorAlert";
import GameGrid from "@/components/game/game-grid";
import EmptyList from "@/components/emptyList";
import Footer from "./footer";
import useTour from "@/tours/useTour";
import NewSinceNotice from "@/components/newSinceNotice";

const GamesView = () => {
  const {
    isLoaded,
    games,
    expandedGame,
    setExpandedGame,
    loading,
    error,
    newCount,
    refreshList,
  } = useGames();
  // Guided tutorial (src/tours): once the first page is on screen.
  useTour("offer", { ready: !loading && games.list.length > 0 });

  return (
    <SectionWithSidebar name="games" loading={loading} topNotRounded>
      <GotoTopContextProvider>
        <SidebarGrid>
          <Sidebar topNotRounded>
            <Filters type="game" />
          </Sidebar>
          <div>
            <StickyHeader>
              <Header />
            </StickyHeader>
            <NewSinceNotice count={newCount} onRefresh={refreshList} />
            <div className="md:px-7 px-3 py-7">
              <div className="game-grid">
                {games.list.map((gameRaw, index) => {
                  return (
                    <GameGrid
                      key={gameRaw.bgg_id}
                      gameRaw={gameRaw}
                      expanded={expandedGame}
                      setExpanded={setExpandedGame}
                      tourAnchor={index === 0 ? "offer.game" : undefined}
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
          </div>
        </SidebarGrid>
        <Footer />
      </GotoTopContextProvider>
    </SectionWithSidebar>
  );
};

export default GamesView;
