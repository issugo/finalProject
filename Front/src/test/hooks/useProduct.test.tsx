import {rest} from "msw";
import {setupServer} from "msw/node";
import { renderHook, act } from '@testing-library/react-hooks'
import useProduct from "../../hooks/useProduct";

const server = setupServer(
    rest.get(
        "http://localhost:8000/api/products",
        (req, res, ctx) => {
            return res(
                //Create mock of products
                ctx.json([
                    {
                        id: 1,
                        name: 'Rick',
                        price: '20',
                        quantity: 5,
                        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
                    },
                    {
                        id: 2,
                        name: 'Alien',
                        price: '5',
                        quantity: 25,
                        image: 'https://rickandmortyapi.com/api/character/avatar/13.jpeg'
                    },
                    {
                        id: 3,
                        name: 'Alien Morty',
                        price: '10',
                        quantity: 15,
                        image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
                    },
                    {
                        id: 4,
                        name: 'Summer Smith',
                        price: '15',
                        quantity: 5,
                        image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg'
                    },
                    {
                        id: 5,
                        name: 'Alien Rick',
                        price: '20',
                        quantity: 20,
                        image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg'
                    },
                ]));
        }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

    test("add product", async () =>
    {
        const {result} = renderHook(() => useProduct(3));
        const {loading, addProduct} = result.current;
        expect(loading).toEqual(false);
        await act(async () => {
            await addProduct()
        });
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





