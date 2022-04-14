import {rest} from "msw";
import {setupServer} from "msw/node";
import { renderHook, act } from '@testing-library/react-hooks'
import useCart from "../../hooks/useCart";

jest.setTimeout(15000)

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
                ]}))}),
    // remove
    );

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

    test("load cart", async () => {
        const {result} = renderHook(() => useCart());
        const {loading, loadCart} = result.current;
        expect(loading).toEqual(true);
        await act(async () => {
            await loadCart()
        });
        const {products} = result.current;
        console.log(products);
    });

    test("remove product", async () => 
    {
        const {result} = renderHook(() => useCart());
        const {loading, loadCart, removeToCart} = result.current;
        expect(loading).toEqual(true);
        await act(async () => {
            await loadCart()
        });
        const {products} = result.current;
        console.log(products);
        await act(async () => {
            await removeToCart(
            {
                id: 15,
                name: 'Alien Rick',
                price: '20',
                quantity: 20,
                image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg'
            }).then((data) => {
                expect(data).toBe(true);
            });
        });
    });

    //Test remove all products
    test("remove all product", async () => {
        const {result} = renderHook(() => useCart());
        const {loading, loadCart, removeAllToCart} = result.current;
        expect(loading).toEqual(true);
        await act(async () => {
            await loadCart()
        });
        const {products} = result.current;
        console.log(products);
        await act(async () => {
            await removeAllToCart().then((data) => {
                expect(data).toBe(true);
            });
        });
    });

