//
// Styles
//
import 'destyle.css'

//
// Scripts
//
import ReactDOM from 'react-dom'

import App from './App'

const appDOM = document.getElementById('app')
const componentName = appDOM?.dataset?.name

ReactDOM.render(<App componentName={componentName} />, appDOM);
