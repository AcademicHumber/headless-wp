import React from "react"
/**Form Imports */
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import FormHelperText from "@material-ui/core/FormHelperText"

const formError = false

export default function FooterNewsletter({ Texts }) {
  return (
    <form>
      <FormControl variant="outlined" error={formError}>
        <InputLabel htmlFor="email-input">{Texts.placeholder}</InputLabel>
        <OutlinedInput id="email-input" label={Texts.placeholder} />
        {formError && <FormHelperText id="email-input">Error</FormHelperText>}
      </FormControl>
    </form>
  )
}
