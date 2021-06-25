import { Typography } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { StyledButton } from "../../../styles/components"
import Video from "./video"

export default function SectionWithVideo({ data }) {
  const videoSrc = "https://www.youtube.com/embed/6_aWI8JgRCs"

  return (
    <StyledSectionWithVideo>
      <Video videoSrcURL={videoSrc} videoTitle="Conócenos" />
      <div className="info">
        <Typography variant="h3" color="textPrimary">
          {data.title}
        </Typography>

        <Typography variant="body1" color="textSecondary">
          {data.description}
        </Typography>

        <StyledButton
          variant="contained"
          color="primary"
          href={data.buttonUri.uri}
        >
          {data.buttonText}
        </StyledButton>
      </div>
    </StyledSectionWithVideo>
  )
}

const StyledSectionWithVideo = styled.section`
  max-width: 130rem;
  padding: 4rem 2rem;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  gap: 3rem;

  // Reverse the column on mobile
  flex-direction: column;
  @media (min-width: 76.8rem) {
    padding: 5rem 0 8rem;
    flex-direction: row;
    text-align: left;
    justify-content: space-between;

    .video {
      flex-basis: 45%;
    }

    .info {
      flex-basis: 45%;
    }
  }

  .video {
    iframe {
      width: 100%;

      @media (min-width: 76.8rem) {
        height: 35rem;
      }
    }
  }

  .info {
    p {
      margin: 3rem 0 5rem;
    }
  }
`
