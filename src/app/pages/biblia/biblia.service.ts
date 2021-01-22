import { Injectable } from "@angular/core";
import { of } from "rxjs/internal/observable/of";

import *  as menuBiblia from '../biblia/menuBiblia.json';
import *  as biblia from '../biblia/biblia.json';
import { Biblia } from "./biblia";
import { MenuBiblia } from "./menu-biblia";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class BibliaService {

    constructor(){}

    getMenuBiblia() : Observable<Array<MenuBiblia>>{
        const menuBibliaArray: any = menuBiblia as any[];
        return of(menuBibliaArray.default as MenuBiblia[]);
    }

    getLivroBiblia(index: number) : Observable<Biblia>{
        const bibliaArray: any = biblia as any;
        return of(bibliaArray.default[index]);
    }

    saveLivroLocal(livro: Biblia) : Observable<boolean> {
        localStorage.setItem(livro.name, JSON.stringify(livro));
        return of(true);
    }

    getLivroLocal(nomeLivro: string) : Biblia | null{
        const livro: any = localStorage.getItem(nomeLivro);
        return JSON.parse(livro);
    }

    salvarUltimoLivroLido(ultimoLivro: { nome: string, indexLivro: number, indexCapitulo: number }) : Observable<boolean> {
        localStorage.setItem('UltimoLivroLido', JSON.stringify(ultimoLivro));
        return of(true);
    }

    getUltimoLivroLido() : { nome: string, indexLivro: number, indexCapitulo: number } | null{
        const ultimoLivro: any = localStorage.getItem('UltimoLivroLido');
        return JSON.parse(ultimoLivro);
    }

}