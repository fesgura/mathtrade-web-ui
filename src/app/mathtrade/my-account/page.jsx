"use client";
import { Form, InputContainer, Label, Input, Output } from "@/components/form";
import I18N from "@/i18n";
import SectionCommon from "@/components/sections/common";
import PageHeader from "@/components/pageHeader";
import ErrorAlert from "@/components/errorAlert";
import Button from "@/components/button";
import useMyAccount from "./useMyAccount";
import ChangePassword from "./changePassword";

export default function MyAccount() {
  const {
    userData,
    loading,
    errorGetUser,
    errorPutUser,
    validations,
    onSubmit,
  } = useMyAccount();

  return (
    <>
      <PageHeader title="title.MyAccount" name="myAccount" />
      <SectionCommon loading={loading}>
        <section className="max-w-xl mx-auto pt-4 relative">
          <h2 className="text-center pb-2 mb-7 font-bold block w-full border-b border-gray-300">
            <I18N id="register.AccountData" />
          </h2>
          <ErrorAlert error={errorGetUser} />
          <Label text="form.Email" name="email" />
          <div className="md:flex items-center mb-4 gap-4">
            <div className="grow">
              <Output
                data={userData}
                name="email"
                ariaLabel="form.Email"
                icon="email"
              />
            </div>
            <div className="md:mt-0 mt-3">
              <ChangePassword />
            </div>
          </div>

          <Form validations={validations} onSubmit={onSubmit} showTopAlert>
            <fieldset>
              <div className="grid md:grid-cols-2 gap-x-4">
                <div className="">
                  <InputContainer validate="first_name">
                    <Label text="form.FirstName" name="first_name" required />
                    <Input
                      data={userData}
                      name="first_name"
                      placeholder="form.FirstName.placeholder"
                      ariaLabel="form.FirstName"
                      icon="user"
                    />
                  </InputContainer>
                </div>
                <div className="">
                  <InputContainer validate="last_name">
                    <Label text="form.LastName" name="last_name" required />
                    <Input
                      data={userData}
                      name="last_name"
                      placeholder="form.LastName.placeholder"
                      ariaLabel="form.LastName"
                      icon="user"
                    />
                  </InputContainer>
                </div>
                <div className="">
                  <InputContainer validate="phone">
                    <Label text="form.Phone" name="phone" required />
                    <Input
                      data={userData}
                      name="phone"
                      type="tel"
                      placeholder="form.Phone.placeholder"
                      ariaLabel="form.Phone"
                      icon="phone"
                    />
                  </InputContainer>
                </div>
                <div className="">
                  <InputContainer className="mb-1">
                    <Label text="form.Telegram.user" name="telegram" />
                    <Input
                      data={userData}
                      name="telegram"
                      placeholder="form.Telegram.user.placeholder"
                      ariaLabel="form.Telegram.user"
                      icon="telegram"
                    />
                  </InputContainer>
                  <p className="text-xs text-gray-700 text-center mb-5 text-balance">
                    <I18N id="form.Telegram.ad" />
                  </p>
                </div>
              </div>
              <InputContainer>
                <Label text="form.BGGuser" name="bgg_user" />
                <Output
                  data={userData}
                  name="bgg_user"
                  ariaLabel="form.BGGuser"
                  icon="bgg"
                />
              </InputContainer>
            </fieldset>

            <ErrorAlert error={errorPutUser} />
            <div className="text-center py-5">
              <Button ariaLabel="btn.SignUp">
                <I18N id="btn.Save" />
              </Button>
            </div>
          </Form>
        </section>
      </SectionCommon>
    </>
  );
}
