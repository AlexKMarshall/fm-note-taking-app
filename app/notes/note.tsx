import { Note } from '~/features/note/note'

export default function NoteRoute() {
  return (
    <Note
      title="React Performance Optimization"
      tags={['Dev', 'React']}
      lastEdited="29 Oct 2024"
      content={`Key performance optimization techniques:
        
1. Code Splitting
- Use React.lazy() for route-based splitting
- Implement dynamic imports for heavy components

2.	Memoization
- useMemo for expensive calculations
- useCallback for function props
- React.memo for component optimization

3. Virtual List Implementation
- Use react-window for long lists
- Implement infinite scrolling

TODO: Benchmark current application and identify bottlenecks`}
    />
  )
}
