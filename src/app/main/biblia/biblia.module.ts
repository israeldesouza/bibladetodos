import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import { BibliaComponent } from './biblia.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		NzSelectModule,
		NzTypographyModule,
		NzIconModule,
		NzCardModule,
		NzBackTopModule,
		NzButtonModule,

		NzLayoutModule,
		NzModalModule,
		NzSwitchModule,
		NzPopconfirmModule,
	],
	declarations: [BibliaComponent],
	exports: [BibliaComponent],
})
export class BibliaModule {}
