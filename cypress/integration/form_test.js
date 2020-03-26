describe("this is a block of tests", function () {

    beforeEach(function() {
        cy.visit("localhost:3000")
    });

    it("checking step 2 instructions", function () {

        cy.get('input[name = "name"]')
        .type("Victoria");
    })
})