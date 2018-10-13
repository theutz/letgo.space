import React, { Component } from "react"
import { ThemeProvider } from "styled-components"
import Helmet from "react-helmet"

import GlobalStyle from "./GlobalStyle"
import Container from "./Container"
import Notecard from "./Notecard"
import LightingSkin from "./LightingSkin"
import theme from "../theme"

class App extends Component {
  state = {
    cards: [],
  }

  componentDidMount() {
    let currCount = 1

    const interval = setInterval(() => {
      if (currCount > 50) {
        clearInterval(interval)
        return
      }

      this.setState({
        cards: [...this.state.cards, { id: currCount, content: currCount++ }],
      })
    }, 750)
  }

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
