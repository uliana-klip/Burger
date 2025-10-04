describe('конструктор бургера', () => {
  beforeEach(() => { cy.visit('http://localhost:5173/') })
  it('загрузка главной страницы', () => {
    cy.contains('Соберите бургер')
  })

  it('проверка DND и кнопки оформления заказа', () => {
    const dataTransfer = new DataTransfer()
    cy.intercept('POST', '**/api/orders', {
      statusCode: 200,
      body: { success: true, name: 'Test', order: { number: 4242 } },
    }).as('postOrder')
    cy.get('[data-testid="ingredient-card"]').first().trigger('dragstart', { dataTransfer })
    cy.get('[data-testid="burger-constructor"]').trigger('drop', { dataTransfer })
    cy.get('[data-testid="ingredient-card"]').eq(3).trigger('dragstart', { dataTransfer })
    cy.get('[data-testid="burger-constructor"]').trigger('drop', { dataTransfer })
    cy.get('[data-testid="burger-constructor"]').find('[class^="constructor-element"]').should('exist')
    cy.get('[data-testid="order-button"]').should('not.be.disabled')

    cy.get('[data-testid="order-button"]').click()
    cy.wait('@postOrder')
    cy.get('[data-testid="order-modal"]').should('exist')
    cy.get('[data-testid="order-modal"]').find('[data-testid="order-number"]').should('exist')
    cy.get('[data-testid="order-modal"]').contains('4242')
    cy.get('[data-testid="modal-close"]').should('exist')
    cy.get('[data-testid="modal-close"]').click()
    cy.visit('/')
    cy.get('[data-testid="order-modal"]').should('not.exist')

  })
  it('проверка открытия и закрытия модалки', () => {
    cy.get('[data-testid="ingredient-card"]').first().click()
    cy.get('[data-testid="ingredient-modal"]').should('exist')
    cy.get('[data-testid="ingredient-details-info"]').should('exist')
    cy.get('[data-testid="ingredient-details-name"]').should('exist')
    cy.get('[data-testid="ingredient-modal"]').find('[data-testid="modal-close"]').should('exist').click()
    cy.get('[data-testid="ingredient-modal"]').should('not.exist')
  })

})

