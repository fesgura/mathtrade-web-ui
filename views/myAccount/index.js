import { useState } from "react";
import Router from "next/router";
import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import { linksToHelp, textSize } from "config";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Alert,
  Modal,
  ModalBody,
} from "reactstrap";
import { Form, Input, Hidden } from "components/form";
import { locationsToOptions } from "utils";
import TestBGGuser from "components/testBGGuser";
import Icon from "components/icon";
import UserAvatar from "components/avatar";
import ChangePassword from "containers/myAccount/changePassword";
import ErrorAlert from "components/errorAlert";
import I18N, { getI18Ntext } from "i18n";

const MyAccountView = ({
  data,
  loading,
  dataLocations,
  loadingLocations,
  onSubmit,
  errors,
}) => {
  const [validationStatus, setValidationStatus] = useState({});

  const [modified, setModified] = useState(false);

  const [BGGuser, setBGGuser] = useState(
    data && data.bgg_user ? data.bgg_user : ""
  );
  const [avatar, setAvatar] = useState(data && data.avatar ? data.avatar : "");
  const [validBGGuser, onValidateBGGuser] = useState("yes");

  const [isOpenModalPassword, setIsOpenModalPassword] = useState(false);

  const validations = {
    username: ["required"],
    first_name: ["required"],
    last_name: ["required"],
    email: ["required", "email"],
    phone: ["required", "phone"],
    whatsapp: ["required", "phone"],
    location: ["required"],
    bgg_user: [
      "required",
      function () {
        validBGGuser;
        return !validBGGuser
          ? getI18Ntext("validation.BGGuser")
          : validBGGuser === "no"
          ? getI18Ntext("validation.BGGuserDoesNotExist")
          : null;
      },
    ],
  };

  return (
    <PrivateLayout loading={loading} doctitle="title.MyAccount">
      <Row className="justify-content-center">
        <Col xl={12}>
          <PageHeader title="title.MyAccount" />
          <Card>
            <CardBody className="pe-lg-5">
              <Row>
                <Col lg={3} md={4}>
                  <div className="p-md-5 pt-4">
                    <div
                      style={{
                        maxWidth: 120,
                        margin: "0 auto",
                      }}
                    >
                      <UserAvatar size="full" />
                    </div>
                    <div className="text-center pt-3">
                      <h4 className="m-0">{`${data?.first_name} ${data?.last_name}`}</h4>
                      <p className="m-0">({data?.username})</p>
                      <p>
                        <b>BGG:</b> <em>{data?.bgg_user}</em>
                      </p>
                    </div>
                  </div>
                </Col>
                <Col lg={9} md={8}>
                  <Form
                    onSubmit={(formData) => {
                      onSubmit(data.id, formData);
                    }}
                    validations={validations}
                    validationStatus={validationStatus}
                    setValidationStatus={setValidationStatus}
                  >
                    <h5 className="py-4 m-0">
                      <I18N id="register.EnterData" />
                    </h5>
                    <Row className="align-items-end">
                      <Col md={6}>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.Username"
                          name="username"
                          textSize={textSize.account.username}
                          noSpaces
                          placeholder="form.Username"
                          icon="user"
                          question="form.Username.help"
                          onChange={() => {
                            setModified(true);
                          }}
                        />
                      </Col>
                      <Col xs="auto">
                        <div className="pb-4">
                          <Button
                            outline
                            color="secondary"
                            size="sm"
                            onClick={() => {
                              setIsOpenModalPassword(true);
                            }}
                          >
                            <I18N id="btn.ChangePassword" />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <hr />
                    <h5 className="py-4 m-0">
                      <I18N id="register.AccountData" />
                    </h5>
                    <Hidden name="avatar" value={avatar} />
                    <Row>
                      <Col md={6}>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.FirstName"
                          name="first_name"
                          textSize={textSize.account.first_name}
                          placeholder="form.FirstName"
                          icon="user"
                          onChange={() => {
                            setModified(true);
                          }}
                        />
                      </Col>
                      <Col md={6}>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.LastName"
                          name="last_name"
                          textSize={textSize.account.last_name}
                          placeholder="form.LastName"
                          icon="user"
                          onChange={() => {
                            setModified(true);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={7}>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.Email"
                          name="email"
                          type="email"
                          textSize={textSize.account.email}
                          lowercase
                          placeholder="form.Email"
                          icon="envelope"
                          onChange={() => {
                            setModified(true);
                          }}
                        />
                      </Col>
                      <Col md={5}>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.Location"
                          name="location"
                          type="select"
                          optgroups
                          options={locationsToOptions(dataLocations)}
                          loading={loadingLocations}
                          icon="map-marker"
                          onChange={() => {
                            setModified(true);
                          }}
                          classNameContainer="mb-1"
                        />

                        <p className="small muted mb-5">
                          <I18N
                            id="form.Location.help"
                            values={[linksToHelp.organization]}
                          />
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.Phone"
                          name="phone"
                          type="phone"
                          textSize={textSize.account.phone}
                          placeholder="form.Phone"
                          icon="phone"
                          onChange={(v) => {
                            setModified(true);
                          }}
                        />
                      </Col>
                      <Col md={4}>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="WhatsApp"
                          notTranslateLabels
                          name="whatsapp"
                          textSize={textSize.account.whatsapp}
                          type="phone"
                          placeholder="form.Phone"
                          icon="whatsapp"
                          onChange={() => {
                            setModified(true);
                          }}
                        />
                      </Col>
                      <Col md={4}>
                        <Input
                          data={data}
                          label="Telegram"
                          name="telegram"
                          placeholder="Telegram"
                          textSize={textSize.account.telegram}
                          notTranslateLabels
                          notTranslatePlaceholder
                          icon="telegram"
                          onChange={() => {
                            setModified(true);
                          }}
                        />
                      </Col>
                    </Row>
                    <hr />
                    <h5 className="py-4 m-0">
                      <I18N id="register.BGGdata" />
                    </h5>
                    <Row className="align-items-end">
                      <Col>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.BGGuser"
                          name="bgg_user"
                          placeholder="form.BGGuser"
                          icon="bgg"
                          question="form.BGGuser.help"
                          onChange={(v) => {
                            setModified(true);
                            setBGGuser(v);
                            onValidateBGGuser(null);
                          }}
                          after={
                            validBGGuser ? (
                              <Icon
                                type={
                                  validBGGuser === "yes" ? "check" : "times"
                                }
                                className={
                                  validBGGuser === "yes"
                                    ? "text-success"
                                    : "text-danger"
                                }
                              />
                            ) : null
                          }
                          classNameContainer="mb-2"
                        />
                      </Col>
                      <Col md="auto" xs={12}>
                        <div className="pb-2">
                          <TestBGGuser
                            username={BGGuser}
                            onValidateUser={onValidateBGGuser}
                            onGetAvatar={(avatarlink) => {
                              setAvatar(avatarlink);
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Hidden name="referred" value="Luis Olcese" />
                    <hr />
                    <ErrorAlert errors={errors} />
                    <div className="text-center py-4">
                      <Button
                        color="link"
                        tag="a"
                        className="me-2 mb-sm-0 mb-2"
                        outline
                        onClick={(e) => {
                          e.preventDefault();
                          Router.push("/");
                        }}
                      >
                        <I18N id="btn.Cancel" />
                      </Button>
                      <Button
                        color="primary"
                        type="submit"
                        disabled={!modified}
                        size="lg"
                      >
                        <I18N id="btn.SaveChanges" />
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal
        isOpen={isOpenModalPassword}
        centered
        toggle={() => {
          setIsOpenModalPassword((v) => !v);
        }}
      >
        <ModalBody>
          {isOpenModalPassword ? (
            <ChangePassword setIsOpenModalPassword={setIsOpenModalPassword} />
          ) : null}
        </ModalBody>
      </Modal>
    </PrivateLayout>
  );
};

export default MyAccountView;
