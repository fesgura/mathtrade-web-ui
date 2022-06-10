import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PrivateLayout from "layouts/private";
import PageHeader from "containers/pageHeader";
import { Row, Col } from "reactstrap";
import MenuHorizontal from "components/menuHorizontal";

const MyAccountView = () => {
  const [current, set_current] = useState(null);

  // const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     setTimeout(() => {
  //       const hash = router.asPath.split("#")[1];
  //       set_current(hash);
  //     }, 150);
  //   };
  //   router.events.on("hashChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("hashChangeComplete", handleRouteChange);
  //   };
  // }, [router]);

  useEffect(() => {
    if (window) {
      const onHashChanged = () => {
        const hash = window.location.hash.split("#")[1];
        const hashToChange = hash || "account";
        set_current(hashToChange);
      };

      onHashChanged();

      window.addEventListener("hashchange", onHashChanged);
    }
    return () => {
      if (window) {
        window.removeEventListener("hashchange", onHashChanged);
      }
    };
  }, []);

  console.log(current);

  return (
    <PrivateLayout>
      <Row className="justify-content-center">
        <Col xl={10}>
          <PageHeader title="Mi cuenta" />
          <Row>
            <Col md={4}>
              <MenuHorizontal
                list={[
                  {
                    hash: "account",
                    title: "Cuenta",
                  },
                  {
                    hash: "mathtrade-data",
                    title: "Datos para MathTrade",
                  },
                  {
                    hash: "bgg-profile",
                    title: "Perfil de la BGG",
                  },
                ]}
                current={current}
              />
            </Col>
            <Col md={8}>a</Col>
          </Row>
        </Col>
      </Row>
    </PrivateLayout>
  );
};

export default MyAccountView;
