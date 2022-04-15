import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Cart from "./components/Cart";
import Home from "./components/Home";
import Product from "./components/Product";
import ReactDOM from "react-dom";
import {rest} from "msw";
import {setupServer} from "msw/node";
import { act } from 'react-dom/test-utils';

let container: any;

const server = setupServer(
  rest.get(
      "http://localhost:8000/api/cart",
      (req, res, ctx) => {
          return res(
              ctx.json({
                  products: [
                      {
                          id: 3,
                          name: 'Summer Smith',
                          price: '15',
                          quantity: 5,
                          image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
                      },
                      {
                          id: 13,
                          name: 'Alien Goohah',
                          price: '13',
                          quantity: 10,
                          image: 'https://rickandmortyapi.com/api/character/avatar/13.jpeg'
                      },
                      {
                          id: 15,
                          name: 'Alien Rick',
                          price: '20',
                          quantity: 20,
                          image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg'
                      }
                  ]
              })
          )
      }),
);

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

//test functionnal for Product component
test('product functionnal', () => {
  ReactDOM.render(<Product setRoute={function (data: any): void {
    throw new Error('Function not implemented.');
  } } data={{id: 13, name: "Alien Rick", image: "voila.png", quantity: 20, price: "20"}} />, container);

  expect(screen.getByTestId("name").textContent).toEqual("Figurine de Alien Rick");
  expect(screen.getByTestId("quantity").textContent).toEqual("Quantitée 20");
});

//test functionnal for Cart component
test('cart functionnal', async () => {
  await act(async () => {await ReactDOM.render(<Cart setRoute={function (data: any): void {throw new Error('Function not implemented.');} }/>, container)});
  expect(screen.getByText("Loading....")).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText("Data")));

  expect(screen.getAllByTestId("name").length).toEqual(4);
  expect(screen.getAllByTestId("quantity").length).toEqual(4);
});

//test functionnal for Home component
test('home functionnal', () => {
    ReactDOM.render(<Home setRoute={function (data: any): void {
      throw new Error('Function not implemented.');
    } }/>, container);
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


