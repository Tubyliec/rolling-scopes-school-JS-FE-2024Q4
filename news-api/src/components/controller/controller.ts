import { CallbackType } from '../../models/types/callback.type';
import { IsString } from '../../models/types/is-string.type';
import { IsTarget } from '../../models/types/is-target.type';
import AppLoader from './appLoader';
class AppController extends AppLoader {
    public getSources<T>(callback: CallbackType<T>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews<T>(e: Event, callback: CallbackType<T>): void {
        let target: IsTarget = e.target;
        const newsContainer: IsTarget = e.currentTarget;

        while (target !== newsContainer) {
            if (target instanceof HTMLElement && newsContainer instanceof HTMLElement) {
                if (target.classList.contains('source__item')) {
                    const sourceId: IsString = target.getAttribute('data-source-id');
                    if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }
                target = target.parentNode;
            }
        }
    }
}

export default AppController;
