import React from "react"
import { useState } from "react"
import { Formik, Form, Field } from "formik"
import {
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from "@material-ui/core"
import { TextField } from "formik-material-ui"
import styled from "styled-components"

export default function ContactForm({ formIntructions }) {
  const [serverResponse, setserverResponse] = useState("")
  const theme = useTheme()
  if (!serverResponse) {
    return (
      <>
        <Typography variant="caption" color="textSecondary">
          {formIntructions}
        </Typography>
        <StyledContactForm theme={theme}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              message: "",
            }}
            validate={values => {
              const errors = {}
              // Check name
              if (!values.name) {
                errors.name = "Requerido"
              } else if (!/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm.test(values.name)) {
                errors.name = "Ingresa un nombre válido"
              }
              // Check email
              if (!values.email) {
                errors.email = "Requerido"
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = "Correo electrónico no válido"
              }

              // Check message
              if (!values.message) {
                errors.message = "Requerido"
              } else if (
                !/\b([a-zA-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm.test(values.message)
              ) {
                errors.message = "Ingresa un mensaje válido"
              }
              return errors
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const response = await window
                .fetch(`/api/form-submision`, {
                  method: `POST`,
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(values),
                })
                .then(res => res.json())

              setserverResponse(response)
              setSubmitting(false)
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Field
                  component={TextField}
                  name="name"
                  type="text"
                  label="Nombre"
                  variant="outlined"
                />
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Correo Electrónico"
                  variant="outlined"
                />
                <Field
                  component={TextField}
                  name="message"
                  type="text"
                  multiline
                  rows="6"
                  label="Mensaje"
                  variant="outlined"
                  className="contactMessage"
                />
                {isSubmitting && <CircularProgress />}
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Enviar
                </Button>
              </Form>
            )}
          </Formik>
        </StyledContactForm>
      </>
    )
  } else {
    return (
      <StyledResponseBox className="response" theme={theme}>
        <Typography variant="body1" color="textPrimary">
          {serverResponse}
        </Typography>
      </StyledResponseBox>
    )
  }
}

const StyledContactForm = styled.div.attrs(props => ({
  theme: props.theme,
}))`
  padding-top: 1rem;
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
  }
  .MuiFormControl-root {
    background: ${props => props.theme.palette.primary.light};
    flex-basis: 48%;
  }
  .contactMessage {
    flex-basis: 100%;
  }
`

const StyledResponseBox = styled.div.attrs(props => ({
  theme: props.theme,
}))`
  padding: 4rem;
  background: ${props => props.theme.primary.light};
  max-width: 80%;
  margin: 0 auto;
  border-radius: 2rem;
  box-shadow: 1px 2px 4px 2px rgba(0, 0, 0, 0.15);
`
