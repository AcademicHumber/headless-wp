import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
import AccordionElement from "./accordionElement"
import { chunk } from "lodash"
import { useTheme } from "@material-ui/styles"

export default function Faq({ data, questions }) {
  // Divide the total faq in two parts
  const questionsLength = questions.length
  const dividedQuestions = chunk(questions, questionsLength / 2)

  const theme = useTheme()

  return (
    <StyledFaq theme={theme}>
      <Typography variant="h2" color="textPrimary">
        {data.title}
      </Typography>
      <div className="faq">
        <div className="faq-column">
          {dividedQuestions[0]?.map((question, index) => (
            <AccordionElement
              question={question}
              index={index}
              key={question.slug}
            />
          ))}
        </div>
        <div className="faq-column">
          {dividedQuestions[1]?.map((question, index) => (
            <AccordionElement
              question={question}
              index={index}
              key={question.slug}
            />
          ))}
        </div>
      </div>
    </StyledFaq>
  )
}

const StyledFaq = styled.section.attrs(props => ({
  theme: props.theme,
}))`
  max-width: 130rem;
  margin: 0 auto;
  padding: 8rem 2rem;

  .faq {
    display: flex;
    flex-wrap: wrap;
    padding: 4rem 0;

    // Column on mobile
    flex-direction: column;
    @media (min-width: 76.8rem) {
      flex-direction: row;
      text-align: left;
      justify-content: center;
      gap: 2rem;

      .faq-column {
        flex-basis: 48%;
      }
    }

    .question-item {
      background: ${props => props.theme.palette.primary.light};
    }
  }
`
