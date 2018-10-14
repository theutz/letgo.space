import React, { Component } from "react"
import { ThemeProvider } from "styled-components"
import Helmet from "react-helmet"

import GlobalStyle from "./GlobalStyle"
import Container from "./Container"
import Notecard from "./Notecard"
import Editor from "./Editor"
import LightingSkin from "./LightingSkin"
import theme from "../theme"

class App extends Component {
  state = {
    cards: [],
  }

  componentDidMount() {}

  render() {
    const { cards } = this.state

    return (
      <>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans:700|Permanent+Marker"
            rel="stylesheet"
          />
        </Helmet>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <LightingSkin />
            <Editor />
            <Container>
              {cards.map(({ id, content }, index) => (
                <Notecard key={id} index={index} count={cards.length}>
                  {content}
                </Notecard>
              ))}
            </Container>
          </>
        </ThemeProvider>
      </>
    )
  }
}

export default App
