describe("add Product", () => {
    it("Test addProduct", () => {
        cy.intercept({
            method: "POST",
            url:'http://localhost:8000/api/cart/*'
        },[
            {
                id: 14,
                name: 'Alien Morty',
                price: '20',
                quantity: 10,
                image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
            }
        ]
        ).as('postProduct');

        cy.intercept({
            method: 'GET',
            url: 'http://localhost:8000/api/products',
            },[
                {
                    id: 14,
                    name: 'Alien Morty',
                    price: '20',
                    quantity: 10,
                    image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
                },
                {
                    id: 15,
                    name: 'Alien Rick',
                    price: '10',
                    quantity: 20,
                    image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg'
                },
                {
                    id: 1,
                    name: 'Rick',
                    price: '1',
                    quantity: 1,
                    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
                },
                {
                    id: 2,
                    name: 'Morty',
                    price: '10',
                    quantity: 5,
                    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
                }
            ]
        ).as('getProducts');

        cy.visit("http://localhost:3000/");
        cy.wait(['@getProducts'])
        cy.get('img').should('have.length', 4)
            .then(($img) => {
                const items = $img.toArray()
                return Cypress._.sample(items)
            })
            .click();
        cy.get('input')
            .type('{selectall}{backspace}{1}');
        cy.get('button').contains("Ajouter au panier").click(); 
        cy.wait(['@postProduct'])
        cy.get('p').then(($p) => {
            if ($p.text().includes('Enregistré dans le panier')) {
                cy.log('Product added to cart')
            } else {
                cy.contains('Trop de quantité').should('exist');
            }
          })
    });
});

describe("remove Product from cart", () => {
    it("Test removeProduct", () => {
        let interceptCount = 0;

        cy.intercept({
            method: "GET",
            url:'http://localhost:8000/api/cart'
        }, (req) => {
            req.reply(res => {
                if (interceptCount === 0 ) {
                    interceptCount += 1;
                    res.send({ products: [
                        {
                            id: 14,
                            name: 'Alien Morty',
                            price: '20',
                            quantity: 10,
                            image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
                        }
                    ] })
                } else {
                    res.send({ products: [
                    ] })
                }
            });
        }).as('getCartProducts');

        cy.intercept({
            method: 'GET',
            url: 'http://localhost:8000/api/products',
            },[
                {
                    id: 14,
                    name: 'Alien Morty',
                    price: '20',
                    quantity: 10,
                    image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
                },
                {
                    id: 15,
                    name: 'Alien Rick',
                    price: '10',
                    quantity: 20,
                    image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg'
                },
                {
                    id: 1,
                    name: 'Rick',
                    price: '1',
                    quantity: 1,
                    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
                },
                {
                    id: 2,
                    name: 'Morty',
                    price: '10',
                    quantity: 5,
                    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
                }
            ]
        ).as('getProducts');

        cy.intercept({
            method: "DELETE",
            url:'http://localhost:8000/api/cart/14'
        },
        {
            products: [
                {
                    id: 14,
                    name: 'Alien Morty',
                    price: '20',
                    quantity: 10,
                    image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg'
                }
            ]
        }
        ).as('deleteCartProduct');

        cy.visit("http://localhost:3000/");
        cy.wait(['@getProducts'])
        cy.get('div').contains('Aller sur panier').click();
        cy.wait(['@getCartProducts'])
        cy.get('.App').then(($div) => {
            if ($div.find('button').length === 0) {
                throw new Error("No product in cart --> Test failed")
            } else {
                cy.log($div.find('button').length)
            };
        });
        const $count = cy.get('.App').find('button');
        cy.log($count)
        let counter;
        cy.get('.App').then(($div) => {
            counter = $div.find('button').length;
        });
        cy.get('button').contains('Supprimer du panier').then(($button) => {
            const items = $button.toArray()
            return Cypress._.sample(items)
        })
        .click();
        cy.wait(['@deleteCartProduct'])
        cy.wait(['@getCartProducts'])
        cy.get('p').contains('Produit bien supprimé').should('exist');
        cy.get('.App').then(($div) => {
            if ($div.find('button').length === 0) {
                cy.log('Panier vide').end();
            } else {
                cy.get('.App').find('button').should('have.length', counter - 1)
            };
        });
    });
});