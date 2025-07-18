"use client";
import "@/app/globals.css";
import "@/styles/index.scss";
import I18N from "@/i18n";
import SectionCommon from "@/components/sections/common";
import PageHeader from "@/components/pageHeader";

import Footer from "@/components/footer";

const LayoutExternal = ({ title, subtitle, children }) => {
  return (
    <div className="relative w-full min-h-screen pb-20">
      <a id="a-top" />
      <main className="relative py-main">
        <PageHeader title={title} subtitle={subtitle} name="home" />
        <SectionCommon>
          <article className="p-9">{children}</article>
        </SectionCommon>
      </main>
      <Footer />
    </div>
  );
};

export default LayoutExternal;
