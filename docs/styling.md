# Styling

## Tailwind CSS

- Use Tailwind CSS for styling
- Prefer utility classes over custom CSS
- Where possible encapsulate re-usable styles in components. Allow for pragmatic overrides using tailwind classnames to achieve responsive variants, or to inject styles from a parent, such as margin, grid positioning etc
- One off styling for pages and bespoke items can be done with bare tailwind, not every single element needs to be its own component

## CSS Classes

- Use consistent spacing and sizing, avoid arbitrary values unless completely necessary, and comment the reasoning behind the value
- Prefer semantic color names (gray-500, blue-600)
- Use focus-visible for keyboard navigation
- Include proper hover and focus states
- Avoid conditionally applying classes based on javascript state or props, instead use modifiers based on pseudoclasses or aria attributes. e.g `aria-disabled:opacity-50` rather than `${isDisabled ? 'opacity-50' : ''}`

## Media Queries

- Work mobile first, and use media queries to add responsive variants
- Occasionally the mobile and desktop designs can't be achieved with a single element. In which case, duplicate the element in the correct place and use media queries to hide/show the appropriate element.
- If an element should be hidden on small screens then use a max width media query such as `max-w-md:hidden`. This is so that you don't need to know the underlying display property of the element. As a counter example, if you used a min-width media query, you would _also_ need to know the underlying display property of the element e.g. `hidden lg:block` - which breaks component encapsulation.
