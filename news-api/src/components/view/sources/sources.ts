import './sources.css';
import { NewsSource } from '../../../models/types/news-source.type';
import { IsHTMLDiv } from '../../../models/types/is-htmldiv.type';

class Sources {
    public draw(data: NewsSource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: IsHTMLDiv = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            if (!(sourceItemTemp instanceof HTMLTemplateElement)) {
                console.log('No sources item!');
                return;
            }
            const sourceClone: Node = sourceItemTemp.content.cloneNode(true);
            if (sourceClone instanceof DocumentFragment) {
                sourceClone.querySelector<HTMLDivElement>('.source__item-name')!.textContent = item.name;
                sourceClone.querySelector<HTMLDivElement>('.source__item')!.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });

        document.querySelector<HTMLDivElement>('.sources')!.append(fragment);
    }
}

export default Sources;
