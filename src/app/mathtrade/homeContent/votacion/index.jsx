import Button from "@/components/button";
import Container from "@/components/container";
import clsx from "clsx";
import useVotacion from "./useVotacion";
import I18N from "@/i18n";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import SuccessAlert from "@/components/successAlert";

const LabelOpt = ({ opt, onChange, value, disabled }) => {
  const { id, question, description } = opt;
  return (
    <label
      className={clsx(
        "flex gap-4 border-2  rounded-lg p-4 mb-4 cursor-pointer",
        {
          "border-gray-200": value !== `${id}`,
          "border-primary": value === `${id}`,
        }
      )}
    >
      <div className="">
        <input
          type="radio"
          className="cursor-pointer"
          name="opt"
          value={id}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div
        className={clsx({
          "opacity-60": disabled,
        })}
      >
        <div className="font-bold">{question}</div>
        {description ? <div className="">{description}</div> : null}
      </div>
    </label>
  );
};

const Votacion = () => {
  const {
    voted,
    disabled,
    disabledBtn,
    value,
    setValue,
    optList,
    loading,
    error,
    submit,
    showSuccess,
  } = useVotacion();
  return (
    <Container>
      <div className="bg-white px-5 py-4 rounded-xl shadow-xl max-w-4xl mx-auto ">
        <div className="relative">
          <div className="text-center">
            <h3 className="font-bold text-xl mb-5  text-balance">
              <I18N id="votacion.title" />
            </h3>
            <p className="mb-7">
              <I18N
                id={
                  voted ? "votacion.description.voted" : "votacion.description"
                }
              />
            </p>
          </div>
          <div className="min-h-72">
            {optList.map((n, k) => {
              return (
                <LabelOpt
                  key={n?.id || k}
                  opt={n}
                  onChange={setValue}
                  value={value}
                  disabled={disabled}
                />
              );
            })}
          </div>
          <div className="text-center py-4">
            {showSuccess ? <SuccessAlert text="votacion.btn.success" /> : null}
            <ErrorAlert error={error} />
            <Button disabled={disabledBtn} lg onClick={submit}>
              <I18N id="votacion.btn" />
            </Button>
          </div>
          <LoadingBox loading={loading} />
        </div>
      </div>
    </Container>
  );
};

export default Votacion;
