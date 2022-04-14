import {rest} from "msw";
import {setupServer} from "msw/node";
import { renderHook, act } from '@testing-library/react-hooks'
import useProduct from "../../hooks/useProduct";

const server = setupServer(
    rest.get(
        "http://localhost:8000/api/cart/3",
        (req, res, ctx) => {
            return res(
                //Create mock of products
                ctx.json([
                    {
                        id: 3,
                        name: 'Alien Morty',
                        price: '10',
                        quantity: 15,
                        image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
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

    test("remove product", async () =>
    {
        const {result} = renderHook(() => useProduct(3));
        const {loading, removeProduct} = result.current;
        expect(loading).toEqual(false);
        await act(async () => {
            await removeProduct()
        });
    });

    test("update product", async () =>
    {
        const {result} = renderHook(() => useProduct(3));
        const {loading, modifyProduct} = result.current;
        expect(loading).toEqual(false);
        await act(async () => {
            await modifyProduct()
        });
    });

    test("load product", async () =>
    {
        const {result} = renderHook(() => useProduct(3));
        const {loading, loadProduct} = result.current;
        expect(loading).toEqual(false);
        await act(async () => {
            await loadProduct()
        });
    });





