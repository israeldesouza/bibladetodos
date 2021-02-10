import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NzSpinModule } from 'ng-zorro-antd/spin';

import { BibliaModule } from './biblia/biblia.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';


@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,

        MainRoutingModule,
        BibliaModule,

        NzSpinModule
    ]
})
export class MainModule { }
