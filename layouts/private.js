import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "components/header";
import Footer from "components/footer";
import { LoadingScreen } from "components/loading";
import LoadingPad from "components/loading/loadingPad";
import storage from "utils/storage";
import classNames from "classnames";
import { getI18Ntext } from "i18n";
import MainSidebar from "components/mainSidebar";
import AtoTop from "components/aToTop";
import NoMobileModal from "components/noMobileModal";

const PrivateLayout = ({
  doctitle,
  children,
  loading,
  noMainContainer,
  withLoadingPad,
  loadingPad,
}) => {
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
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-FDNQEMTZZH`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-FDNQEMTZZH', {
                    page_path: window.location.pathname,
                });
                `,
          }}
        />
        <link rel="icon" href="/favicon/favicon.ico" />
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

        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&family=Montserrat:wght@500;600&display=swap');
        </style>
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
      <a id="a-top-pos"></a>
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
        <div className={classNames({ "main-container": !noMainContainer })}>
          {children}
        </div>
        <Footer
          absolute
          sidebarOpen={sidebarOpen}
          sidebarAnimationEnabled={sidebarAnimationEnabled}
        />
      </main>
      <AtoTop />
      <NoMobileModal />
      {loading ? <LoadingScreen /> : null}
      {withLoadingPad ? <LoadingPad loading={loadingPad} /> : null}
    </>
  );
};
export default PrivateLayout;
