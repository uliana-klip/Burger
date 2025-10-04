// describe('Vitest matchers cheat-sheet', () => {
//     it('toBe — строгая проверка (===)', () => {
//         expect(2 + 2).toBe(4);
//         // expect(2 + 2).toBe('4'); // ❌ упадёт, потому что число !== строка
//     });

//     it('toEqual — глубокое сравнение объектов/массивов', () => {
//         expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
//         expect([1, 2, 3]).toEqual([1, 2, 3]);
//     });

//     it('toBeNull / toBeUndefined', () => {
//         expect(null).toBeNull();
//         expect(undefined).toBeUndefined();
//     });

//     it('toBeTruthy / toBeFalsy', () => {
//         expect(1).toBeTruthy();   // любое "истинное" значение
//         expect(0).toBeFalsy();    // любое "ложное" значение
//     });

//     it('toContain — проверка на вхождение', () => {
//         expect([1, 2, 3]).toContain(2);
//         expect('burger').toContain('bur');
//     });

//     it('toHaveLength — длина массива или строки', () => {
//         expect([1, 2, 3]).toHaveLength(3);
//         expect('test').toHaveLength(4);
//     });

//     it('toBeGreaterThan / toBeLessThan', () => {
//         expect(10).toBeGreaterThan(5);
//         expect(5).toBeLessThan(10);
//     });

//     it('not — отрицание', () => {
//         expect(5).not.toBe(6);
//         expect([1, 2]).not.toContain(3);
//     });
// });

/*
npx cypress open
Cypress cheat-sheet:

1. Навигация:
   cy.visit('url')            — открыть страницу
   cy.url().should(...)       — проверить адрес
   cy.reload()                — перезагрузить страницу

2. Поиск элементов:
   cy.get('selector')         — найти элемент по селектору
   cy.contains('text')        — найти элемент по тексту
   cy.find('selector')        — найти внутри другого элемента

3. Действия:
   cy.click()                 — клик
   cy.type('text')            — ввод текста
   cy.clear()                 — очистить поле
   cy.select('value')         — выбрать из select

4. Проверки:
   should('be.visible')       — элемент виден
   should('exist')            — элемент существует
   should('contain', text)    — содержит текст
   should('have.length', n)   — количество элементов
   should('have.text', text)  — точное совпадение текста

5. Ожидания:
   cy.wait(ms)                — подождать
   .should(...)               — подождать, пока условие выполнится

6. Прочее:
   cy.log('message')          — вывести сообщение в лог
   cy.screenshot()            — сделать скриншот
*/
