import { Component } from '@angular/core';
import { LoadingService } from './main/loading/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {

    isloading: boolean = true;

    constructor(private loadingService: LoadingService){
        loadingService.getLoading().subscribe(loading => this.isloading = loading);
    }
}
