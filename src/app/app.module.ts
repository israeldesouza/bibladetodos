import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import { IconsProviderModule } from './icons-provider.module';

import { NzSpinModule } from 'ng-zorro-antd/spin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(pt);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,

        NzSpinModule
    ],
    providers: [
        {
            provide: NZ_I18N,
            useValue: pt_BR
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
