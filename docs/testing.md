# Testing

## Types of tests

### Unit tests

Pure logic functions should be covered with comprehensive unit tests. Consider happy paths and error cases.
There is no need to test for invalid argument types or values - these should be handled by the type system.
For more complex functions, for instance a React Router action function, you can mock dependencies like the database via mock repositories.

### Visual tests

Components should have visual tests to ensure correct rendering. Cover rendering any visual state the component can be in.
If it is only possible to get a component into a certain state with interaction, then that interaction should be tested in a storybook play function.
Prefer receiving props to a component to determine its state **if** those props won't make for a worse component design. This will keep tests faster and focused on the component's visual state.
Visual tests should also check for accessibility concerns, for instance that form controls are labelled, and errors are programmatically associated with the correct form control.

### Component interaction tests

These can be built using Storybook play functions, or using vitest browser mode. If there are many variations of particular interactions, then it may be better to use vitest browser mode to avoid cluttering up the storybook ui. Particularly if the end visual state of the component is not relevant to the test or is the same for multiple variations.
Some components may need to interact with the React Router framework. For instance, a `<Form>` component may trigger a route action or a redirect navigation. In those cases you may need to create a stub test environment with mock actions. Or those tests could be written as end to end tests instead.
When we migrate to React Server Components and server functions, it may be possible for a form to receive an action prop, and then pass a mock action to the form to simplify writing these kinds of tests.

### End to end tests

These test the full application including the server and database. All major workflows should have their happy path tested in an end to end test. Significant error paths should also be tested. End to end tests are slow though, so they should not be used to comprehensively test all error conditions, these should be covered by lower level tests.
Every test should use its own unique user to avoid tests sharing state.
It may be possible in future to use a new database for every test, but right now we're using a single database file and we can't create multiple database clients against it, so tests cannot run in parallel.

## Test fixtures

You can destructure test fixtures from the playwright function

```ts
test('test with fixtures', async ({ makeUser, signupUser }) => {
  const user = makeUser()
  const savedUser = await signupUser(user)
})
```

- `makeUser` - generate a user that can be used for a test
- `signupUser` - sign up a user that can be used for a test. It saves them to the database and this user can be used to log in
- `signupPage` - a page object model for the signup page
- `loginPage` - a page object model for the login page
