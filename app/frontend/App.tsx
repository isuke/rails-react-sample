import React from 'react'

import Home from './components/Home'
import User from './components/User'

export default ({ componentName } : { componentName: string | undefined }) => {
  interface components {
    [key: string]: () => JSX.Element
  }

  const components: components = {
    home: Home,
    user: User,
  }

  if (typeof componentName === "string") {
    return React.createElement(components[componentName])
  } else {
    return (<h1>Error</h1>)
  }
}
