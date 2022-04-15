import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import Cart from "./components/Cart";
import Home from "./components/Home";
import Product from "./components/Product";
import ReactDOM from "react-dom";
import { wait } from '@testing-library/user-event/dist/utils';

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

//test functionnal for Cart component
test('cart functionnal', async () => {
    ReactDOM.render(<Cart setRoute={function (data: any): void {
      throw new Error('Function not implemented.');
    } }/>, container);

    expect(screen.getByText("Loading....")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("Figurine de")).toBeInTheDocument())

    expect(screen.getAllByTestId("name").length).toEqual(20);
    expect(screen.getAllByTestId("quantity").length).toEqual(20);
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
    } } data={{id: 13, name: "Alien Rick", image: "voila.png", quantity: 20, price: "20"}} />, container);

    expect(screen.getByTestId("name").textContent).toEqual("Figurine de Alien Rick");
    expect(screen.getByTestId("quantity").textContent).toEqual("Quantitée 20");
});

// //test functionnal for App component
// test('app functionnal', () => {
//     ReactDOM.render(<App />, container);
// });

// //test functionnal for App component routes
// test('app functionnal routes', () => {
//     ReactDOM.render(<App />, container);
//     const home = screen.getByText(/home/i);
//     const product = screen.getByText(/product/i);
//     const cart = screen.getByText(/cart/i);
//     expect(home).toBeInTheDocument();
//     expect(product).toBeInTheDocument();
//     expect(cart).toBeInTheDocument();
// });


