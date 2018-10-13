import { get, has } from "lodash/fp"
import fonts from "./fonts"
import colors from "./colors"

export function getColor(name) {
  if (!has(name, colors)) throw Error(`'${name}' is not a valid color.`)

  return get("theme.colors." + name)
}

export function getFont(name) {
  if (!has(name, fonts))
    throw Error(`'${name}' is not a valid font in the theme.`)

  return get("theme.fonts." + name)
}

export function getSpace(multiplier) {
  return props => props.theme.space * multiplier + "px"
}

export default {
  colors,
  fonts,
  space: 8,
}
