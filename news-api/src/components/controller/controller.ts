import AppLoader from './appLoader';
class AppController extends AppLoader {
    public getSources<T>(callback: (data: T) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews<T>(e: Event, callback: (data: T) => void): void {
        let target = e.target;
        const newsContainer = e.currentTarget;

        while (target !== newsContainer) {
            if (target instanceof HTMLElement && newsContainer instanceof HTMLElement) {
                if (target.classList.contains('source__item')) {
                    const sourceId = target.getAttribute('data-source-id');
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
