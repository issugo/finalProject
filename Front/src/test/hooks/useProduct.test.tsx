/* eslint-disable jest/valid-expect-in-promise */
import {rest} from "msw";
import {setupServer} from "msw/node";
import { renderHook, act } from '@testing-library/react-hooks'
import useProduct from "../../hooks/useProduct";

jest.setTimeout(15000)

const server = setupServer(
    rest.post(
        "http://localhost:8000/api/cart/3",
        (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        id: 3,
                        name: 'Alien Morty',
                        price: '20',
                        quantity: 1,
                        image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
                    }
                ])
        )}
    ),
    rest.get(
        "http://localhost:8000/api/cart/3",
        (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        id: 3,
                        name: 'Alien Morty',
                        price: '20',
                        quantity: 1,
                        image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
                    }
                ])
        )}
    ),
    rest.put(
        "http://localhost:8000/api/cart/3",
        (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        id: 3,
                        name: 'Alien Morty',
                        price: '20',
                        quantity: 10,
                        image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
                    }
                ])
        )}
    ),
    rest.delete(
        "http://localhost:8000/api/cart/3",
        (req, res, ctx) => {
            return res(
                ctx.json([

                ])
        )}
    )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

    test("add product", async () =>
    {
        const {result} = renderHook(() => useProduct({
            id: 3,
            name: 'Alien Morty',
            price: '10',
            quantity: 1,
            image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
        }));
        const {loading, addProduct, message} = result.current;
        expect(loading).toEqual(false);
        act(() => {
            addProduct().then((data) => {
            expect(data).toBe(true);
            expect(message).toEqual("Enregistré dans le panier")
            })
        })
    });

    test("remove product", async () =>
    {
        const {result} = renderHook(() => useProduct({
            id: 3,
            name: 'Alien Morty',
            price: '10',
            quantity: 1,
            image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
        }));
        const {loading, removeProduct, message} = result.current;
        expect(loading).toEqual(false);
        act(() => {
            removeProduct().then((data) => {
            expect(data).toBe(true);
            expect(message).toEqual("Produit supprimé du panier")
            })
        })
    });

    test("update product", async () =>
    {
        const {result} = renderHook(() => useProduct({
            id: 3,
            name: 'Alien Morty',
            price: '10',
            quantity: 10,
            image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
        }));
        const {loading, modifyProduct, message} = result.current;
        expect(loading).toEqual(false);
        act(() => {
            modifyProduct().then((data) => {
            expect(data).toBe(true);
            expect(message).toEqual("Produit modifié dans le panier")
            })
        })
    });

    test("load product", async () =>
    {
        const {result} = renderHook(() => useProduct({
            id: 3,
            name: 'Alien Morty',
            price: '10',
            quantity: 10,
            image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
        }));
        const {loading, loadProduct, message} = result.current;
        expect(loading).toEqual(false);
        act(() => {
            loadProduct().then((data) => {
            expect(data).toBe(true);
            expect(message).toEqual(result.current.quantity)
            })
        })
    });





