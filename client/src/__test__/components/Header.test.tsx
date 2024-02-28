import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../../components/Header";

describe("Header", () => {
  it("renders the header text", () => {
    render(<Header title="Test header" />);
    const header = screen.queryByRole("heading", { name: "Test header" });
    expect(header).toBeInTheDocument();
  });
});
