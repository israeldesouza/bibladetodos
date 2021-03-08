export interface IBiblia {
	name: string;
	comment: string;
	chapters: IChapter[][];
}

export interface IChapter {
	verse: string;
	highlight: boolean;
	reminder: boolean;
	comment: string;
	hasComment: boolean;
}

export interface IMenuBiblia {
	livro: string;
	chapter: ICapitulos[];
}

export interface ICapitulos {
	chapterNumber: number;
	versesNumber: number[];
}

export interface IUltimoLivroLido {
	nome: string;
	indexLivro: number;
	indexCapitulo: number;
	indexVerso: number;
}

export interface IConfig {
	config: string;
	fontSize: string;
	showComments: boolean;
	showVerses: boolean;
	changeConfig: boolean;
}
