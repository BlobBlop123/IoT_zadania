import App from './app';
import IndexController from "./controllers/index.controllers";
import DataController from './controllers/data.controllers';

const app: App = new App([
    new DataController(),
    new IndexController()
]);

app.listen();