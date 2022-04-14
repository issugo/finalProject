import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Cart from "./components/Cart";
import Home from "./components/Home";
import Product from "./components/Product";
import ReactDOM from "react-dom";

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

//test functionnal for Cart component

test('cart functionnal', () => {
    ReactDOM.render(<Cart setRoute={function (data: any): void {
      throw new Error('Function not implemented.');
    } }/>, container);
});

//test functionnal for Home component
test('home functionnal', () => {
    ReactDOM.render(<Home setRoute={function (data: any): void {
      throw new Error('Function not implemented.');
    } }/>, container);
});

//test functionnal for Product component
test('product functionnal', () => {
    ReactDOM.render(<Product setRoute={function (data: any): void {
      throw new Error('Function not implemented.');
    } }/>, container);
});


