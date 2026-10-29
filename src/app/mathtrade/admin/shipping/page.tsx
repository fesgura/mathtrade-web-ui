"use client";
import Button from "@/components/button";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import ErrorAlert from "@/components/errorAlert";
import EmptyList from "@/components/emptyList";
import I18N from "@/i18n";
import useFetch from "@/hooks/useFetch";
import { PRIVATE_ROUTES } from "@/config/routes";
import RoutesTable from "./RoutesTable";
import type { ShippingRoutes } from "./types";

// Admins only (route "onlyForAdmin", endpoint IsAdminAuthenticated): where
// every item of the edition ships from, whether it stops at the hub (AMBA)
// and where it goes, with the totals per route.
const AdminShippingPage = () => {
  const [, data, loading, error] = useFetch({
    endpoint: "GET_SHIPPING_ROUTES",
    initialState: null,
    autoLoad: true,
  });
  const shipping = data as ShippingRoutes | null;
  const routes = shipping?.routes || [];

  return (
    <>
      <PageHeader title="adminShipping.title" variant="minimal" />
      <SectionCommon loading={loading}>
        <div className="md:px-7 px-3 py-7">
          <div className="mb-4">
            <Button tag="link" href={PRIVATE_ROUTES.ADMIN_PANEL.path} sm outline>
              <I18N id="adminShipping.back" />
            </Button>
          </div>
          <ErrorAlert error={error} />
          {shipping ? (
            <p className="mb-4 text-sm text-gray-600">
              <I18N id="adminShipping.threshold" values={[shipping.threshold]} />
              {" · "}
              <I18N id="adminShipping.hub" values={[shipping.hub?.name || "-"]} />
            </p>
          ) : null}
          {!loading && !routes.length ? (
            <EmptyList visible icon="status-box" message="adminShipping.none" />
          ) : null}
          {routes.length ? <RoutesTable routes={routes} /> : null}
        </div>
      </SectionCommon>
    </>
  );
};

export default AdminShippingPage;
