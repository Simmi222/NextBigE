type State = {
  theme: 'light'|'dark'
  toggleTheme: ()=>void
}

const state: State = {
  theme: 'light',
  toggleTheme: ()=>{
    state.theme = state.theme === 'light' ? 'dark' : 'light'
  }
}

// Minimal store-like object with getState API used in tests
export const useFilters = {
  getState: () => state,
  toggleTheme: () => state.toggleTheme()
}

export default useFilters
