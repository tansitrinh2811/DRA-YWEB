import '../styles/globals.css'
//INTERNAL
import { NavigationBar} from "../Component/index";
import {  SwapTokenContextProvider } from '../Context/SwapContext';
const MyApp = ({ Component, pageProps }) =>(
  <div>
    <SwapTokenContextProvider>
      <NavigationBar/>
      <Component {...pageProps}/>
    </SwapTokenContextProvider>
  </div>
);

export default MyApp
