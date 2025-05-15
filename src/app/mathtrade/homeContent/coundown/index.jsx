import I18N from "@/i18n";
import SignOutButton from "./SignOutButton";
import CountDown from "@/components/countdown";
import useCountDown from "@/hooks/useCountDown";

const CountdownMathtrade = () => {
  const data = useCountDown("2025-05-21T11:59:00");

  return data?.loaded ? (
    <div className="text-center text-balance mb-7">
      {data?.finished ? (
        <div className="border-b border-gray-300 pb-7 max-w-lg mx-auto">
          <p className="text-4xl mb-5 font-bold">
            <I18N id="countdown.text3" />
          </p>
          <p className="text-2xl mb-5">
            <I18N id="countdown.text4" />
          </p>
          <p className="">
            <SignOutButton />
          </p>
        </div>
      ) : (
        <>
          <p className="text-2xl mb-4">
            <I18N id="countdown.text1" />
          </p>
          <p className="text-6xl italic text-sky-700 mb-7">
            <CountDown data={data} />
          </p>
          <p className="text-2xl">
            <I18N id="countdown.text2" />
          </p>
        </>
      )}
    </div>
  ) : null;
};

export default CountdownMathtrade;
