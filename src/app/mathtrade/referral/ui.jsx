import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import { Form, InputContainer, Input } from "@/components/form";
import Button from "@/components/button";
import I18N from "@/i18n";
import useReferral from "./useReferral";
import ErrorAlert from "@/components/errorAlert";
import ShareText from "@/components/shareText";
import { LoadingBox } from "@/components/loading";
import { DateIntlFormat } from "@/utils/dateUtils";

const ReferredUI = () => {
  const {
    validations,
    onSubmit,
    loading,
    error,
    code,
    url,
    referralsCount,
    disabled,
    isLoaded,
    referralList,
    referring_limit,
    referrer,
  } = useReferral();

  return (
    <div className="relative min-h-96 px-4">
      {isLoaded && (
        <section className="max-w-2xl mx-auto pt-7 pb-12 relative">
          <h3 className="text-center pb-2 text-2xl text-balance">
            <I18N id="referral.page.subtitle" />
          </h3>
          <div className="text-center mb-5 bg-primary/10 border border-primary p-4 rounded-lg  text-balance">
            <p className="mb-2">
              <I18N
                id="referral.page.limit1"
                values={[referralsCount, referring_limit]}
              />
            </p>
            <p className="text-sm italic opacity-70">
              {referrer ? (
                <I18N
                  id="referral.page.limit3"
                  values={[referrer?.name || "ciudad", referring_limit]}
                />
              ) : (
                <I18N id="referral.page.limit2" values={[referring_limit]} />
              )}
            </p>
            {referralsCount > 0 ? (
              <>
                <div className="w-full overflow-auto">
                  <table className="w-full mt-5 text-sm border-b border-gray-400">
                    <thead>
                      <tr className="text-left">
                        <th className="py-2 pr-4">Email</th>
                        <th className="py-2 pr-4">Código</th>
                        <th className="py-2 pr-4">Fecha de uso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referralList.map((referral) => (
                        <tr
                          key={referral.referred}
                          className="text-left border-b border-gray-400"
                        >
                          <td className="py-2 pr-4">
                            <a
                              href={`mailto:${referral.referred}`}
                              className="text-primary underline font-bold hover:text-sky-800"
                            >
                              {referral.referred}
                            </a>
                          </td>
                          <td className="py-2 pr-4 font-bold">
                            {referral.code}
                          </td>
                          <td className="py-2 pr-4">
                            {DateIntlFormat(referral.used)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pt-4 text-center text-balance">
                  <I18N id="referral.adv" />
                </div>
              </>
            ) : null}
          </div>
          {disabled ? null : (
            <>
              <p className="text-center mb-5 xtext-2xl text-balance">
                <I18N id="referral.page.subtitle2" />
              </p>
              <ol className="list-decimal list-outside text-balance pl-4">
                <li className="mb-5">
                  <I18N id="referral.page.step1" />
                </li>
                <li className="mb-6">
                  <div className="mb-2">
                    <I18N id="referral.page.step2" />
                  </div>
                  <Form
                    validations={validations}
                    //formatTypes={formatTypes}
                    onSubmit={onSubmit}
                    className="flex items-start gap-2"
                  >
                    <div className="grow">
                      <InputContainer validate="referred" className="mb-0">
                        <Input
                          name="referred"
                          type="email"
                          placeholder="form.Email.placeholder"
                          ariaLabel="form.Email"
                          icon={loading ? "loading" : "email"}
                          disabled={loading}
                        />
                      </InputContainer>
                    </div>

                    <Button
                      ariaLabel="btn.SignUp"
                      className="rounded-md"
                      disabled={loading}
                    >
                      <I18N id="btn.generateReferralCode" />
                    </Button>
                  </Form>
                  <ErrorAlert error={error} className="mt-3" />
                </li>
                {code.length ? (
                  <li className="mb-5">
                    <div className="mb-5">
                      <div className="mb-2">
                        <I18N id="referral.page.step3a" />
                      </div>
                      <ShareText title="share.referral.title.url" url={url} />
                    </div>
                    <div className="">
                      <div className="mb-2">
                        <I18N id="referral.page.step3b" />
                      </div>
                      <ShareText title="share.referral.title" text={code} />
                    </div>
                  </li>
                ) : null}
                <li>
                  <I18N id="referral.page.step4" />
                </li>
              </ol>
            </>
          )}
        </section>
      )}
      <LoadingBox loading={loading} transparent />
    </div>
  );
};

export default ReferredUI;
