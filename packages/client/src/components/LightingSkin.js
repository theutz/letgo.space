import styled from "styled-components"

const LightingSkin = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 2000;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: radial-gradient(
    hsla(0, 100%, 100%, 0) 0%,
    hsla(0, 0%, 0%, 1) 120%
  );
`

export default LightingSkin
