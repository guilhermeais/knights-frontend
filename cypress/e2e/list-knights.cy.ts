import { makeGetKnightsResponse, makeSimpleKnight } from "../mocks/knight.mock";

const elements = {
  emptyKnightsFeedback: () => cy.get("#no-knights"),
  knightCards: () => cy.get("[id^='knight-card']"),
  loadMoreButton: () => cy.get("#load-more"),
};

const BASE_API_URL = Cypress.env("NUXT_KNIGHTS_API");
describe("List Knights", () => {
  it('should see "Nenhum guerreiro encontrado 🍃" when has any knights', () => {
    cy.intercept("GET", `${BASE_API_URL}/knights*`, {
      statusCode: 200,
      body: {
        data: [],
        totalPages: 0,
        nextPage: null,
        page: 1,
      },
    }).as("getKnights");

    cy.visit("/");
    cy.wait("@getKnights");
    elements
      .emptyKnightsFeedback()
      .should("be.visible")
      .and("contain.text", "Nenhum guerreiro encontrado 🍃");
  });

  it("should list all knights", () => {
    const mockedResponse = makeGetKnightsResponse();
    cy.intercept("GET", `${BASE_API_URL}/knights*`, {
      statusCode: 200,
      body: mockedResponse,
    }).as("getKnights");

    cy.visit("/");
    cy.wait("@getKnights");

    const knights = mockedResponse.data;
    elements.knightCards().should("have.length", knights.length);
  });

  it("should paginated if there is next page", () => {
    const firstResponse = makeGetKnightsResponse({
      nextPage: 2,
      page: 1,
      totalPages: 2,
      data: Array.from({ length: 10 }, () => makeSimpleKnight()),
      total: 20,
    });
    const secondResponse = makeGetKnightsResponse({
      data: Array.from({ length: 10 }, () => makeSimpleKnight()),
      page: 2,
      total: 20,
      totalPages: 2,
    });

    cy.intercept("GET", `${BASE_API_URL}/knights*`, {
      statusCode: 200,
      body: firstResponse,
    }).as("getKnights");

    cy.visit("/");
    cy.wait("@getKnights");

    const knights = firstResponse.data;
    elements.knightCards().should("have.length", knights.length);

    cy.intercept("GET", `${BASE_API_URL}/knights*`, {
      statusCode: 200,
      body: secondResponse,
    }).as("getKnights2");

    elements.loadMoreButton().should("be.visible").click({
      force: true,
    });

    cy.wait("@getKnights2");

    const allKnights = [...firstResponse.data, ...secondResponse.data];

    elements.knightCards().should("have.length", allKnights.length);
    elements.loadMoreButton().should("not.exist");
  });
});
