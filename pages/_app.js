import { Provider } from "react-redux";
import "assets/css/fonts.css";
import "assets/css/bootstrap.min.css";
import "assets/css/font-awesome.min.css";
import "assets/css/icomoon.css";
import "assets/scss/style.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { wrapper } from "store";

function MathtradeArgentina({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </DndProvider>
  );
}

export default MathtradeArgentina;
//export default wrapper.withRedux(MathtradeArgentina);
