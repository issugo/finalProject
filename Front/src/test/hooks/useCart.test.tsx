/* eslint-disable jest/valid-expect-in-promise */
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
                            id: 14,
                            name: 'Alien Morty',
                            price: '20',
                            quantity: 20,
                            image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
                        }
                    ]
                })
            )
        }),

        rest.delete(
            "http://localhost:8000/api/cart/13",
            (req, res, ctx) => {
                return res(
                    ctx.json({
                        products: [
                            {
                            	id: 13,
                            	name: 'Alien Goohah',
                            	price: '13',
                            	quantity: 10,
                            	image: 'https://rickandmortyapi.com/api/character/avatar/13.jpeg'
                            },
                        ]
                    })
                )
            }
        )    
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

    test("load cart", async () => {
        const {result} = renderHook(() => useCart());
        const {loading, loadCart, message, products} = result.current;
        expect(loading).toBe(true);
        expect(message).toBe(null);
        loadCart().then((data) =>  {
            expect(data).toBe(true);
            expect(message).toBe(null);
            expect(products.length).toEqual(3);
            expect(products[0]).toEqual({
                id: 3,
                name: 'Summer Smith',
                price: '15',
                quantity: 5,
                image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'})
        })
    });

    test("remove product from cart", async () => 
    {
        const {result} = renderHook(() => useCart());
        const {loading, removeToCart, message} = result.current;
        expect(loading).toEqual(true);
        removeToCart({
            id: 13,
            name: 'Alien Goohah',
            price: '13',
            quantity: 10,
            image: 'https://rickandmortyapi.com/api/character/avatar/13.jpeg'
        }).then((data) => {
            expect(data).toBe(true);
            expect(message).toEqual("Produit bien supprimé");
            expect(loading).toBe(false);
        })
    });

