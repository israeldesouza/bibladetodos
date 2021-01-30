import { HostListener, Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OnChangeScreenSizeService {

    private innerWidth$ = new ReplaySubject<number>(0);

    constructor(){}

    setSizeScreen(size: number) {
        this.innerWidth$.next(size);
    }

    getScreenSize(){
        return this.innerWidth$.asObservable();
    }


}