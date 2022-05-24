import Head from "next/head";
import Header from "components/header";
import Footer from "components/footer";

const PublicLayout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | ` : ""}MathTrade Argentina</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="wrap">
        <div className="main-container py-3">{children}</div>
        <Footer />
      </main>
    </>
  );
};
export default PublicLayout;
