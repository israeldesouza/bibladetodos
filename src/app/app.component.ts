import { Component, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { OnChangeScreenSizeService } from './pages/on-change-screen-size/on-change-screen-size.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
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
