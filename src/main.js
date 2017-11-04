import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
//导入根组件
import App from './App'

const render = Component => {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById('root'),
    )
  }
  
  render(App)
  
  // Webpack Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./App', () => { render(App) })
  }


//渲染根组件
//ReactDom.render(<App/>,document.getElementById('root'))