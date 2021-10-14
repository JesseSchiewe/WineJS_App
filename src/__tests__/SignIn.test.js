import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignIn from '../components/SignIn';
import { BrowserRouter } from "react-router-dom";

const mockLogin = jest.fn((email, password) => {
    // console.log(Promise.resolve({ email, password }));
    return Promise.resolve({ email, password });
});

describe("SignIn", () => {
//   beforeEach(() => {
//     render(<SignIn login={mockLogin} />);
//   });
    beforeEach(() => {
        render(
            <BrowserRouter>
                <SignIn login={mockLogin} />
            </BrowserRouter>
        );
    });
    
    it("should display required error when value is invalid", async () => {
        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByRole("alert")).toHaveLength(2);
        expect(mockLogin).not.toBeCalled();
    });

    it("should display matching error when email is invalid", async () => {
        fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
            target: {
                value: "test"
            }
        });

        // fireEvent.input(screen.getByLabelText("password"), {
        // fireEvent.input(screen.getByRole("textbox", { name: /password/i }), {
        fireEvent.input(screen.getByTestId("password"), {
            target: {
                value: "password"
            }
        });

        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByRole("alert")).toHaveLength(1);
        expect(mockLogin).not.toBeCalled();
        expect(screen.getByRole("textbox", { name: /email/i }).value).toBe("test");
        // expect(screen.getByLabelText("password").value).toBe("password");
        expect(screen.getByTestId("password").value).toBe("password");
    });

    it("should display min length error when password is invalid", async () => {
        fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
        target: {
            value: "test@mail.com"
        }
    });

    // fireEvent.input(screen.getByLabelText("password"), {
    fireEvent.input(screen.getByTestId("password"), {
    // fireEvent.input(screen.getByRole("textbox", { name: /password/ }), {
        target: {
            value: "pass"
        }
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockLogin).not.toBeCalled();
    expect(screen.getByRole("textbox", { name: /email/i }).value).toBe(
        "test@mail.com"
    );

    // expect(screen.getByLabelText("password").value).toBe("pass");
    expect(screen.getByTestId("password").value).toBe("pass");
  });

  it("should not display error when value is valid", async () => {
    fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
        target: {
            value: "test@mail.com"
        }
    });

    // fireEvent.input(screen.getByLabelText("password"), {
    fireEvent.input(screen.getByTestId("password"), {
        target: {
            value: "password"
        }
    });

    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    expect(mockLogin).toBeCalledWith("test@mail.com", "password");
  });
});




// const mockLogin = jest.fn((email, password) => {
//     return Promise.resolve({ email, password });
// });

// describe("App", () => {
//     beforeEach(() => {
//         render(<SignIn login={mockLogin} />);
//     });

//     it("should allow login", async () => {
//         fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
//             target: {
//                 value: "test"
//             }
//         });

//         fireEvent.input(screen.getByLabelText("password"), {
//             target: {
//                 value: "password"
//             }
//         });

//         fireEvent.submit(screen.getByRole("button"));

//         expect(await screen.findAllByRole("alert")).toHaveLength(1);
//         expect(mockLogin).not.toBeCalled();
//         expect(screen.getByRole("textbox", {name: /email/i }).value).toBe("test");
//         expect(screen.getByLabelText("password").value).toBe("password");
//     });

//     it("should display min length error when password is invalid", async () => {
//         fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
//             target: {
//                 value: "test@mail.com"
//             }
//         });

//         fireEvent.input(screen.getByLabelText("password"), {
//             target: {
//                 value: "pass"
//             }
//         });

//         expect(await screen.findAllByRole("alert")).toHaveLength(1);
//         expect(mockLogin).not.toBeCalled();
//         expect(screen.getByRole("textbox", { name: /email/i }).value).toBe(
//             "test@mail.com"
//         );
//         expect(screen.getByLabelText("password").value).toBe("pass");

//     });

//     it("should not display error when value is valid", async () => {
//         fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
//             target: {
//                 value: "test@mail.com"
//             }
//         });

//         fireEvent.input(screen.getByLabelText("password"), {
//             target: {
//                 value: "password"
//             }
//         });

//         await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
//         expect(mockLogin).toBeCalledWith("test@mail.com", "password");
//         expect(screen.getByRole("textbox", { name: /email/i }).value).toBe("");
//         expect(screen.getByLabelText("password").value).toBe("");
//     });

// });

