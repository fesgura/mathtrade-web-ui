<Form onSubmit={onSubmit} formStatus={formStatus} setFormStatus={setFormStatus}>
  <Input
    label="Nombre"
    name="nombre"
    placeholder="nombresss"
    data={data}
    formStatus={formStatus}
    setFormStatus={setFormStatus}
    validation={["required"]}
    size="lg"
    // before="A"
    // after="A"
  />

  <Input
    label="Apellido"
    name="apellido"
    data={data}
    formStatus={formStatus}
    setFormStatus={setFormStatus}
    size="lg"
  />
  <Input
    label="Descripcion"
    name="description"
    type="textarea"
    placeholder="Descripcion"
    data={data}
    formStatus={formStatus}
    setFormStatus={setFormStatus}
    //  validation={["required"]}
    size="lg"
    before="A"
  />
  <Input
    label="Selector"
    name="selector"
    type="select"
    data={data}
    formStatus={formStatus}
    setFormStatus={setFormStatus}
    // validation={["required"]}
    //size="lg"
    options={[
      { text: "Argentina", value: "axr" },
      { text: "Brasil", value: "bxr" },
    ]}
    before="A"
  />
  <Input
    label="rang"
    name="rang"
    type="range"
    placeholder="Descripcion"
    data={data}
    formStatus={formStatus}
    setFormStatus={setFormStatus}
    size="lg"
    before="A"
    min="0"
    max="8"
  />
  <Input
    label="Se puede?"
    labelCheckbox="A ver si se puede"
    name="puede"
    type="checkbox"
    data={data}
    formStatus={formStatus}
    setFormStatus={setFormStatus}
    //validation={["required"]}
    //size="lg"
  />
  <Input
    label="Se puede?"
    labelCheckbox="A ver si se puede"
    name="puede_switch"
    type="switch"
    data={data}
    formStatus={formStatus}
    setFormStatus={setFormStatus}
    //validation={["required"]}
    //size="lg"
  />
  <Input
    label="Selector radio"
    name="selector_radio"
    type="radio"
    data={data}
    formStatus={formStatus}
    setFormStatus={setFormStatus}
    validation={["required"]}
    //size="lg"
    options={[
      { text: "Argentina", value: "axr" },
      { text: "Brasil", value: "bxr" },
    ]}
    before="A"
  />
  <Input
    label="Email"
    name="email"
    type="email"
    placeholder="nombresss"
    data={data}
    formStatus={formStatus}
    setFormStatus={setFormStatus}
    //validation={["required"]}
    size="lg"
    // before="A"
    // after="A"
  />
  <div className="text-center py-4">
    <Button color="primary" size="lg" type="submit">
      Ingresar
    </Button>
  </div>
</Form>;
