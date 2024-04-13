import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  it("should render user name", () => {
    const user: User = {
      id: 1,
      name: "Hanny",
    };
    render(<UserAccount user={user} />);
    expect(screen.getByText(/hanny/i)).toBeInTheDocument();
  });
  it("should not render edit button if user is not an admin", () => {
    const nonAdminUser: User = {
      id: 1,
      name: "Hanny",
      isAdmin: false,
    };
    render(<UserAccount user={nonAdminUser} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
  it("should render edit button if user is an admin", () => {
    const adminUser: User = {
      id: 1,
      name: "Hanny",
      isAdmin: true,
    };
    render(<UserAccount user={adminUser} />);
    const button = screen.queryByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });
});
