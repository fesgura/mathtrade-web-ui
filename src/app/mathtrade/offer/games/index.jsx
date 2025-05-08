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

const GamesView = () => {
  const { isLoaded, games, expandedGame, setExpandedGame, loading, error } =
    useGames();

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

            <div className="md:px-7 px-3 py-7">
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
          </div>
        </SidebarGrid>
        <Footer />
      </GotoTopContextProvider>
    </SectionWithSidebar>
  );
};

export default GamesView;
