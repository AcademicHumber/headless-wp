import React from "react"
/**Form Imports */
import IconButton from "@material-ui/core/IconButton"
import SendIcon from "@material-ui/icons/Send"
import { Formik, Form, Field } from "formik"
import { CircularProgress, Typography } from "@material-ui/core"
import { TextField } from "formik-material-ui"
import AnimatedMount from "../widgets/animatedMount"

export default function FooterNewsletter({ Texts }) {
  const [subscribed, setSubscribed] = React.useState(false)

  //Save server response
  const [response, setResponse] = React.useState("")

  if (!subscribed) {
    return (
      <div className="footer_Newsletter">
        <Formik
          initialValues={{
            email: "",
          }}
          validate={values => {
            const errors = {}
            if (!values.email) {
              errors.email = "Requerido"
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Correo electrónico no válido"
            }
            return errors
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const serverResponse = await window
              .fetch(`/api/form-submision`, {
                method: `POST`,
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(values),
              })
              .then(res => res.json())

            setResponse(serverResponse)
            setSubmitting(false)
            setSubscribed(true)
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Field
                component={TextField}
                name="email"
                type="email"
                label="Correo Electrónico"
                variant="filled"
              />
              {isSubmitting && <CircularProgress />}

              <IconButton
                type="submit"
                className="subscription-send"
                aria-label="Send"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                <SendIcon color="primary" />
              </IconButton>
            </Form>
          )}
        </Formik>
      </div>
    )
  } else {
    return (
      <AnimatedMount className="formCompleted">
        <Typography variant="body1" color="primary">
          {response}
        </Typography>
      </AnimatedMount>
    )
  }
}
