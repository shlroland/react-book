import React from 'react'
import Default from './Default'
import Eye from './Eye'
import Gold from './Gold'
import Night from './Night'

export type themeProp = typeof Default | typeof Eye | typeof Gold | typeof Night
const ThemeContext = React.createContext(Default)

export { Default, Eye, Gold, Night }

export default ThemeContext
