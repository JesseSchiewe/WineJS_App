import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignIn from '../components/SignIn';
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

const mockLogin = jest.fn((email, password) => {
    // console.log(Promise.resolve({ email, password }));
    return Promise.resolve({ email, password });
});

jest.mock('../providers/AuthContext', () => ({
  AuthProvider: ({ children }) => children,
  useAuth: () => {
    return {
      loading: false,
      currentUser: "TESTUSER123",
      signIn: jest.fn(),
      signInWithGoogle: jest.fn(),
    }
  },
  auth: jest.fn()
}));

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
        // fireEvent.input(screen.getByRole("textbox", { name: "password" }), {
        fireEvent.input(screen.getByLabelText(/password/i), {
            target: {
                value: "password"
            }
        });

        // fireEvent.submit(screen.getByRole("button"));
        // fireEvent.submit(screen.getByRole("button", {name: 'SignInwithPasswordButton'  }));
        
        // fireEvent.submit(screen.getByTestId("SignInwithPasswordButton"));
        act(() => {
            fireEvent.submit(screen.getByTestId("SignInwithPasswordButton"));
        })


        // render(
        //     <SignIn login={mockLogin} />
        // );


        // await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
        // expect(mockLogin).toBeCalledWith("test@mail.com", "password");
    });
});
