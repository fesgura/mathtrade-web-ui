import { useState, useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { useApi, BggUserService } from "api";
import Header from "components/header";
import Footer from "components/footer";
import { LoadingPage, LoadingScreen } from "components/loading";

const PrivateLayout = ({ title, children, loading }) => {
  const [logged, set_logged] = useState(false);
  //const [loadingPrivate, set_loadingPrivate] = useState(false);

  const [fetchDataPrivate, dataPrivate, loadingPrivate] = useApi({
    promise: BggUserService.get,
    forBGG: true,
  });

  useEffect(() => {
    set_logged(false);
    fetchDataPrivate("davicazuxxx");
  }, [fetchDataPrivate]);

  useEffect(() => {
    if (!loadingPrivate && dataPrivate) {
      if (
        dataPrivate &&
        dataPrivate.user &&
        typeof dataPrivate.user.id !== "undefined"
      ) {
        if (dataPrivate.user.id !== "") {
          set_logged(true);
        } else {
          Router.push("/login");
        }
      }
    }
  }, [dataPrivate, loadingPrivate]);

  // useEffect(() => {
  //   set_loading(true);

  //   let timer = setTimeout(() => {
  //     set_logged(true);
  //     set_loading(false);
  //   }, 4000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  return (
    <>
      <Head>
        <title>{title ? `${title} | ` : ""}MathTrade Argentina</title>
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
      <LoadingPage loading={loadingPrivate} />
      {logged ? (
        <>
          <main className="wrap">
            <Header />
            <div className="main-container py-3">{children}</div>
            <Footer absolute />
          </main>
          {loading ? <LoadingScreen /> : null}
        </>
      ) : null}
    </>
  );
};
export default PrivateLayout;
