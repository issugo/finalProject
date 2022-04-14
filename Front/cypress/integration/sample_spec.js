describe("add Product", () => {
    it("Test addProduct", () => {
        cy.visit("http://localhost:3000/");
        cy.wait(10000);
        cy.get('img').should('have.length', 20)
            .then(($img) => {
                const items = $img.toArray()
                return Cypress._.sample(items)
            })
            .click();
        cy.get('input')
            .type('{selectall}{backspace}{1}');
        cy.get('button').contains("Ajouter au panier").click(); 
        cy.wait(10000)
        cy.get('p').then(($p) => {
            if ($p.text().includes('Enregistré dans le panier')) {
            } else {
                cy.contains('Trop de quantité').should('exist');
            }
          })
    });
});