import React, { Component } from "react"
import { ThemeProvider } from "styled-components"
import Helmet from "react-helmet"

import MyCards from "./MyCards"
import GlobalStyle from "./GlobalStyle"
import Container from "./Container"
import Notecard from "./Notecard"
import Editor from "./Editor"
import LightingSkin from "./LightingSkin"
import getItems$ from "../db/getItems$"
import theme from "../theme"

class App extends Component {
  items$ = getItems$()

  state = {
    myCards: [],
    cards: [],
  }

  addACard = cardId => {
    const { myCards } = this.state
    this.setState({ myCards: [...myCards, cardId] })
  }

  componentDidMount() {
    this.items$.subscribe(item => {
      const { cards } = this.state
      this.setState({ cards: [...cards, item] })
    })
  }

  componentWillUnmount() {
    this.items$.unsubscribe()
  }

  render() {
    const { cards, myCards } = this.state
    return (
      <>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans:700|Permanent+Marker"
            rel="stylesheet"
          />
        </Helmet>
        <MyCards.Provider value={{ myCards, addACard: this.addACard }}>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyle />
              <LightingSkin />
              <Editor />
              <Container>
                {cards.map(({ id, content }, index) => (
                  <Notecard
                    key={id}
                    index={index}
                    count={cards.length}
                    isMine={this.state.myCards.includes(id)}
                  >
                    {content}
                  </Notecard>
                ))}
              </Container>
            </>
          </ThemeProvider>
        </MyCards.Provider>
      </>
    )
  }
}

export default App
