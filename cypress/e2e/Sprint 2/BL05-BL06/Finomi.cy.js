/* eslint-disable no-undef */

describe('CP-018 Finomi', () => {
  it('Analysis: With data in wallet', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.FinomiPage()
    cy.GenerateAnalysis()
    cy.get('#text-message').should('be.visible')
  })
})

describe('CP-019 Finomi', () => {
  it('Analysis: Without data in wallet', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.FinomiPage()
    cy.get('#generate-button').should('be.disabled');
  })
})

describe('CP-020 Finomi', () => {
  it('Chat', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.FinomiPage()
    cy.GenerateChat('Hola!')
    cy.get('#text-message').should('be.visible')
  })
})

describe('CP-021 Finomi', () => {
  it('Chat: Without data in wallet', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.FinomiPage()
    cy.get('#chat-button').should('be.disabled')
  })
})

describe('CP-022 Finomi', () => {
  it('Chat: with insults', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.FinomiPage()
    cy.GenerateChat('Tonto!')
    cy.get('#text-message').should('be.visible')
  })
})

describe('CP-023 Finomi', () => {
  it('Chat: no message', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.FinomiPage()
    cy.GenerateChat('')
    cy.get('#text-message').should('be.visible')
  })
})

describe('CP-024 Finomi', () => {
  it('Chat: crazy message', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.FinomiPage()
    cy.GenerateChat('ahjdsadio')
    cy.get('#text-message').should('be.visible')
  })
})

describe('CP-025 Finomi', () => {
  it('Chat: +300 character message', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.FinomiPage()
    cy.GenerateChat('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at enim sem. Nullam vestibulum, est sit amet fringilla eleifend, nibh nulla scelerisque sem, vitae congue ipsum nisi et tellus. Proin semper nunc ex, sed blandit lacus egestas et. Quisque sed bibendum nibh. Fusce risus eros, aliquam a convallis eget, porta ac nibh. Curabitur mollis aliquet diam non finibus. Cras tincidunt sapien vel diam molestie consequat. Integer rutrum faucibus ipsum, eu sodales erat sodales sed. Curabitur est lectus, pellentesque sed gravida at, porttitor eget lectus. Ut et bibendum risus. Proin quis erat ipsum. Etiam congue tincidunt turpis quis blandit.Nullam in gravida augue. Aliquam dictum eros a velit lobortis auctor. Integer consequat risus ex. Phasellus sodales tellus quis sollicitudin laoreet. Ut commodo tincidunt enim, et convallis metus posuere eu. Vivamus vehicula euismod nulla in fermentum. Vivamus sed cursus nisl. Nunc non velit ut dolor iaculis suscipit iaculis eget turpis. Pellentesque vel maximus neque.Etiam euismod in orci quis blandit. Ut tincidunt non enim et mattis. Donec tincidunt porttitor venenatis. Sed vel lacus feugiat, facilisis libero quis, imperdiet ex. Ut ornare lacinia tortor, sed tincidunt odio sagittis ac. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam massa metus, dictum non ultrices non, pellentesque sed diam. Cras quis sagittis tellus, et ultricies velit. Nullam maximus nunc mollis ipsum rhoncus faucibus finibus quis est. Quisque quis odio vitae risus semper vehicula. Vivamus posuere mauris eu aliquam fringilla. Phasellus nunc lorem, congue non felis vel, sollicitudin suscipit sem. Maecenas iaculis ligula turpis, non dictum ligula efficitur et. Ut ut scelerisque augue. In quam urna, elementum sit amet eleifend nec, pretium nec nulla.Donec pellentesque iaculis enim eu porta. Curabitur varius dolor elit. Aliquam erat volutpat. Quisque viverra ut erat vitae efficitur. Nunc in pulvinar lacus. Nulla consectetur tellus ut metus ultricies, a ultrices dui ultricies. Ut fermentum ac risus.')
    cy.get('#text-message').should('be.visible')
  })
})

describe('CP-026 Finomi', () => {
  it('Chat: -2 character message', () => {
    cy.visit('http://localhost:5173/')
    cy.login('testing@mail.com', 'testing123')
    cy.FinomiPage()
    cy.GenerateChat('Lorem ipsum.')
    cy.get('#text-message').should('be.disabled')
  })
})
