import { Component, HostListener, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime } from 'rxjs/operators';

import { OnChangeScreenSizeService } from "./on-change-screen-size/on-change-screen-size.service";

@Component({
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit{
    visible: boolean = false;
    onResizeDebounce: Subject<number> = new Subject<number>();

    constructor(private onChangeScreenSizeService: OnChangeScreenSizeService) {
        this.onChangeScreenSizeService
            .setSizeScreen(window.innerWidth);
    }

    ngOnInit(){
        this.onResizeDebounce
            .pipe(debounceTime(200))
            .subscribe((newSize: number) => {
                this.onChangeScreenSizeService.setSizeScreen(newSize);
            });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.onResizeDebounce.next(window.innerWidth);
    }
}