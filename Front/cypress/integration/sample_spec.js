// describe("add Product", () => {
//     it("Test addProduct", () => {
//         cy.visit("http://localhost:3000/");
//         cy.wait(10000);
//         cy.get('img').should('have.length', 20)
//             .then(($img) => {
//                 const items = $img.toArray()
//                 return Cypress._.sample(items)
//             })
//             .click();
//         cy.get('input')
//             .type('{selectall}{backspace}{1}');
//         cy.get('button').contains("Ajouter au panier").click(); 
//         cy.wait(15000)
//         cy.get('p').then(($p) => {
//             if ($p.text().includes('Enregistré dans le panier')) {
//             } else {
//                 cy.contains('Trop de quantité').should('exist');
//             }
//           })
//     });
// });

// describe("remove Product from cart", () => {
//     it("Test removeProduct", () => {
//         cy.visit("http://localhost:3000/");
//         cy.wait(10000);
//         cy.get('div').contains('Aller sur panier').click();
//         cy.wait(10000);
//         const count = cy.get('button').contains('Supprimer du panier').its('length')
//         cy.log(Object.keys(count));
//         cy.get('button').contains('Supprimer du panier').then(($button) => {
//             const items = $button.toArray()
//             return Cypress._.sample(items)
//         })
//         .click();
//         cy.wait(15000)
//         cy.get('p').contains('Produit bien supprimé').should('exist');
//         cy.get('button').contains('Supprimer du panier').its('length').should('equal', count - 1)
//     });
// });