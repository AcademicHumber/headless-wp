import styled from "styled-components"

export const StyledFooter = styled.footer.attrs(props => ({
  background: props.background || "#ccc",
}))`
  background: ${props => props.background};
  display: grid;
  grid-template-columns: 1fr minmax(300px, 1170px) 1fr;
  justify-content: center;
  flex-wrap: wrap;
  border-bottom: 1px solid ${props => props.background};

  // Positioning
  & .footer-container {
    grid-column: 2/3;
    display: grid;
    grid-template-columns: repeat(auto-fill, 285px);
    flex-wrap: wrap;
    padding: 6rem 0 0;
    gap: 1rem;
    flex-basis: 100%;
    justify-content: center;

    & h4 {
      font-weight: bold;
    }

    & div {
      padding: 1rem 0;

      & .MuiSvgIcon-root {
        font-size: 1.7rem;
        margin-right: 0.5rem;
      }
    }

    .site-info {
      & .open-hours,
      .location,
      .phone {
        margin-bottom: 0.5rem;
      }
      p {
        display: inline-block;
      }
    }

    .about-info {
      .about-text {
        padding-right: 2rem;
      }
    }

    .subscription-form {
      .MuiPaper-root {
        margin: 1rem 0;
        display: flex;
        justify-content: space-around;
      }
      & form .MuiTextField-root {
        width: 100%;
      }

      input {
        padding: 0.5rem 0;
      }
    }
  }

  & .copyright {
    grid-column: 2/3;
    flex-basis: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem 0;
    border-top: 1px solid #666;

    a {
      text-decoration: underline;
      text-decoration-color: #9ca9c4;

      &:hover {
        opacity: 0.9;
      }
    }
  }
`
