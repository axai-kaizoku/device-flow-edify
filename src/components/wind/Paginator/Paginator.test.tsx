import { render, screen } from "@testing-library/react";
import { Paginator } from "./Paginator";

describe("Paginator Testing", () => {
  it("Paginator Render Successfully", () => {
    render(
      <Paginator currentPage={3} onChangePage={(e) => {}} totalPage={10} />
    );
    expect(screen.getByText(3)).toBeInTheDocument();
  });
});
