import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainMenu from "./MainMenu"

//renders main menu which then renders app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MainMenu />
);
