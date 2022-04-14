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
        addProduct().then((data) => {
            expect(data).toBe(true);
            expect(message).toEqual("Enregistré dans le panier")
        })
        
    });

    //add all tests

    test("remove product", async () =>
    {
        const {result} = renderHook(() => useProduct(3));
        const {loading, removeProduct} = result.current;
        expect(loading).toEqual(true);
        act(() => {
            removeProduct()

        });
    });

    test("update product", async () =>
    {
        const {result} = renderHook(() => useProduct(3));
        const {loading, modifyProduct} = result.current;
        expect(loading).toEqual(true);
        await act(async () => {
            await modifyProduct()
        });
    });

    test("load product", async () =>
    {
        const {result} = renderHook(() => useProduct(3));
        const {loading, loadProduct} = result.current;
        expect(loading).toEqual(true);
        await act(async () => {
            await loadProduct()
        });
    });





