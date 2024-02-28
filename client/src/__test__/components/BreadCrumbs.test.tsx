import { fireEvent, render, screen } from "@testing-library/react";
import BreadCrumbs from "../../components/BreadCrumbs";

describe("BreadCrumbs", () => {
  it("renders the breadcrumbs correctly when path props has only one element", () => {
    render(
      <BreadCrumbs
        path="/myPath"
        setFolder={() => {
          console.log("test passed");
        }}
      />
    );
    const breadcrumbs = screen.getByText("/myPath");
    expect(breadcrumbs).toBeInTheDocument();
  });

  it("renders the breadcrumbs correctly when path props has more than one element", () => {
    render(
      <BreadCrumbs
        path="/test/path"
        setFolder={() => {
          console.log("test passed");
        }}
      />
    );
    const breadcrumbs1 = screen.getByText("/test");
    const breadcrumbs2 = screen.getByText("/path");
    expect(breadcrumbs1).toBeInTheDocument();
    expect(breadcrumbs2).toBeInTheDocument();
  });

  it("should call the function passed in the props when clicked", () => {
    const testOnClick = jest.fn();
    render(<BreadCrumbs path="/myPath" setFolder={testOnClick} />);
    const breadcrumbs = screen.getByText("/myPath");
    fireEvent.click(breadcrumbs);
    expect(testOnClick).toHaveBeenCalled();
  });
});
