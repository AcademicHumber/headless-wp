import { css, createGlobalStyle } from "styled-components"

export const size = {
  small: 400,
  medium: 480,
  mediumL: 960,
  large: 1140,
}

export const above = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${size[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})

export const globals = {
  borderRadius: "30px",
  textFont: "1.8rem",
}

export const colors = {
  purple: "#4b1baf",
  white: "#ffffff",
  link_color: "#3377ff",
  title_color: "#47536b",
  font_color: "#6b7b9c",
}

export const GlobalStyles = createGlobalStyle`
  .___gatsby{
    position: absolute;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html{
    font-size: 62.5%;
    font-family: 'DM Sans';
  }
  body {
    font-size: 1.6rem;
    -ms-word-wrap: break-word;
  word-wrap: break-word;
  }
  main{
    padding-top: 3.5rem;
  }
  p{
    font-size: 1.8rem;    
  }
  a{
    text-decoration: none;
  }
  ${above.medium`
   main{
      padding-top: calc(3.5rem - 100vh);
    }
    `}
  ${above.large`
   main{
      padding-top: calc(4.5rem - 100vh);
    }
  `}
`
