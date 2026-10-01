"use client";
import clsx from "clsx";
import I18N from "@/i18n";
import Button from "@/components/button";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import { mathtradeRulebookPDFurl } from "@/config/rulebook";
import useRulesQuiz from "./useRulesQuiz";

const baseURL = process.env.BASE_URL;

const formatRemaining = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
};

const RulebookLink = ({ mathtradeId }) => (
  <a
    href={baseURL + mathtradeRulebookPDFurl(mathtradeId)}
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary underline font-bold"
  >
    <I18N id="rulesQuiz.readRulebook" />
  </a>
);

const RulesQuiz = ({ mathtradeId, onPassed }) => {
  const {
    view,
    questions,
    answers,
    choose,
    allAnswered,
    start,
    submit,
    wrongIds,
    submittedQuestions,
    remaining,
    busy,
    error,
  } = useRulesQuiz({ onPassed });

  if (view === "passed") {
    return (
      <div className="border border-green-500 bg-green-50 rounded-lg p-4 mb-6">
        <p className="font-bold">
          <I18N id="rulesQuiz.passed" />
        </p>
      </div>
    );
  }

  return (
    <div className="relative border border-stroke rounded-lg p-4 mb-6 bg-white">
      <h3 className="font-bold text-lg mb-2">
        <I18N id="rulesQuiz.title" />
      </h3>

      {view === "intro" || view === "loading" ? (
        <>
          <p className="text-sm mb-3">
            <I18N id="rulesQuiz.intro" />
          </p>
          <p className="mb-4">
            <RulebookLink mathtradeId={mathtradeId} />
          </p>
          <Button type="button" disabled={view === "loading"} onClick={start}>
            <I18N id="rulesQuiz.start" />
          </Button>
        </>
      ) : null}

      {view === "locked" ? (
        <>
          {wrongIds.length ? (
            <>
              <p className="text-danger font-bold mb-2">
                <I18N id="rulesQuiz.failed" values={[wrongIds.length]} />
              </p>
              <ul className="mb-3 text-sm">
                {submittedQuestions.map((question) => (
                  <li key={question.id} className="py-1">
                    {wrongIds.includes(question.id) ? "✗ " : "✓ "}
                    {question.text}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <p className="mb-3">
            <I18N id="rulesQuiz.lockedFor" values={[formatRemaining(remaining)]} />
          </p>
          <p>
            <RulebookLink mathtradeId={mathtradeId} />
          </p>
        </>
      ) : null}

      {view === "questions" ? (
        <>
          <p className="text-sm text-gray-600 mb-4">
            <I18N id="rulesQuiz.instructions" />{" "}
            <RulebookLink mathtradeId={mathtradeId} />
          </p>
          <ol className="mb-4">
            {questions.map((question, position) => (
              <li
                key={question.id}
                className={clsx("mb-4 p-3 rounded-md border", {
                  "border-danger bg-red-50": wrongIds.includes(question.id),
                  "border-gray-200": !wrongIds.includes(question.id),
                })}
              >
                <p className="font-bold mb-2">
                  {position + 1}. {question.text}
                </p>
                {question.shownOptions.map((option) => (
                  <label
                    key={option.index}
                    className="flex items-start gap-2 py-1 cursor-pointer"
                  >
                    <input
                      type="radio"
                      className="mt-1"
                      name={`q-${question.id}`}
                      checked={answers[question.id] === option.index}
                      onChange={() => choose(question.id, option.index)}
                    />
                    <span className="text-sm">{option.text}</span>
                  </label>
                ))}
              </li>
            ))}
          </ol>
          <Button type="button" disabled={!allAnswered || busy} onClick={submit}>
            <I18N id="rulesQuiz.submit" />
          </Button>
        </>
      ) : null}

      <ErrorAlert error={error} />
      <LoadingBox loading={busy} transparent />
    </div>
  );
};

export default RulesQuiz;
