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
