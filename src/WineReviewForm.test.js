import React from 'react';
import ReactDOM from 'react-dom';
import WineReviewForm from './WineReviewForm';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

// afterEach(cleanup)

// "Review" Type (Brand new review, not filling in past review data.
jest.mock("react-router-dom", ()  => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/review"
    })
}));

it("renders without crashing - Review Type", () => {
    const div = document.createElement("div");
    ReactDOM.render(<WineReviewForm></WineReviewForm>, div)
});

it("renders page correctly", () => {
    const {getByTestId} = render(<WineReviewForm></WineReviewForm>)
    expect(getByTestId('FullReview')).toHaveTextContent("Nose Intensity")
});

it("matches snapshot", () => {
    const tree = renderer.create(<WineReviewForm/>).toJSON();
    expect(tree).toMatchSnapshot();
})


// "ReviewResult" Type (Load existing data into form)
// cleanup
jest.mock("react-router-dom", ()  => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/reviewresult"
    })
}));

it("renders without crashing - Review Type", () => {
    const div = document.createElement("div2");
    ReactDOM.render(<WineReviewForm></WineReviewForm>, div)
});

it("renders page correctly", () => {
    const {getByTestId} = render(<WineReviewForm></WineReviewForm>)
    expect(getByTestId('FullReview')).toHaveTextContent("Balance")
});

it("matches snapshot 2", () => {
    const tree = renderer.create(<WineReviewForm/>).toJSON();
    expect(tree).toMatchSnapshot();
})
