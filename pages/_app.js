import 'bootstrap/dist/css/bootstrap.min.css';

import '@/styles/style.css'
import '../styles/scss/style.scss'

import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function App({ Component, pageProps }) {
  
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
