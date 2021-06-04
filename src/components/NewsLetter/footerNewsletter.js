import React from "react"
/**Form Imports */
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import SendIcon from "@material-ui/icons/Send"
import FormHelperText from "@material-ui/core/FormHelperText"
import InputBase from "@material-ui/core/InputBase"

const formError = false

export default function FooterNewsletter({ Texts }) {
  return (
    <>
      <Paper component="form" className="subscription_form">
        <InputBase
          className="footer-email"
          placeholder={Texts.placeholder}
          inputProps={{ "aria-label": Texts.placeholder, name: "email" }}
          error={formError}
        />

        <IconButton
          type="submit"
          className="subscription-send"
          aria-label="Send"
        >
          <SendIcon color="primary" />
        </IconButton>
      </Paper>
    </>
  )
}
