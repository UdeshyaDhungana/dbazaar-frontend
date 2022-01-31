import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/red-hat-display/700.css'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brandBlue: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
    500: '#9DC2FF',
    600: '#2264D1',
    100: '#0C2146',
  }, 
  brandGray: {
    100: '#5A5B6A',
    200: '#EDEDF0',
    300 : '#19191D',
    
  }
}

const theme = extendTheme({ colors });

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
