describe("this is a block of tests", function () {

    beforeEach(function() {
        cy.visit("localhost:3000")
    });

    it("checking step 2 instructions", function () {

        cy.get('input[name = "name"]') //type and check name
        .type("Victoria")
        .should("have.value", "Victoria");

        cy.get('input[name = "email"]') //type and check email that FAILS
        .type("victoria");

        cy.get("[data-cy = errorEmail]")
        .its('length')
        .should('be.gt', 0)

        cy.get('input[name = "email"]') //type and check email that passes
        .type("@gmail.com")
        .should("have.value", "victoria@gmail.com");

        cy.get('input[name = "password"]') //type and check password
        .type("hellothere")
        .should("have.value", "hellothere");

        cy.get('input[name = "terms"]') //type and check the checkbox
        .check()
        .should("be.checked", "true");

        cy.get("button") //submits data
        .should("not.be.disabled")
        .click();
        
    })
})