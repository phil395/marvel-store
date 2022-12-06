import { IComicBase } from './comic';

export interface ICharacter {
	id: number;
	name: string;
	description: string;
	thumbnail: string;
	comics: IComicBase[];
	wiki: string | null;
}