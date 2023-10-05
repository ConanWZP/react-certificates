import App from './App';

import ReactDOM from "react-dom/client";

/*ReactDOM.render(<App />, document.getElementById("root"));*/

ReactDOM.createRoot(document.getElementById('root')).render(
    <App/>
)

const devMode = process.env.NODE_ENV === 'development';
if (devMode && module && module.hot) {
    module.hot.accept();
}