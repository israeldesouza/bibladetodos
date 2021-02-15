export interface Biblia {
    name: string,
    comment: string,
    chapters: Chapter[][]
}

export interface Chapter {
    verse: string,
    highlight: boolean,
    reminder: boolean,
    comment: string,
    hasComment: boolean
}

export interface MenuBiblia {
    livro: string
    chapter: Capitulos[]
}

export interface Capitulos {
    chapterNumber: number,
    versesNumber: number[]
}

export interface UltimoLivroLido {
    nome: string,
    indexLivro: number,
    indexCapitulo: number,
    indexVerso: number
}