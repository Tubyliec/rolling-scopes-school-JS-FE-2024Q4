import './sources.css';
import { NewsSource } from '../../types';

class Sources {
    draw(data: NewsSource[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            if (!(sourceItemTemp instanceof HTMLTemplateElement)) {
                console.log('No sources item!');
                return;
            }
            const sourceClone = sourceItemTemp.content.cloneNode(true);
            if (sourceClone instanceof DocumentFragment) {
                sourceClone.querySelector('.source__item-name')!.textContent = item.name;
                sourceClone.querySelector('.source__item')!.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });

        document.querySelector('.sources')!.append(fragment);
    }
}

export default Sources;
