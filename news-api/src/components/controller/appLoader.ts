import Loader from './loader';
import { Api } from '../../models/types/api.type';

class AppLoader extends Loader {
    constructor() {
        const apiUrl: Api = process.env.API_URL;
        const apiKey: Api = process.env.API_KEY;
        if (apiUrl && apiKey) {
            super(apiUrl, {
                apiKey,
            });
        }
    }
}

export default AppLoader;
