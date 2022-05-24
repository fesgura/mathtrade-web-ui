import { useState, useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { useApi, BggUserService } from "api";
import Header from "components/header";
import Footer from "components/footer";

const PrivateLayout = ({ title, children }) => {
  const [logged, set_logged] = useState(false);

  const [fetchData, data, dataLoading] = useApi({
    promise: BggUserService.get,
    forBGG: true,
  });

  useEffect(() => {
    set_logged(false);
    fetchData("davicazu");
  }, [fetchData]);

  useEffect(() => {
    if (!dataLoading && data) {
      if (data && data.user && typeof data.user.id !== "undefined") {
        if (data.user.id !== "") {
          set_logged(true);
        } else {
          Router.push("/login");
        }
      }
    }
  }, [data, dataLoading]);

  return (
    <>
      <Head>
        <title>{title ? `${title} | ` : ""}MathTrade Argentina</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {logged ? (
        <main className="wrap">
          <Header />
          <div className="main-container py-3">{children}</div>
          <Footer />
        </main>
      ) : (
        "LOADING"
      )}
    </>
  );
};
export default PrivateLayout;
