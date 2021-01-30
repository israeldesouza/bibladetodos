import { Component, HostListener, OnInit } from '@angular/core';
import { Biblia } from '../biblia-json/biblia';


import { BibliaService } from '../biblia-json/biblia.service';
import { Capitulos, MenuBiblia } from '../biblia-json/menu-biblia';
import { OnChangeScreenSizeService } from '../on-change-screen-size/on-change-screen-size.service';

@Component({
    templateUrl: './biblia.component.html',
    styleUrls: ['./biblia.component.less']
})
export class BibliaComponent implements OnInit {

    innerWidth: number = 0;
    livrosMenu: MenuBiblia[] = [];
    livroSelecionado: string = 'Gênesis';
    capituloSelecionado: string = '1';
    versiculoSelecionado: string = 'Todos';
    capitolos: Array<Capitulos> = [];
    versiculos: Array<any> = [];
    ultimoLivro: any;
    fontSize: string = 'Médio';
    styleSizeFont: string = 'medium';
    textoSizeSelector: string = 'medium';
    sizeSelector: any = 'default';

    indexLivroSelesionado: number = 0;
    indexCapituloLivroSelesionado: number = 0;
    indexVersiculoSelesionado: number = 0;

    fullScreen: boolean = false;

    livro: Biblia = { name: '', comment: '', chapters: [] };

    constructor(private bibliaService: BibliaService,
        private onChangeScreenSizeService: OnChangeScreenSizeService) { }

    ngOnInit() {

        this.onChangeScreenSizeService
            .getScreenSize()
            .subscribe((screenSize: number) => this.innerWidth = screenSize);

        this.bibliaService
            .getMenuBiblia()
            .subscribe((res) => {
                this.livrosMenu = res;
            });

        this.ultimoLivro = this.bibliaService.getUltimoLivroLido();
        if (this.ultimoLivro) {
            const livroLocal = this.bibliaService.getLivroLocal(this.ultimoLivro.nome);
            this.indexLivroSelesionado = this.ultimoLivro.indexLivro;
            this.indexCapituloLivroSelesionado = this.ultimoLivro.indexCapitulo;

            if (livroLocal) {
                this.livro = livroLocal;
                this.tratarDados();
            } else {
                this.obterLivroBiblia();
            }

        } else {
            this.obterLivroBiblia();
        }
    }

    bookChange(livroBiblia: string) {
        const livroEncontrado: MenuBiblia | undefined = this.livrosMenu.find((livro: MenuBiblia) => livro.livro == livroBiblia);
        if (livroEncontrado) {
            this.indexLivroSelesionado = this.livrosMenu.indexOf(livroEncontrado);
            this.indexCapituloLivroSelesionado = 0;
            this.obterLivroBiblia();
        };

    }

    converterParaString(numero: number) {
        numero++
        return numero.toString();
    }

    obterLivroBiblia() {
        const livroLocal = this.bibliaService.getLivroLocal(this.livroSelecionado);

        if (livroLocal) {
            this.livro = livroLocal;
            this.tratarDados();
            return;
        }

        this.bibliaService
            .getLivroBiblia(this.indexLivroSelesionado)
            .subscribe((res) => {
                this.livro = res;
                this.tratarDados();
            });
    }

    tratarDados() {
        let indexDoCapitulo = this.indexCapituloLivroSelesionado;
        this.livroSelecionado = this.livrosMenu[this.indexLivroSelesionado].livro;

        this.capitolos = this.livrosMenu[this.indexLivroSelesionado].chapter;
        this.versiculos = this.livrosMenu[this.indexLivroSelesionado].chapter[indexDoCapitulo].versesNumber;

        indexDoCapitulo++;
        this.capituloSelecionado = indexDoCapitulo.toString();
        this.versiculoSelecionado = 'Todos';
        this.salvarUltimolivro();
    }

    trocarCapitulo(index: number) {
        index--;
        this.indexCapituloLivroSelesionado = index;
        this.versiculos = this.livrosMenu[this.indexLivroSelesionado].chapter[this.indexCapituloLivroSelesionado].versesNumber;

        this.salvarUltimolivro();
    }

    trocarVersiculo(event: any) {
        this.indexVersiculoSelesionado = event - 1;
    }

    changeFullScreen() {
        this.fullScreen = !this.fullScreen;
    }

    trocarTamanhoFont(event: string) {
        switch (event) {
            case 'Pequeno':
                this.styleSizeFont = 'small';
                this.sizeSelector = 'small';
                this.textoSizeSelector = 'small';
                break;
            case 'Médio':
                this.styleSizeFont = 'medium';
                this.textoSizeSelector = 'medium';
                this.sizeSelector = 'default';
                break;
            case 'Grande':
                this.styleSizeFont = 'large';
                break;
            case 'Extra Grande':
                this.styleSizeFont = 'x-large';
                break;

            default:
                break;
        }
    }

    @HostListener('document:keydown', ['$event'])
    keyPress(event: any){

        if(this.versiculoSelecionado != 'Todos' && event.key == 'ArrowRight') {
            let indexVerso = this.indexVersiculoSelesionado + 1;
            const quantidadeVesiculos = this.livro.chapters[this.indexCapituloLivroSelesionado].length;
            if(indexVerso >= quantidadeVesiculos) return;

            this.versiculoSelecionado = (indexVerso + 1).toString();
            this.indexVersiculoSelesionado = indexVerso;

        } else if(this.versiculoSelecionado != 'Todos' && event.key == 'ArrowLeft') {

            let indexVersoDiminuir = this.indexVersiculoSelesionado - 1;

            if(indexVersoDiminuir < 0) indexVersoDiminuir = 0;

            this.versiculoSelecionado = (indexVersoDiminuir + 1).toString();
            this.indexVersiculoSelesionado = indexVersoDiminuir;

        }
    }

    salvarLivro() {
        this.bibliaService
            .saveLivroLocal(this.livro)
            .subscribe(res => {});
    }

    salvarUltimolivro() {
        this.bibliaService
            .salvarUltimoLivroLido({
                nome: this.livroSelecionado,
                indexLivro: this.indexLivroSelesionado,
                indexCapitulo: this.indexCapituloLivroSelesionado
            })
            .subscribe(res => {});
    }
}
