export interface IComicBase {
	title: string;
	url: string | null;
}

export interface IComic extends IComicBase {
	id: number;
	description: string;
	thumbnail: string;
	prices: number;
	pageCount: number;
	language?: string | null;
}