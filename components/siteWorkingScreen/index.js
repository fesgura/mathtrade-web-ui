import Head from "next/head";
import Image from "next/image";
import logoSrc from "assets/img/logo.svg";
import { setLogoutAPI } from "api_serv/utils";
import storage from "utils/storage";
import { useEffect } from "react";

const SiteWorkingScreen = () => {
  useEffect(() => {
    storage.clear();
    setLogoutAPI();
  }, []);
  return (
    <>
      <Head>
        <title>Math Trade Argentina</title>
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

      <div className="SiteWorkingScreen">
        <div className="SiteWorkingScreen_logo">
          <Image
            src={logoSrc}
            alt="Math Trade Argentina"
            priority
            width="200"
            height="200"
          />
        </div>
        <h1 className="mb-5">
          Se viene el
          <br />
          Math Trade Argentina Abril 2023
        </h1>
        <h3 className="mb-4">¡¡¡Muy pronto arrancamos!!!</h3>
        <p className="lead">
          A las <b>00:05hs.</b> aprox. se viene lo bueno... aguantando la
          ansiedad!!
        </p>
        {/* <h3 className="mt-3">Estamos trabajando en el sitio</h3>
        <p className="lead">
          Muy pronto estaremos <i>en línea</i> de vuelta ;-).
        </p> */}
      </div>
    </>
  );
};

export default SiteWorkingScreen;
