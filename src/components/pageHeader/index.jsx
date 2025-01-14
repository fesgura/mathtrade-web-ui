import I18N from "@/i18n";
import clsx from "clsx";
import Container from "../container";
import PageHeaderDescription from "./description";

const PageHeader = ({
  title,
  description,
  name = "home",
  noHideDescription,
}) => {
  return title || description ? (
    <header
      className={clsx("bg-gradient-to-bl overflow-hidden relative mb-4", {
        "from-sky-700 to-purple-700": name === "home",
        "from-teal-600 to-sky-900": name === "myCollection",
        "from-red-600 to-purple-900": name === "myOffer",
        "from-sky-700 to-purple-900": name === "items",
        "from-orange-600 to-purple-800": name === "games",
        "from-want to-sky-800": name === "myWants",
        "from-teal-600 to-teal-800": name === "results",
        "from-yellow-600 to-lime-700": name === "stats",
        "from-sky-600 to-indigo-800": name === "myData",
        "from-red-500 to-purple-800": name === "myAccount",
        "from-want to-sky-700": name === "faqs",
        "from-red-600 to-purple-800": name === "referral",
      })}
    >
      <Container>
        <div className="text-center lg:py-10 py-4 px-3">
          <h1 className="text-white lg:text-4xl text-2xl text-balance max-w-4xl mx-auto">
            <I18N id={title} />
          </h1>
          {description ? (
            <PageHeaderDescription
              description={description}
              name={name}
              noHideDescription={noHideDescription}
            />
          ) : null}
        </div>
      </Container>
    </header>
  ) : null;
};
export default PageHeader;
