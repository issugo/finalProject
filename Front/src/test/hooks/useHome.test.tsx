/* eslint-disable jest/valid-expect-in-promise */
import {rest} from "msw";
import {setupServer} from "msw/node";
import { renderHook, act } from '@testing-library/react-hooks'
import useHome from "../../hooks/useHome";
import { render } from "@testing-library/react";

const server = setupServer(
    rest.post(
        "http://localhost:8000/api/products",
        (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        id: 3,
                        name: 'Alien Morty',
                        price: '20',
                        quantity: 1,
                        image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
                    },
                    {
                        id: 4,
                        name: 'Alien Rick',
                        price: '10',
                        quantity: 20,
                        image: 'https://rickandmortyapi.com/api/character/avatar/13.jpeg'
                    }
                ])
        )}
    )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("useHome", async () => {
    const {result} = renderHook(() => useHome())
    const {loading, products, loadProducts} = result.current;
    loadProducts().then((data) => {
        expect(data).toBe(true);
        expect(loading).toBe(false);
        expect(products.length).toEqual(2);
        expect(products[0].id).toEqual(3);
        expect(products[1].id).toEqual(4);
    })
})