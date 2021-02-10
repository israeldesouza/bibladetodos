import { Component, OnInit } from "@angular/core";
import { LoadingService } from "./loading/loading.service";

@Component({
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit{

    isloading: boolean = true;

    constructor(private loadingService: LoadingService) { }

    ngOnInit(){
        this.loadingService.getLoading().subscribe(loading => this.isloading = loading);
    }

}