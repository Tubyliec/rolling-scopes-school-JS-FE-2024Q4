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

    public start(): void {
        document
            .querySelector<HTMLDivElement>('.sources')!
            .addEventListener('click', (e: Event) =>
                this.controller.getNews(e, (data: GetNews): void => this.view.drawNews(data))
            );
        this.controller.getSources((data: GetSources): void => this.view.drawSources(data));
    }
}

export default App;
