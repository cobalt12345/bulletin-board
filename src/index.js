import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import OpinionBoard from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import theme from "./theme";
import {Amplify} from "aws-amplify";
import awsExports from "./aws-exports";
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

Amplify.configure(awsExports);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

ReactDOM.hydrate(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <CssBaseline/>
            <OpinionBoard/>
        </React.StrictMode>,
    </ThemeProvider>,
document.getElementById('root')
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
