import { render, screen } from "@testing-library/react"
import Main from "."

describe("<Main />", () => {
  it("should be render element", () => {
    render(<Main />)

    expect(
      screen.getByRole("heading", {
        name: /main component/i
      })
    )
  })
})
