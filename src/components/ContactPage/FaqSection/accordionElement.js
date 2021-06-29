import React from "react"
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import parse from "html-react-parser"

export default function AccordionElement({ question, index }) {
  const questionId = `question_${index}`
  return (
    <Accordion className="question-item">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="Pregunta-Frecuente"
        id={questionId}
      >
        <Typography variant="h4" color="textPrimary">
          {question.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" color="textSecondary" component="div">
          {parse(question.content)}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}
