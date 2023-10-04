import { render } from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
//translation
import App from "app/App";
//RT
import store from './app/ReduxStore/store';
import { BrowserRouter } from "react-router-dom";

// ulbi оборачивате BrowserRoute'м  корневой index.tsx. Хекслет - app.js

// Хекслет затем тут же передает внутрь routes импортированые страницы,
// улби делает это уже в апп, а не в index.tsx, при этом передает 1 компонентом AppRouter


render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,

    document.getElementById('root')
)
