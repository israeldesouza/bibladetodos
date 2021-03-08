import { Injectable } from '@angular/core';

import * as menuBiblia from '../biblia-json/menuBiblia.json';
import * as biblia from '../biblia-json/biblia.json';
import { IBiblia, IConfig, IUltimoLivroLido } from './biblia';
import { IMenuBiblia } from './biblia';

import Dexie from 'dexie';

@Injectable()
export class BibliaService {
	private db!: Dexie;
	private tableUltimoLivroLido!: Dexie.Table<IUltimoLivroLido>;
	private tableLivros!: Dexie.Table<IBiblia>;
	private tableConfig!: Dexie.Table<IConfig>;

	constructor() {
		this.iniciarIndexdDb();
	}

	private iniciarIndexdDb() {
		this.db = new Dexie('db-biblia');
		this.db.version(1).stores({
			ultimoLivro: 'nome',
			livros: 'name',
			config: 'config',
		});

		this.tableUltimoLivroLido = this.db.table('ultimoLivro');
		this.tableLivros = this.db.table('livros');
		this.tableConfig = this.db.table('config');
	}

	getMenuBiblia(): IMenuBiblia[] {
		const menuBibliaArray: any = menuBiblia;
		return menuBibliaArray.default;
	}

	getLivroBiblia(index: number): IBiblia {
		const bibliaArray: any = biblia;
		return bibliaArray.default[index];
	}

	saveLivro(livro: IBiblia) {
		this.tableLivros.add(livro);
	}

	updateLivro(livro: IBiblia) {
		this.tableLivros.update(livro.name, livro);
	}

	getLivro(nomeLivro: string): Promise<IBiblia> | any {
		return this.tableLivros.get({ name: nomeLivro });
	}

	getUltimoLivroLido(): Promise<IUltimoLivroLido[]> {
		return this.tableUltimoLivroLido.toArray();
	}

	salvarUltimoLivroLido(ultimoLivro: IUltimoLivroLido) {
		this.tableUltimoLivroLido.add(ultimoLivro);
	}

	updateUltimoLivroLido(ultimoLivro: IUltimoLivroLido) {
		this.getUltimoLivroLido().then((ultimoLivroLido) => {
			this.tableUltimoLivroLido.update(
				ultimoLivroLido[0].nome,
				ultimoLivro
			);
		});
	}

	salvarConfig(config: IConfig) {
		this.tableConfig.add(config);
	}

	updateConfig(config: IConfig) {
		this.tableConfig.update(config.config, config);
	}

	getConfig(config: string) {
		return this.tableConfig.get({ config: config });
	}

	deleteDataBase() {
		return Dexie.delete('db-biblia');
	}
}
