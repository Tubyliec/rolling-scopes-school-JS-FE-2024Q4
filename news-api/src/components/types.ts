export type Source = {
    id: string | null;
    name: string;
};

export interface IArticle {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export type NewsSource = {
    [x: string]: string;
};

export type RequestOptions = Record<string, string | number | boolean>;

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';
