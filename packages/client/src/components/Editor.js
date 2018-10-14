import React, { Component } from "react"
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik"
import styled from "styled-components"
import uuid from "uuid"
import { transparentize } from "polished"
import { pipe } from "lodash/fp"

import saveNewItem from "../db/saveNewItem"
import MyCards from "./MyCards"
import { getColor, getSpace, getFont } from "../theme"

class Editor extends Component {
  render() {
    return (
      <MyCards.Consumer>
        {({ addACard }) => {
          return (
            <Container>
              <Formik
                initialValues={{ content: "" }}
                validateOnBlur={false}
                validateOnChange={false}
                validate={values => {
                  let errors = {}
                  if (!values.content) {
                    errors.content = "Come on. You gotta let SOMETHING go!"
                  }
                  return errors
                }}
                onSubmit={({ content }, { setSubmitting, resetForm }) => {
                  const id = uuid()
                  addACard(id)
                  saveNewItem({ id, content })
                  resetForm()
                  setSubmitting(false)
                }}
              >
                {({ submitForm }) => (
                  <Form>
                    <Title>I'm letting go of...</Title>
                    <ErrorMessage name="content" />
                    <Field type="textarea" name="content">
                      {({ field }) => (
                        <TextArea
                          {...field}
                          placeholder="something that hurts me..."
                          onKeyDown={e => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              submitForm()
                            }
                          }}
                        />
                      )}
                    </Field>
                    <SubmitButton>Let go!</SubmitButton>
                  </Form>
                )}
              </Formik>
            </Container>
          )
        }}
      </MyCards.Consumer>
    )
  }
}

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${getColor("primary")};
`

const Title = styled.h1`
  text-align: center;
  font-family: ${getFont("handwritten")};
  font-weight: normal;
  color: ${getColor("light")};
  margin: 0;
`

const Form = styled(FormikForm)`
  display: flex;
  height: 80vh;
  justify-content: space-around;
  align-items: center;
  flex-flow: column nowrap;
  margin: ${getSpace(2)};
  padding: ${getSpace(4)};
  border-radius: 2px;
  background-image: linear-gradient(
    0deg,
    transparent 0%,
    hsla(0, 0%, 10%, 0.5) 100%
  );
  border-radius: 10px;
  border: 1px solid ${getColor("dark")};
  box-shadow: 0px 0px 50px 10px ${getColor("dark")};
  background-color: ${pipe(
    getColor("dark"),
    transparentize(0.7)
  )};
`

const SubmitButton = styled.button.attrs({ type: "submit" })`
  background: ${getColor("primary")};
  border: none;
  color: ${getColor("light")};
  padding: ${getSpace(2)};
  flex-grow: 0;
`

const TextArea = styled.textarea`
  opacity: 0.8;
  font-family: ${getFont("handwritten")};
  color: ${getColor("pens.red")};
  font-size: 2em;
  background: ${getColor("light")};
  margin: ${getSpace(2)};
  resize: none;
  padding: ${getSpace(2)};
  width: 100%;
  text-align: center;
`

export default Editor
