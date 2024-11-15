/* eslint-disable no-undef */

describe("CP-029 User Request", () => {
  it("dashboard with transactions", () => {
    cy.visit("http://localhost:5173/");
    cy.login("testing@mail.com", "testing123");
    cy.OpenUserMenu("user-request-button");
    cy.wait(800);
    cy.get("#empty-message").should(
      "contain",
      "No tienes solicitudes pendientes"
    );
  });
});

describe("CP-030 User Request", () => {
  it("Request: write a request", () => {
    cy.visit("http://localhost:5173/");
    cy.login("testing@mail.com", "testing123");
    cy.OpenUserMenu("user-request-button");
    cy.wait(800);
    cy.CreateRequest(
      "Añadir imagen para los usuarios",
      "Sería bueno que los usuarios puedan tener una imagen para mayor personalización"
    );
  });
});

describe("CP-031 User Request", () => {
  it("Request: write a request", () => {
    cy.visit("http://localhost:5173/");
    cy.login("testing@mail.com", "testing123");
    cy.OpenUserMenu("user-request-button");
    cy.wait(800);
    cy.CreateRequest("", "");
    cy.contains("El título es obligatorio").should("be.visible");
    cy.contains("La descripción es obligatoria").should("be.visible");
  });
});

describe("CP-032 User Request", () => {
  it("Request: Empty title", () => {
    cy.visit("http://localhost:5173/");
    cy.login("testing@mail.com", "testing123");
    cy.OpenUserMenu("user-request-button");
    cy.wait(800);
    cy.CreateRequest(
      "",
      "Sería bueno que los usuarios puedan tener una imagen para mayor personalización"
    );
    cy.contains("El título es obligatorio").should("be.visible");
  });
});

describe("CP-033 User Request", () => {
  it("Request: Empty description", () => {
    cy.visit("http://localhost:5173/");
    cy.login("testing@mail.com", "testing123");
    cy.OpenUserMenu("user-request-button");
    cy.wait(800);
    cy.CreateRequest("Añadir imagen para los usuarios", "");
    cy.contains("La descripción es obligatoria").should("be.visible");
  });
});

describe("CP-034 User Request", () => {
  it("View requests", () => {
    cy.visit("http://localhost:5173/");
    cy.login("testing@mail.com", "testing123");
    cy.OpenUserMenu("user-request-button");
    cy.wait(800);
    cy.get("#requests-list").should("be.visible");
  });
});

describe("CP-035 User Request", () => {
  it("View requests description", () => {
    cy.visit("http://localhost:5173/");
    cy.login("testing@mail.com", "testing123");
    cy.OpenUserMenu("user-request-button");
    cy.wait(800);
    cy.get("#card-description").should("be.visible");
  });
});

describe("CP-036 User Request", () => {
  it("View state description", () => {
    cy.visit("http://localhost:5173/");
    cy.login("testing@mail.com", "testing123");
    cy.OpenUserMenu("user-request-button");
    cy.wait(800);
    cy.get("#card-state").should("be.visible");
  });
});

describe("CP-037 User Request: Admin", () => {
  it("request from all users", () => {
    cy.visit("http://localhost:5173/");
    cy.login("admin@finomi.com", "admin123");
    cy.OpenUserMenu("see-user-requests");
    cy.wait(800);
    cy.get("#requests-list").should("be.visible");
  });
});

describe("CP-038 User Request: Admin", () => {
  it("Response a user request", () => {
    cy.visit("http://localhost:5173/");
    cy.login("admin@finomi.com", "admin123");
    cy.OpenUserMenu("see-user-requests");
    cy.wait(800);
    cy.ResponseRequest(
      "Estaremos trabajando en implementar esta nueva funcionalidad, gracias por tus comentarios!"
    );
    cy.get("#requests-list").should("be.visible");
  });
});

describe('CP-039 User Request: Admin', () => {
  it('Response a user request', () => {
    cy.visit('http://localhost:5173/')
    cy.login('admin@finomi.com', 'admin123')
    cy.OpenUserMenu('see-user-requests')
    cy.wait(800)
    cy.ResponseRequest('')
    cy.contains('La respuesta es obligatoria').should('be.visible')
  })
})

describe("CP-040 User Request", () => {
  it("View a admin response", () => {
    cy.visit("http://localhost:5173/");
    cy.login("testing@mail.com", "testing123");
    cy.OpenUserMenu("user-request-button");
    cy.wait(800);
    cy.get("#card-state").should("be.visible", "Finalizada");
  });
});
