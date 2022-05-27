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

      <main className="wrap-public">
        <div className="v-centered">
          <div className="v-centered_col">
            <div className="main-container-public">
              {children}
              <Footer className="text-white" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default PublicLayout;
