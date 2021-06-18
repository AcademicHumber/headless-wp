import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
import { Link } from "gatsby"
import DescriptionIcon from "@material-ui/icons/Description"
import { useTheme } from "@material-ui/core/styles"

export default function ServiceCard({ service }) {
  const { title, uri } = service

  const theme = useTheme()

  return (
    <StyledServiceCard theme={theme}>
      <Link to={uri} className="serviceIconContainer">
        <DescriptionIcon color="primary" />
      </Link>
      <div className="serviceData">
        <Link to={uri}>
          <Typography variant="h4" color="textPrimary">
            {title}
          </Typography>
        </Link>
        <Link to={uri}>
          <Typography variant="caption" color="textSecondary">
            Saber Más →
          </Typography>
        </Link>
      </div>
    </StyledServiceCard>
  )
}

const StyledServiceCard = styled.div.attrs(props => ({
  theme: props.theme,
}))`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin: 0.5rem 0;
  padding: 2rem;

  min-height: 20rem;
  min-width: 45%;
  @media (min-width: 76.8rem) {
    min-width: 18%;
  }

  // Look and feel

  border: 1px solid #ccc;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    border: none;
    box-shadow: 0px 1px 3px 2px rgba(0, 0, 0, 0.3);
    border-bottom: 4px solid ${props => props.theme.palette.primary.main};

    .serviceIconContainer {
      background: ${props => props.theme.palette.primary.main};
      border: 1px solid ${props => props.theme.palette.primary.main};

      svg {
        fill: ${props => props.theme.palette.secondary.light};
      }
    }
  }

  // Inner elements
  .serviceData {
    text-align: left;

    h4 {
      margin: 0;
      transition: all 0.2s ease;
      &:hover {
        color: ${props => props.theme.palette.primary.main};
      }
    }

    span {
      transition: all 0.2s ease;

      &:hover {
        color: ${props => props.theme.palette.primary.main};
      }
    }
  }

  .serviceIconContainer {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 50%;
  }
`
