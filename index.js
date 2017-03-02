import React             from 'react'
import { AppContainer }  from 'react-chunky'
import App               from './lib/core/App'
import Platform          from './lib/core/Platform'

// Inject the platform globally
Chunky = { Platform }

// The main app entry point
export function renderApp(props) {
  // Construct the main application component
  const Main = () => (<AppContainer {...props}>
      <App {...props}/>
    </AppContainer>)

  // Register the main component and boostrap the app
  Platform.register(props.name, Main)
}
