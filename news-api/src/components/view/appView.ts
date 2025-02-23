import News from './news/news';
import Sources from './sources/sources';
import { IArticle, newsSource } from '../types';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data?: { articles?: IArticle[] }) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data?: { sources?: newsSource[] }) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
