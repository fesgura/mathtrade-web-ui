import { Provider } from "react-redux";
import "assets/css/fonts.css";
import "assets/css/bootstrap.min.css";
import "assets/css/font-awesome.min.css";
import "assets/css/icomoon.css";
import "assets/scss/style.scss";
import { store, wrapper } from "store";

function MathtradeArgentina({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

export default MathtradeArgentina;
//export default wrapper.withRedux(MathtradeArgentina);
