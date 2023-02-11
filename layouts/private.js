import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "components/header";
import Footer from "components/footer";
import { LoadingPage, LoadingScreen } from "components/loading";
import storage from "utils/storage";
import classNames from "classnames";
import { getI18Ntext } from "i18n";
import MainSidebar from "components/mainSidebar";

const PrivateLayout = ({ doctitle, children, loading }) => {
  const [auth, setAuth] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarAnimationEnabled, setSidebarAnimationEnabled] = useState(false);

  useEffect(() => {
    const auth = storage.getFromStore("token");
    setAuth(auth);

    setSidebarOpen(storage.getFromOptions("sidebarOpen"));

    let timer = setTimeout(() => {
      setSidebarAnimationEnabled(true);
    }, 120);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const toggleSidebar = () => {
    storage.setToOptions({
      sidebarOpen: !sidebarOpen,
    });
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Head>
        <title>
          {doctitle ? `${getI18Ntext(doctitle)} | ` : ""}Math Trade Argentina
        </title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <MainSidebar
        sidebarOpen={sidebarOpen}
        sidebarAnimationEnabled={sidebarAnimationEnabled}
        toggleSidebar={toggleSidebar}
      />
      <main
        className={classNames("main-wrap", {
          "sidebar-open": sidebarOpen,
          "sidebar-animation-enabled": sidebarAnimationEnabled,
        })}
      >
        <Header
          sidebarOpen={sidebarOpen}
          sidebarAnimationEnabled={sidebarAnimationEnabled}
        />
        <div className="main-container">{children}</div>
        <Footer
          absolute
          sidebarOpen={sidebarOpen}
          sidebarAnimationEnabled={sidebarAnimationEnabled}
        />
      </main>
      {loading ? <LoadingScreen /> : null}
    </>
  );
};
export default PrivateLayout;
