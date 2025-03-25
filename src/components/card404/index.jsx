import { PRIVATE_ROUTES } from "@/config/routes";
import Link from "next/link";
import I18N from "@/i18n";

const Card404 = () => {
  return (
    <div className="w-full h-[100dvh] grid place-items-center p-3">
      <section className="bg-white rounded-md shadow-lg p-5 text-center min-w-96">
        <h1 className="font-bold text-2xl mb-3">
          <I18N id="404.title" />
        </h1>
        <p className="mb-3">
          <I18N id="404.message" />
        </p>
        <p className="">
          <Link
            href={PRIVATE_ROUTES.DEFAULT.path}
            className="text-primary font-bold underline hover:text-sky-700"
          >
            <I18N id="404.link" />
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Card404;
