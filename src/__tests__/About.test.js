import React from 'react';
import ReactDOM from 'react-dom';
import {About} from '../components/About';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<About/>, div)
});

it("renders page correctly", () => {
    const {getByTestId} = render(<About/>)
    expect(getByTestId('About')).toHaveTextContent("About WineJS")
});

it("matches snapshot", () => {
    const tree = renderer.create(<About/>).toJSON();
    expect(tree).toMatchSnapshot();
})
