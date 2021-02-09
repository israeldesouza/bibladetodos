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
    versiculoSelecionado: string = 'Versículos';
    capitolos: Array<Capitulos> = [];
    versiculos: Array<any> = [];
    ultimoLivro: any;
    modalConfig: boolean = false;
    
    indexLivroSelesionado: number = 0;
    indexCapituloLivroSelesionado: number = 0;
    indexVersiculoSelesionado: number = 0;

    config: any = {
        fontSize: 'Médio',
        showComments: true,
        showVerses: false,
        changeConfig: false
    };

    styleSizeFont: string = 'medium';


    livro: Biblia = { name: '', comment: '', chapters: [] };

    constructor(private bibliaService: BibliaService,
                private onChangeScreenSizeService: OnChangeScreenSizeService) { }

    ngOnInit() {

        this.onChangeScreenSizeService
            .getScreenSize()
            .subscribe((screenSize: number) => this.innerWidth = screenSize);

        this.livrosMenu = this.bibliaService.getMenuBiblia();

        this.ultimoLivro = this.bibliaService.getUltimoLivroLido();
        if (this.ultimoLivro) {
            this.indexLivroSelesionado = this.ultimoLivro.indexLivro;
            this.indexCapituloLivroSelesionado = this.ultimoLivro.indexCapitulo;
            this.indexVersiculoSelesionado = this.ultimoLivro.indexVerso;

            this.obterLivroBiblia();

        } else {

            this.obterLivroBiblia();

        }

        const config = this.bibliaService.getConfig();
        if(config) {
            this.config = config;
            this.trocarTamanhoFont(this.config.fontSize);
        };
    }

    bookChange(livroBiblia: string) {
        const livroEncontrado = this.livrosMenu.findIndex((livro: MenuBiblia) => livro.livro == livroBiblia);
        if (livroEncontrado >= 0) {
            this.indexLivroSelesionado = livroEncontrado;
            this.indexCapituloLivroSelesionado = 0;
            this.indexVersiculoSelesionado = 0;

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
        this.livro = this.bibliaService.getLivroBiblia(this.indexLivroSelesionado);
        this.tratarDados();
    }

    tratarDados() {

        let indexDoCapitulo = this.indexCapituloLivroSelesionado;
        let indexVersiculo = this.indexVersiculoSelesionado;
        this.livroSelecionado = this.livrosMenu[this.indexLivroSelesionado].livro;

        this.capitolos = this.livrosMenu[this.indexLivroSelesionado].chapter;
        this.versiculos = this.livrosMenu[this.indexLivroSelesionado].chapter[indexDoCapitulo].versesNumber;

        indexDoCapitulo++;
        indexVersiculo++;
        this.capituloSelecionado = indexDoCapitulo.toString();
        this.versiculoSelecionado = indexVersiculo.toString();
        this.salvarUltimolivro();
    }

    trocarCapitulo(index: number) {
        index--;
        this.indexCapituloLivroSelesionado = index;
        this.versiculos = this.livrosMenu[this.indexLivroSelesionado].chapter[this.indexCapituloLivroSelesionado].versesNumber;
        this.indexVersiculoSelesionado = 0;
        this.versiculoSelecionado = '1';

        window.scroll(0,0);
        this.salvarUltimolivro();
    }

    trocarVersiculo(event: any) {
        this.indexVersiculoSelesionado = event - 1;
        this.salvarUltimolivro();
    }

    changeFullScreen() {
        this.config.showVerses = !this.config.showVerses;
    }

    trocarTamanhoFont(event: string) {
        switch (event) {
            case 'Pequeno':
                this.styleSizeFont = 'small';
                this.config.fontSize = event;
                break;
            case 'Médio':
                this.styleSizeFont = 'medium';
                this.config.fontSize = event;
                break;
            case 'Grande':
                this.styleSizeFont = 'large';
                this.config.fontSize = event;
                break;
            case 'Extra Grande':
                this.styleSizeFont = 'x-large';
                this.config.fontSize = event;
                break;

            default:
                break;
        }

        this.salvarConfig();
    }

    salvarConfig(){
        this.bibliaService.salvarConfig(this.config);
    }

    @HostListener('document:keydown', ['$event'])
    keyPress(event: any){
        if(this.config.showVerses && event.key == 'ArrowRight') {
            let indexVerso = this.indexVersiculoSelesionado + 1;
            const quantidadeVesiculos = this.livro.chapters[this.indexCapituloLivroSelesionado].length;
            if(indexVerso >= quantidadeVesiculos) return;

            this.versiculoSelecionado = (indexVerso + 1).toString();
            this.indexVersiculoSelesionado = indexVerso;
            this.salvarUltimolivro();

        } else if(this.config.showVerses  && event.key == 'ArrowLeft') {

            let indexVersoDiminuir = this.indexVersiculoSelesionado - 1;

            if(indexVersoDiminuir < 0) indexVersoDiminuir = 0;

            this.versiculoSelecionado = (indexVersoDiminuir + 1).toString();
            this.indexVersiculoSelesionado = indexVersoDiminuir;
            this.salvarUltimolivro();
        }
    }

    salvarLivro() {
        this.bibliaService.saveLivroLocal(this.livro);
    }

    salvarUltimolivro() {
        this.bibliaService
            .salvarUltimoLivroLido({
                nome: this.livroSelecionado,
                indexLivro: this.indexLivroSelesionado,
                indexCapitulo: this.indexCapituloLivroSelesionado,
                indexVerso: this.indexVersiculoSelesionado
            });
    }
}
