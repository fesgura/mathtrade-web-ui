import { useState, useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { useApi, BggUserService } from "api";
import Header from "components/header";
import Footer from "components/footer";
import { LoadingPage } from "components/loading";

const PrivateLayout = ({ title, children }) => {
  const [logged, set_logged] = useState(false);
  //const [loading, set_loading] = useState(false);

  const [fetchData, data, loading] = useApi({
    promise: BggUserService.get,
    forBGG: true,
  });

  useEffect(() => {
    set_logged(false);
    fetchData("davicazuxxx");
  }, [fetchData]);

  useEffect(() => {
    if (!loading && data) {
      if (data && data.user && typeof data.user.id !== "undefined") {
        if (data.user.id !== "") {
          set_logged(true);
        } else {
          Router.push("/login");
        }
      }
    }
  }, [data, loading]);

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
      <LoadingPage loading={loading} />
      <Head>
        <title>{title ? `${title} | ` : ""}MathTrade Argentina</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {logged ? (
        <main className="wrap">
          <Header />
          <div className="main-container py-3">{children}</div>
          <Footer absolute />
        </main>
      ) : null}
    </>
  );
};
export default PrivateLayout;
