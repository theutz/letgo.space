import { createGlobalStyle } from "styled-components"
import { normalize } from "polished"

import { getColor, getFont } from "../theme"

const GlobalStyle = createGlobalStyle`
  ${normalize()};

  html {
    font-size: 16px;
  }

  body {
    font-family: ${getFont("body")};
    color: ${getColor("pens.red")}
    background-image: radial-gradient(hsl(0, 0%, 12%) 0%, hsl(0, 0%, 5%) 100%);
    background-color: black;
  }
`

export default GlobalStyle
