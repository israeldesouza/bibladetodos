export interface MenuBiblia {
    livro: string
    chapter: Capitulos[]
}

export interface Capitulos {
    chapterNumber: number,
    versesNumber: number[]
}