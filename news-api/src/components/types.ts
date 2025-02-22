export type source = {
    id: string | null;
    name: string;
};

export interface IArticle {
    source: source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export type newsSource = {
    [x: string]: string;
};
