import React from "react"
import { Typography } from "@material-ui/core"
/**Form Imports */
import { StyledButton } from "../../styles/components"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import FormHelperText from "@material-ui/core/FormHelperText"

const formError = false

export default function NewsletterForm({ Texts }) {
  return (
    <form>
      <FormControl variant="outlined" error={formError}>
        <InputLabel htmlFor="email-input">{Texts.placeholder}</InputLabel>
        <OutlinedInput id="email-input" label={Texts.placeholder} />
        {formError && <FormHelperText id="email-input">Error</FormHelperText>}
      </FormControl>
      <StyledButton variant="contained" color="primary">
        {Texts.buttonText}
      </StyledButton>
      <Typography variant="caption" className="form-caption">
        {Texts.caption}
      </Typography>
    </form>
  )
}
