import styled from "styled-components"

export const StyledFooter = styled.footer.attrs(props => ({
  background: props.background || "#ccc",
}))`
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-bottom: 1px solid ${props => props.background};

  // Positioning
  & .footer-container {
    display: grid;
    grid-template-columns: repeat(4, minmax(292.5px, 1fr));
    max-width: 1170px;
    padding: 10rem 0 0;
    gap: 1.5rem;
    flex-basis: 100%;
    flex-wrap: wrap;

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
      grid-column: 1/2;
    }
    .about-info {
      grid-column: 2/3;

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
    flex-basis: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem 0;
    border-top: 1px solid #666;
    max-width: 130rem;

    a {
      text-decoration: underline;
      text-decoration-color: #9ca9c4;

      &:hover {
        opacity: 0.9;
      }
    }
  }
`
