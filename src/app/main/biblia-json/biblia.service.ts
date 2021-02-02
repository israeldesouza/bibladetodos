import { Injectable } from "@angular/core";

import *  as menuBiblia from './menuBiblia.json';
import *  as biblia from './biblia.json';
import { Biblia } from "./biblia";
import { MenuBiblia } from "./menu-biblia";


@Injectable({
    providedIn: 'root'
})
export class BibliaService {

    constructor(){}

    getMenuBiblia() : MenuBiblia[]{
        const menuBibliaArray: any = menuBiblia;
        return menuBibliaArray.default;
    }

    getLivroBiblia(index: number) : Biblia{
        const bibliaArray: any = biblia;
        return bibliaArray.default[index];
    }

    saveLivroLocal(livro: Biblia) {
        localStorage.setItem(livro.name, JSON.stringify(livro));
    }

    getLivroLocal(nomeLivro: string) : Biblia | null{
        const livro: any = localStorage.getItem(nomeLivro);
        return JSON.parse(livro);
    }

    salvarUltimoLivroLido(ultimoLivro: { nome: string, indexLivro: number, indexCapitulo: number }) {
        localStorage.setItem('UltimoLivroLido', JSON.stringify(ultimoLivro));
    }

    getUltimoLivroLido() : { nome: string, indexLivro: number, indexCapitulo: number } | null{
        const ultimoLivro: any = localStorage.getItem('UltimoLivroLido');
        return JSON.parse(ultimoLivro);
    }

}