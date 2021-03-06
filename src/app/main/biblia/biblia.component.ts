import { Component, HostListener, OnInit } from '@angular/core';
import { IBiblia, IUltimoLivroLido } from './biblia';

import { BibliaService } from './biblia.service';
import { ICapitulos, IMenuBiblia } from './biblia';
import { LoadingService } from '../loading/loading.service';

@Component({
	templateUrl: './biblia.component.html',
	styleUrls: ['./biblia.component.less'],
	providers: [BibliaService],
})
export class BibliaComponent implements OnInit {
	livrosMenu: IMenuBiblia[] = [];
	livroSelecionado: string = 'Gênesis';
	capituloSelecionado: string = '1';
	versiculoSelecionado: string = '1';
	capitolos: Array<ICapitulos> = [];
	versiculos: Array<number> = [];
	ultimoLivro!: IUltimoLivroLido;
	modalConfig: boolean = false;
	indexLivroSelesionado: number = 0;
	indexCapituloLivroSelesionado: number = 0;
	indexVersiculoSelesionado: number = 0;

	config = {
		config: 'capitulosVesos',
		fontSize: 'Médio',
		showComments: true,
		showVerses: false,
		changeConfig: false,
	};

	styleSizeFont: string = 'medium';

	livro: IBiblia = {
		name: '',
		chapters: [],
		comment: '',
	};

	constructor(
		private bibliaService: BibliaService,
		private loadingService: LoadingService
	) {}

	ngOnInit() {
		this.livrosMenu = this.bibliaService.getMenuBiblia();

		this.bibliaService
			.getUltimoLivroLido()
			.then((ultimoLido) => {
				if (ultimoLido[0]) {
					this.ultimoLivro = ultimoLido[0];
					this.livroSelecionado = ultimoLido[0].nome;
					this.indexLivroSelesionado = this.ultimoLivro.indexLivro;
					this.indexCapituloLivroSelesionado = this.ultimoLivro.indexCapitulo;
					this.indexVersiculoSelesionado = this.ultimoLivro.indexVerso;

					this.obterLivroBiblia();
				} else {
					this.obterLivroBiblia();
				}
			})
			.catch((error) => console.error(error));

		this.bibliaService.getConfig(this.config.config).then((config) => {
			if (config) {
				this.config = config;
				this.trocarTamanhoFont(this.config.fontSize);
			}
		});
	}

	bookChange(livroBiblia: string) {
		const livroEncontrado = this.livrosMenu.findIndex(
			(livro: IMenuBiblia) => livro.livro == livroBiblia
		);
		if (livroEncontrado >= 0) {
			this.indexLivroSelesionado = livroEncontrado;
			this.indexCapituloLivroSelesionado = 0;
			this.indexVersiculoSelesionado = 0;

			this.obterLivroBiblia();
		}
	}

	converterParaString(numero: number) {
		numero++;
		return numero.toString();
	}

	obterLivroBiblia() {
		this.bibliaService
			.getLivro(this.livroSelecionado)
			.then((livro: IBiblia) => {
				if (livro) {
					this.livro = livro;
				} else {
					this.livro = this.bibliaService.getLivroBiblia(
						this.indexLivroSelesionado
					);
				}

				this.tratarDados();
			});
	}

	tratarDados() {
		let indexDoCapitulo = this.indexCapituloLivroSelesionado;
		let indexVersiculo = this.indexVersiculoSelesionado;
		this.livroSelecionado = this.livrosMenu[
			this.indexLivroSelesionado
		].livro;

		this.capitolos = this.livrosMenu[this.indexLivroSelesionado].chapter;
		this.versiculos = this.livrosMenu[this.indexLivroSelesionado].chapter[
			indexDoCapitulo
		].versesNumber;

		indexDoCapitulo++;
		indexVersiculo++;
		this.capituloSelecionado = indexDoCapitulo.toString();
		this.versiculoSelecionado = indexVersiculo.toString();
		this.salvarUltimolivro();

		//Se usar o this.loadingService.stop(); direto sem o setTimeout da um erro no console
		//usei seguindo a dica da documentação do angular https://angular.io/errors/NG0100
		setTimeout(() => {
			this.loadingService.stop();
		}, 0);
	}

	trocarCapitulo(index: number) {
		index--;
		this.indexCapituloLivroSelesionado = index;
		this.versiculos = this.livrosMenu[this.indexLivroSelesionado].chapter[
			this.indexCapituloLivroSelesionado
		].versesNumber;
		this.indexVersiculoSelesionado = 0;
		this.versiculoSelecionado = '1';

		window.scroll(0, 0);
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

		this.updateConfig();
	}

	salvarConfig() {
		this.bibliaService.salvarConfig(this.config);
	}

	updateConfig() {
		this.bibliaService.updateConfig(this.config);
	}

	@HostListener('document:keydown', ['$event'])
	keyPress(event: any) {
		if (this.config.showVerses && event.key == 'ArrowRight') {
			let indexVerso = this.indexVersiculoSelesionado + 1;
			const quantidadeVesiculos = this.livro.chapters[
				this.indexCapituloLivroSelesionado
			].length;
			if (indexVerso >= quantidadeVesiculos) return;

			this.versiculoSelecionado = (indexVerso + 1).toString();
			this.indexVersiculoSelesionado = indexVerso;
			this.salvarUltimolivro();
		} else if (this.config.showVerses && event.key == 'ArrowLeft') {
			let indexVersoDiminuir = this.indexVersiculoSelesionado - 1;

			if (indexVersoDiminuir < 0) indexVersoDiminuir = 0;

			this.versiculoSelecionado = (indexVersoDiminuir + 1).toString();
			this.indexVersiculoSelesionado = indexVersoDiminuir;
			this.salvarUltimolivro();
		}
	}

	onClickChangeVerse(arrow: string) {
		this.keyPress({ key: arrow });
	}

	async salvarLivro() {
		const livroExistenteDb = await this.bibliaService.getLivro(
			this.livro.name
		);
		livroExistenteDb
			? this.bibliaService.updateLivro(this.livro)
			: this.bibliaService.saveLivro(this.livro);
	}

	salvarUltimolivro() {
		if (!this.ultimoLivro) {
			this.ultimoLivro = {
				nome: this.livroSelecionado,
				indexLivro: this.indexLivroSelesionado,
				indexCapitulo: this.indexCapituloLivroSelesionado,
				indexVerso: this.indexVersiculoSelesionado,
			};
			this.bibliaService.salvarUltimoLivroLido(this.ultimoLivro);

			return;
		}

		this.ultimoLivro = {
			nome: this.livroSelecionado,
			indexLivro: this.indexLivroSelesionado,
			indexCapitulo: this.indexCapituloLivroSelesionado,
			indexVerso: this.indexVersiculoSelesionado,
		};

		this.bibliaService.updateUltimoLivroLido(this.ultimoLivro);
	}

	apagarDb() {
		this.bibliaService
			.deleteDataBase()
			.then(() => {
				location.reload();
				this.modalConfig = false;
			})
			.catch((e) => (this.modalConfig = false));
	}
}
