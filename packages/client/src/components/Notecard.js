import React, { Component } from "react"
import styled, { keyframes } from "styled-components"
import random from "random"

import { getColor, getFont } from "../theme"

const scale = 3
const lineHeight = scale * 0.66
const randRange = [-50, 50]

const entryAnimation = ({ r1, r2, r3, x1, x2, y1, y2 }) => keyframes`
0% {
  opacity: 0;
  transform: scale(1.1) rotate(${r1}deg) translate(0px, 0px);
}
1% {
  opacity: 1;
  transform: scale(1) rotate(${r1}deg) translate(${x1}px, ${y1}px);
}
20% {
  transform: scale(1) rotate(${r1}deg) translate(${x1}px, ${y1}px);
}
50% {
  opacity: 1;
  transform: scale(0.5) rotate(${r1}deg) translate(${x2}px, ${y2}px);
}
100% {
  opacity: 0;
  transform: scale(0) rotate(${r1}deg) translate(${x1}px, ${y2}px);
}
`
class Notecard extends Component {
  state = {
    r1: random.int(...randRange),
    r2: random.int(...randRange),
    r3: random.int(...randRange),
    x1: random.int(...randRange),
    x2: random.int(...randRange),
    y1: random.int(...randRange),
    y2: random.int(...randRange),
    top: random.int(-2, 2),
    left: random.int(-2, 2),
  }

  render() {
    const { ...state } = this.state
    const { ...props } = this.props

    return <StyledNotecard {...state} {...props} />
  }
}

const StyledNotecard = styled.div`
  position: fixed;
  color: ${({ isMine, ...props }) =>
    getColor(`pens.${isMine ? "red" : "black"}`)(props)};
  animation-name: ${entryAnimation};
  animation-fill-mode: both;
  animation-duration: 30s;
  animation-timing-function: ease-out;
  transform: translateZ(0) rotate(${({ rotation }) => rotation}deg);
  height: ${lineHeight * 3 * scale}rem;
  width: ${lineHeight * 5 * scale}rem;
  top: calc(50% - ${({ top }) => top * 3}in);
  left: calc(50% - ${({ left }) => left * 5}in);
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${lineHeight / 2}rem;
  z-index: ${({ index }) => index};
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-family: ${getFont("handwritten")};
  background-color: ${getColor("notecard.background")};
  background-image: linear-gradient(
    ${getColor("notecard.rule")} 0.1mm,
    transparent 0.1mm
  );
  background-size: 100% ${lineHeight}rem;
  background-position-y: ${lineHeight / 1.3}rem;
  padding: ${scale / 3}rem;
  padding-top: ${lineHeight * 2}rem;
  line-height: ${lineHeight}rem;
  box-shadow: 0px 0px 100px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  &:before {
    content: "";
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    background: ${getColor("notecard.background")};
    border-bottom: 5px double ${getColor("notecard.margin")};
    width: 100%;
    height: calc(${lineHeight}rem + 2px);
  }
`

export default Notecard
