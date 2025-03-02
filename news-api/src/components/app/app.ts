import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { GetNews } from '../../models/types/get-news.type';
import { GetSources } from '../../models/types/get-sources.type';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        document
            .querySelector('.sources')!
            .addEventListener('click', (e) => this.controller.getNews(e, (data: GetNews) => this.view.drawNews(data)));
        this.controller.getSources((data: GetSources) => this.view.drawSources(data));
    }
}

export default App;
