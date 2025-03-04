import './news.css';
import { Article } from '../../../models/interfaces/article.interface';
import { IsHTMLDiv } from '../../../models/types/is-htmldiv.type';

class News {
    public draw(data: Article[]): void {
        const news: Article[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: IsHTMLDiv = document.querySelector('#newsItemTemp');
        const newsContainer: IsHTMLDiv = document.querySelector('.news');

        news.forEach((item, idx) => {
            if (!(newsItemTemp instanceof HTMLTemplateElement)) {
                console.log('No news item!');
                return;
            }

            const newsClone: Node = newsItemTemp.content.cloneNode(true);

            if (newsClone instanceof DocumentFragment) {
                if (idx % 2) newsClone.querySelector<HTMLElement>('.news__item')!.classList.add('alt');

                newsClone.querySelector<HTMLElement>('.news__meta-photo')!.style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;
                newsClone.querySelector<HTMLElement>('.news__meta-author')!.textContent =
                    item.author || item.source.name;
                newsClone.querySelector<HTMLElement>('.news__meta-date')!.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');

                newsClone.querySelector<HTMLElement>('.news__description-title')!.textContent = item.title;
                newsClone.querySelector<HTMLElement>('.news__description-source')!.textContent = item.source.name;
                newsClone.querySelector<HTMLElement>('.news__description-content')!.textContent = item.description;
                newsClone.querySelector<HTMLElement>('.news__read-more a')!.setAttribute('href', item.url);

                fragment.append(newsClone);
            }
        });

        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
