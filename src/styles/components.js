import styled from "styled-components"
import { colors } from "./index"
import { Button } from "@material-ui/core"

export const Container = styled.main`
  display: grid;
  min-height: 100vh;

  a {
    text-decoration: none;
  }
`

// Blog Archives container
export const StyledMainContentContainer = styled.section`
  padding: 5vh 0;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr minmax(320px, 1170px) 1fr;
  section.container {
    grid-column: 2/3;
    display: grid;
    justify-items: center;
    justify-content: center;
    gap: 15px;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    flex-wrap: wrap;
  }
`

// Blog post container
export const StyledMainSingleContentContainer = styled.section`
  padding: 5vh 0;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr minmax(320px, 1170px) 1fr;

  section.container {
    grid-column: 2/3;
    display: grid;
    grid-gap: 1em;

    .blog-post {
      .post-image {
        margin-bottom: 2rem;
      }
      .post-title {
        margin: 2rem 0;
      }
      .author {
        display: flex;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 1.5px solid #999;

        & .bio-avatar {
          border-radius: 50%;
        }
      }
      .post-content {
        padding: 2rem 0rem 2rem 1rem;
      }
    }

    .blog-post-nav {
    }
    // Define grid areas
    .blog-post {
      grid-area: content;
    }

    .blog-post-nav {
      grid-area: pagination;
    }

    grid-template-areas:
      "content"
      "pagination"
      "sidebar";

    @media (min-width: 500px) {
      & {
        grid-template-columns: auto 25%;
        grid-template-areas:
          "content  sidebar"
          "pagination sidebar";
      }
    }

    @media (min-width: 900px) {
      & {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas:
          " content content sidebar"
          " pagination pagination sidebar";
      }
    }
  }
`

export const StyledButton = styled(Button)`
  //box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  align-self: flex-start;

  padding: 10px 25px;

  /*&:hover {
    background: ${colors.link_color};
    color: white;
  }*/
`
