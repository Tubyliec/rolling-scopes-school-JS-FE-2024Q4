import News from './news/news';
import Sources from './sources/sources';
import { GetNews } from '../../models/types/get-news.type';
import { GetSources } from '../../models/types/get-sources.type';
import { NewsSource } from '../../models/types/news-source.type';
import { Article } from '../../models/interfaces/article.interface';

export class AppView {
    private news: News;
    private sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data?: GetNews): void {
        const values: Article[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data?: GetSources): void {
        const values: NewsSource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
