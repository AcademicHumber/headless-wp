import React from "react"
import { keyframes } from "styled-components"
import styled from "styled-components"

export default function AnimatedMount({ children }) {
  return <AnimatedDiv className="formCompleted">{children}</AnimatedDiv>
}

const appear = keyframes`
    0% {
    transform: scale(0.1);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
`

const AnimatedDiv = styled.div`
  animation: ${appear} 0.8s ease-in-out;
`
