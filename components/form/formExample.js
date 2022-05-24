import { useState, useEffect } from "react";
import Section from "components/section";
import { Card, CardBody, Button } from "reactstrap";
import { Form, Input } from "components/form";

const UserEdit = () => {
  const [data, set_data] = useState({});

  useEffect(() => {
    setTimeout(() => {
      set_data({ example: "pablo", chk: false, exampleRequired: "" });
    }, 5000);
  }, []);

  const onSubmit = (da) => {
    console.log("onSubmit", da);
  };

  return (
    <Section title="User X" breadcrumbs={["users"]}>
      <Card>
        <CardBody>
          <Form onSubmit={onSubmit} data={data} errorText="Please, Correct!!!">
            <Input
              type="select"
              name="exampleSelect"
              required
              // size="lg"
              label="ExampleSelect"
              before="Q"
              options={[
                { value: "canada", text: "Canada" },
                { value: "argentina", text: "Argentina" },
                { value: "mexico", text: "Mexico" },
              ]}
            />
            <Input
              name="chk"
              label="Color"
              labelCheckbox="Pancita"
              type="checkbox"
              required
            />
            <Input name="example" size="" label="Color" />
            <Input
              type="radio"
              name="exampleRadio"
              required
              //size="lg"
              label="ExampleRadio"
              options={[
                { value: "canada", text: "Canada" },
                { value: "argentina", text: "Argentina" },
                { value: "mexico", text: "Mexico" },
              ]}
            />
            <Input
              name="chkb"
              label="Switch"
              labelCheckbox="Pancita"
              type="switch"
              required
            />
            <Input name="rrr" label="Rage" type="range" min="0" max="5" />
            <Input
              label="Email"
              type="email"
              name="exampleRequired"
              required
              placeholder="hola"
              before="R"
              size="lg"
            />
            <Input
              label="Comment"
              name="comment"
              type="textarea"
              required
              placeholder="hola"
              before="R"
            />
            <Button color="primary" size="lg" type="submit">
              Enviar
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Section>
  );
};
export default UserEdit;
