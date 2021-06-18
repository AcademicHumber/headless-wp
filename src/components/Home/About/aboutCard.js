import React from "react"
import { Typography } from "@material-ui/core"
import CheckIcon from "@material-ui/icons/Check"

export default function AboutCard({ title, description }) {
  return (
    <div className="companyData">
      <CheckIcon />
      <Typography variant="h4" color="textPrimary">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </div>
  )
}
