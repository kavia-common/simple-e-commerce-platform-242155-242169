import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders shop title", () => {
  render(<App />);
  const title = screen.getByText(/shop/i);
  expect(title).toBeInTheDocument();
});
