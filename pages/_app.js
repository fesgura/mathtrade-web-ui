import "assets/css/bootstrap.min.css";
import "assets/css/font-awesome.min.css";
import "assets/css/icomoon.css";
import "assets/css/mt-icons.css";
import "assets/scss/style.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function MathtradeArgentina({ Component, pageProps }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Component {...pageProps} />
    </DndProvider>
  );
}

export default MathtradeArgentina;
//export default wrapper.withRedux(MathtradeArgentina);
