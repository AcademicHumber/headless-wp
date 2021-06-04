import styled from "styled-components"

export const StyledFooter = styled.footer.attrs(props => ({
  background: props.background || "#ccc",
}))`
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  // Positioning
  & .footer-container {
    display: grid;
    grid-template-columns: repeat(4, minmax(292.5px, 1fr));
    max-width: 1170px;
    padding: 10rem 0 0;
    gap: 1.5rem;

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
  }

  .site-info {
    grid-column: 1/2;
  }
  .about-info {
    grid-column: 2/3;
  }
`
