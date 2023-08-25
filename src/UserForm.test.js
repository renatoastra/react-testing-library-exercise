import {render, screen} from "@testing-library/react"
import user from '@testing-library/user-event'
import UserForm from "./UserForm"

test("should render a form with two inputs and a submit button", () => {
  // render the component
  render(<UserForm />)
  // Manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox")
  const submitButton = screen.getByRole("button")

  // Assertion - make sure the component is doing what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(submitButton).toBeInTheDocument();
})

test('it calls onUserAdd when the form is submitted',  () => {
  const mock = jest.fn()
  render(<UserForm onUserAdd={mock}/>)

  const nameInput = screen.getByRole("textbox", {name: /name/i})
  const emailInput = screen.getByRole("textbox", {name: /email/i})

  user.click(nameInput)
  user.keyboard("John Doe")

  user.click(emailInput)
  user.keyboard("johndoe@john.com")

  const submitButton = screen.getByRole("button")
  user.click(submitButton)

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({name: "John Doe", email: "johndoe@john.com"})
})

test('empties the two inputs when form is submitted',  () => {
  
  render(<UserForm onUserAdd={jest.fn()}/>)

  const nameInput = screen.getByRole("textbox", {name: /name/i})
  const emailInput = screen.getByRole("textbox", {name: /email/i})

  user.click(nameInput)
  user.keyboard("John Doe")

  user.click(emailInput)
  user.keyboard("johndoe@john.com")

  const submitButton = screen.getByRole("button")
  user.click(submitButton)

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
})