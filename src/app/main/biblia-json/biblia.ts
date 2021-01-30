export interface Biblia {
    name: string,
    comment: string,
    chapters:Chapter[][]
}

export interface Chapter {
    verse: string,
    highlight: boolean,
    reminder: boolean,
    comment: string,
    hasComment: boolean
}