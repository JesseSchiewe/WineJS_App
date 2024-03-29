import React from 'react';
import ReactDOM from 'react-dom';
import WineReviewForm from '../components/WineReviewForm';
import { render, cleanup, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
// import { auth, useAuth } from '../providers/AuthContext';
// import { authMock } from '../__mocks__/authMock';

afterEach(cleanup)

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

jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  remove: jest.fn(),
  set: jest.fn(),
}))



// "Review" Type (Brand new review, not filling in past review data.
jest.mock("react-router-dom", ()  => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/review"
    })
}));

// it("testing only", () => {
//   console.log("DID THIS TEST MESSAGE WORK?");
//   console.log('\n\n\n\n');
// })


it("renders without crashing - Review Type", () => {
    const div = document.createElement("div");
    ReactDOM.render(<WineReviewForm></WineReviewForm>, div)
});

it("renders page correctly", () => {
    const {getByTestId} = render(<WineReviewForm></WineReviewForm>)
    expect(getByTestId('FullReview')).toHaveTextContent("Nose Intensity")
});

// it("matches snapshot", () => {
//     jest
//         .useFakeTimers('modern')
//         .setSystemTime(new Date('01-01-2001').getTime());
//     const tree = renderer.create(<WineReviewForm/>).toJSON();
//     expect(tree).toMatchSnapshot();
// })


// Test "reviewresults" type with preloaded data (pre-configured, not pulled from database)
jest.mock("react-router-dom", ()  => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/reviewresult"
    })
}));
// jest
//     .useFakeTimers('modern')
//     .setSystemTime(new Date('01-01-2001').getTime());

const testData = {
    ActualPrice: "75",
    Appellation: "Appellation1",
    Aromas: ['Cherry', 'Strawberry', 'Raspberry', 'Pomegranate', 'Tomato'],
    Balance: "3",
    FlavorCharacteristics: "19",
    FlavorIntensity: "4",
    FlavorIntensityNotes: "Testing FI Notes",
    Flavors: ['Red Currant', 'Mushroom', 'Leather', 'Black Pepper', 'Cedar'],
    Length: "5",
    LengthNotes: "Testing LEN Notes",
    NoseIntensity: "2",
    NoseIntensityNotes: "Testing NI Notes",
    Producer: "Producer1",
    ReviewData: "9-7-2021",
    TastingNotes: "Testing Tasting Notes",
    Total: "93",
    Vintage: "2005",
    WineName: "WineName1",
    WineValue: "53"
}

it("renders without crashing - With Data", () => {
    const div = document.createElement("div");
    ReactDOM.render(<WineReviewForm preloadedValues={testData} />, div)
});

it("renders page correctly - With Data", () => {
    const {getByTestId} = render(<WineReviewForm preloadedValues={testData} />)
    expect(getByTestId('FullReview')).toHaveTextContent("Balance")
});

// it("matches snapshot 3", () => {
//     jest
//         .useFakeTimers('modern')
//         .setSystemTime(new Date('01-01-2001').getTime());
//     const tree = renderer.create(<WineReviewForm preloadedValues={testData} />).toJSON();
//     expect(tree).toMatchSnapshot();
// })

// cleanup

// TEST SUBMIT FUNCTION
// it("show the submitted review data", async () => {
//     // const onSubmit = jest.fn();
//     const onUpdate = jest.fn();
//     const { getByTestId } = render(<WineReviewForm preloadedValues={testData} onUpdate={onUpdate} />)

//     // const { getByTestId } = render(<WineReviewForm preloadedValues={testData} submitAction={onSubmit} />);
//     // const { getByTestId } = render(<WineReviewForm preloadedValues={testData} onUpdate={onUpdate} />)

//     // fireEvent.click(getByTestId('SubmitButton'));
//     fireEvent.click(getByTestId('UpdateButton'));

//     // expect(onSubmit).toBeCalled();
//     expect(onUpdate).toBeCalled();

//     // await waitFor(() => expect(onUpdate).toHaveBeenCalled());
// })

