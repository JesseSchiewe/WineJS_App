import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignIn from './components/SignIn';
import { BrowserRouter } from "react-router-dom";

const mockLogin = jest.fn((email, password) => {
    // console.log(Promise.resolve({ email, password }));
    return Promise.resolve({ email, password });
});

describe("App", () => {
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
    
    it("should be able to sign in", async () => {
        fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
            target: {
                value: "test@mail.com"
            }
        });
        fireEvent.input(screen.getByLabelText("password"), {
            target: {
                value: "password"
            }
        });

        fireEvent.submit(screen.getByRole("button"));

        render(
            <SignIn login={mockLogin} />
        );


        await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
        expect(mockLogin).toBeCalledWith("test@mail.com", "password");
    });
});
