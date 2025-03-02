import News from './news/news';
import Sources from './sources/sources';
import { GetNews } from '../../models/types/get-news.type';
import { GetSources } from '../../models/types/get-sources.type';

export class AppView {
    private news: News;
    private sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data?: GetNews) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data?: GetSources) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
