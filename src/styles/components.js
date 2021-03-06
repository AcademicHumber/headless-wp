import styled from "styled-components"
import { colors } from "./index"
import { Button } from "@material-ui/core"

export const Container = styled.main`
  display: grid;
  min-height: 100vh;
  padding-top: 0;
  position: relative;

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
    padding: 0 2rem;

    @media (min-width: 900px) {
      & {
        padding: 0;
      }
    }
  }

  // This block is used for single service too
  section.service-container {
    grid-column: 2/3;
    display: flex;
    flex-direction: column;

    .serviceInfo {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
      padding: 0 2rem;

      .service-content,
      .gatsby-image-wrapper {
        margin: 2rem 0;
      }

      @media (min-width: 76.8rem) {
        flex-wrap: nowrap;
        padding: 0;

        .service-content,
        .gatsby-image-wrapper {
          flex-basis: 47%;
        }
      }
    }
  }

  .blog-post-nav {
    margin-top: 2rem;
    grid-column: 2/3;
    padding: 1rem 2rem;
    border-top: 1px solid #ccc;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .prev-post {
      flex-basis: 50%;
    }

    .next-post {
      flex-basis: 50%;
      text-align: right;
      border-left: 1px solid #ccc;
    }
  }
`

// Blog post container
export const StyledMainSingleContentContainer = styled.section.attrs(props => ({
  theme: props.theme,
}))`
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
        display: block;
      }

      .post-categories {
        margin: 1rem 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        .postCategory {
          padding: 0.5rem 1rem;
          color: ${props => props.theme.palette.secondary.light};
          background-color: ${props => props.theme.palette.primary.main};
          border-radius: 1rem;
          transition: all 0.2s ease;
          &:hover {
            opacity: 0.8;
          }
        }
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
        padding: 2rem 0rem 2rem 2rem;
      }
      .postTagsTitle {
        margin: 1.5rem 0;
      }
      .post-tags {
        text-align: center;
        margin: 1.5rem 0 2.5rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .postTag {
          padding: 0.5rem 1rem;
          border: 2px solid ${props => props.theme.palette.primary.main};
          margin: 0.5rem;
          color: ${props => props.theme.palette.primary.main};
          transition: all 0.2s ease;
          &:hover {
            color: ${props => props.theme.palette.secondary.light};
            background-color: ${props => props.theme.palette.primary.main};
          }
        }
      }
    }

    .blog-post-nav {
      display: flex;
      justify-content: space-between;

      .prev-post {
        flex-basis: 50%;
      }

      .next-post {
        flex-basis: 50%;
        text-align: right;
        border-left: 1px solid #ccc;
      }
    }
    // Define grid areas
    .blog-post {
      grid-area: content;
    }

    aside.sidebar {
      grid-area: sidebar;

      @media (min-width: 900px) {
        & {
          margin-left: 4rem;
        }
      }
    }

    .blog-post-nav {
      grid-area: pagination;
    }

    grid-template-areas:
      "content"
      "pagination"
      "sidebar";

    padding: 0 2rem;

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
        padding: 0;
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
