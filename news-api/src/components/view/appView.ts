import News from './news/news';
import Sources from './sources/sources';
import { IArticle, NewsSource } from '../types';

export class AppView {
    private news: News;
    private sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data?: { articles?: IArticle[] }) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data?: { sources?: NewsSource[] }) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
