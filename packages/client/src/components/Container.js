import { pipe } from "lodash/fp"
import { transparentize } from "polished"
import styled from "styled-components"

import { getColor } from "../theme"

const Container = styled.div`
  z-index: -1000;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    325deg,
    hsla(0, 100%, 100%, 0.05) 0%,
    hsla(0, 0%, 0%, 0.2) 70%
  );
  background-color: ${pipe(
    getColor("primary"),
    transparentize(0.8)
  )};
`

export default Container
