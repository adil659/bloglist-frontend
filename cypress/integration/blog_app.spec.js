

describe('Blog app', function () {

    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })

    describe('Before logged in', function () {
        it('displays login form by default', function () {
            cy.contains('username')
            cy.contains('password')
        })

        it('Successful login attempt', function () {
            cy.request('POST', 'http://localhost:3001/api/testing/reset')
            const newUser = {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }

            cy.request('POST', 'http://localhost:3001/api/users/', newUser)

            cy.get('#username_input').type('mluukkai')
            cy.get('#password_input').type('salainen')
            cy.get('#login_button').click()
            cy.contains('Matti Luukkainen logged-in')
        })

        it('Unsuccessful login attempt', function () {

            cy.get('#username_input').type('mluukkai')
            cy.get('#password_input').type('wrong')
            cy.get('#login_button').click()

            cy.contains('Wrong credentials')
        })

        describe('after logged in', function() {
            beforeEach(function () {
                cy.request('POST', 'http://localhost:3001/api/testing/reset')
                const newUser = {
                    name: 'Matti Luukkainen',
                    username: 'mluukkai',
                    password: 'salainen'
                }
    
                cy.request('POST', 'http://localhost:3001/api/users/', newUser)
    
                cy.request('POST', 'http://localhost:3001/api/login', {
                    username: 'mluukkai', password: 'salainen'
                }).then(response => {
                    localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
                    cy.visit('http://localhost:3000')
                })
            })

            it('A blog can be created', function() {
                cy.get('#title').type('Harry Potter')
                cy.get('#author').type('JK Rowling')
                cy.get('#url').type('www.harrypotter.com')

                cy.contains('save').click()
                cy.contains('Harry Potter JK Rowling')
              })

              it('A blog can be liked', function() {
                cy.get('#title').type('Harry Potter')
                cy.get('#author').type('JK Rowling')
                cy.get('#url').type('www.harrypotter.com')

                cy.contains('save').click()

                cy.contains('view').click()
                cy.contains('0')
                cy.contains('like').click()
                cy.contains('1')

              })

              it('A blog can be deleted', function() {
                cy.get('#title').type('Harry Potter')
                cy.get('#author').type('JK Rowling')
                cy.get('#url').type('www.harrypotter.com')

                cy.contains('save').click()

                cy.contains('view').click()
                cy.contains('delete').click()
                cy.get('#all-blogs').should('not.have.value', 'Harry Potter JK Rowling')
              })

              it('Blogs are ordered', function() {
                cy.get('#title').type('Harry Potter')
                cy.get('#author').type('JK Rowling')
                cy.get('#url').type('www.harrypotter.com')

                cy.contains('save').click()

                cy.contains('new blog').click()

                cy.get('#title').type('Skullduggery Pleasant')
                cy.get('#author').type('Joe Billy')
                cy.get('#url').type('www.skullcandy.com')
                cy.contains('save').click()

                cy.contains('Skullduggery Pleasant Joe Billy').contains('view').click()
                cy.contains('like').click()
                cy.contains('like').click()
                console.log(cy.get('.blog:first'))
                cy.get('.blog:first').contains('Skullduggery Pleasant Joe Billy')

              })
        })
    })




})