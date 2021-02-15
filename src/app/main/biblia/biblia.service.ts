import { Injectable } from "@angular/core";

import *  as menuBiblia from '../biblia-json/menuBiblia.json';
import *  as biblia from '../biblia-json/biblia.json';
import { Biblia, UltimoLivroLido } from "./biblia";
import { MenuBiblia } from "./biblia";


@Injectable()
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

    getLivroLocal(nomeLivro: string) {
        const livro: any = localStorage.getItem(nomeLivro);
        return JSON.parse(livro);
    }

    salvarUltimoLivroLido(ultimoLivro: UltimoLivroLido) {
        localStorage.setItem('UltimoLivroLido', JSON.stringify(ultimoLivro));
    }

    getUltimoLivroLido(){
        const ultimoLivro: any = localStorage.getItem('UltimoLivroLido');
        return JSON.parse(ultimoLivro);
    }

    salvarConfig(config: {fontSize: string, showComments: boolean, showVerses: boolean, changeConfig: boolean }){
        localStorage.setItem('config', JSON.stringify(config));
    }

    getConfig(){
        const config: any = localStorage.getItem('config');
        return JSON.parse(config);
    }

}