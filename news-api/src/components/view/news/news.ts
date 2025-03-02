import './news.css';
import { Article } from '../../../models/interfaces/article.interface';

class News {
    public draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');
        const newsContainer = document.querySelector('.news');

        news.forEach((item, idx) => {
            if (!(newsItemTemp instanceof HTMLTemplateElement)) {
                console.log('No news item!');
                return;
            }

            const newsClone = newsItemTemp.content.cloneNode(true);

            if (newsClone instanceof DocumentFragment) {
                if (idx % 2) newsClone.querySelector('.news__item')!.classList.add('alt');

                newsClone.querySelector<HTMLElement>('.news__meta-photo')!.style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;
                newsClone.querySelector('.news__meta-author')!.textContent = item.author || item.source.name;
                newsClone.querySelector('.news__meta-date')!.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');

                newsClone.querySelector('.news__description-title')!.textContent = item.title;
                newsClone.querySelector('.news__description-source')!.textContent = item.source.name;
                newsClone.querySelector('.news__description-content')!.textContent = item.description;
                newsClone.querySelector('.news__read-more a')!.setAttribute('href', item.url);

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
