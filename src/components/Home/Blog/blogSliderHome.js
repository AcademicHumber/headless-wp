import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styled from "styled-components"
import { graphql } from "gatsby"
import { Typography } from "@material-ui/core"
import PostCard from "../../postCard"
import { useTheme } from "@material-ui/styles"

export default function BlogSliderHome({ blogData }) {
  const theme = useTheme()

  return (
    <StyledBlogSlider theme={theme}>
      <Typography variant="h2" color="textPrimary" className="HomeSubtitle">
        {blogData.blogTitle}
      </Typography>
      <div className="sliderContainer">
        <Slider {...sliderSettings}>
          {blogData.posts.map((post, index) => (
            <PostCard key={`${post.uri}-${index}`} post={post} />
          ))}
        </Slider>
      </div>
    </StyledBlogSlider>
  )
}

const StyledBlogSlider = styled.section.attrs(props => ({
  theme: props.theme,
}))`
  max-width: 130rem;
  margin: 0 auto;

  .sliderContainer {
    padding: 4rem 0;
    border-bottom: 1px solid #ccc;
    max-width: 100vw;

    @media (min-width: 76.8rem) {
      padding: 8rem 0;
    }

    .slick-slider {
      display: flex;
      align-items: center;
      padding: 0 2rem;

      // Add padding to prevent cards hidding
      .slick-list {
        padding: 1rem 0;
        text-align: center;

        @media (min-width: 76.8rem) {
          text-align: left;
        }
      }
      .slick-prev,
      .slick-next {
        position: relative;
        left: -0.2rem;
        width: 4rem;
        height: 4rem;
        z-index: 10;

        &:before {
          color: #9ca9c4;
          font-size: 4rem;
        }
      }
    }
  }
`

const sliderSettings = {
  autoplay: true,
  arrows: true,
  pauseOnHover: true,
  autoplaySpeed: 7000,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

export const blogHomeQuery = graphql`
  fragment BlogSectionData on WpPage_Homepagedata {
    blogHome {
      blogTitle
      posts {
        ... on WpPost {
          excerpt
          uri
          date(formatString: "MMMM DD, YYYY")
          title
          categories {
            nodes {
              id
              uri
              name
            }
          }
          featuredImage {
            node {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 100, placeholder: TRACED_SVG)
                }
              }
            }
          }
        }
      }
    }
  }
`
