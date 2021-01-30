import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';

import { BibliaComponent } from './biblia.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        NzGridModule,
        NzSelectModule,
        NzTypographyModule,
        NzIconModule,
        NzListModule,
        NzToolTipModule,
        NzBadgeModule,
        NzCommentModule,
        NzCardModule,
        NzBackTopModule
    ],
    declarations: [
        BibliaComponent
    ],
    exports: [
        BibliaComponent
    ]
})
export class BibliaModule { }
