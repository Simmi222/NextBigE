import { useFilters } from '../store/filterStore'

test('toggles theme', () => {
  const store = useFilters.getState()
  const prev = store.theme
  useFilters.toggleTheme()
  const next = store.theme
  expect(next).not.toBe(prev)
})
