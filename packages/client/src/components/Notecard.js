import React, { Component } from "react"
import styled, { keyframes } from "styled-components"
import random from "random"

import { getColor, getFont } from "../theme"

const scale = 1.5
const lineHeight = scale * 0.66
const rotationRange = 55

const entryAnimation = ({ rotation }) => keyframes`
from {
  opacity: 0;
  transform: scale(1.5) rotate(${rotation}deg);
}
to {
  opacity: 1;
  transform: scale(1) rotate(${rotation}deg);
}
`

const staticAnimation = ({ rotation }) => keyframes`
from {
  transform: scale(1) rotate(${rotation}deg)
}
33% {
  transform: scale(0.8) rotate(${rotation - rotation / 4}deg)
}
66% {
  transform: scale(0.8) rotate(${rotation + rotation / 4}deg);
}
to {
  transform: scale(1) rotate(${rotation}deg)
}
`

const exitAnimation = ({ rotation }) => keyframes`
from {
  opacity: 1;
  transform: scale(1) rotate(${rotation}deg);
}
to {
  opacity: 0;
  transform: scale(0) rotate(${rotation}deg);
}
`

class Notecard extends Component {
  state = {
    rotation: random.int(-rotationRange, rotationRange),
    top: random.int(-10, 90),
    left: random.int(-10, 90),
  }

  render() {
    const { ...state } = this.state
    const { ...props } = this.props

    return <StyledNotecard {...state} {...props} />
  }
}

const StyledNotecard = styled.div`
  position: fixed;
  animation-name: ${entryAnimation}, ${staticAnimation}, ${exitAnimation};
  animation-duration: 0.5s, 10s, 10s;
  animation-delay: 0s, 0.5s, 10s;
  animation-timing-function: ease-in-out, ease-in-out, ease-in-out;
  animation-fill-mode: backwards, none, forwards;
  animation-iteration-count: 1, 1, 1;
  transform: translateZ(0) rotate(${({ rotation }) => rotation}deg);
  height: ${lineHeight * 3 * scale}rem;
  width: ${lineHeight * 5 * scale}rem;
  top: ${({ top }) => top}vh;
  left: ${({ left }) => left}vw;
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
