import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { startWith } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    //private loadingSubject$ = new BehaviorSubject<boolean>(true);
    private loadingSubject$: Subject<boolean> = new Subject<boolean>();

    getLoading(){
        return  this.loadingSubject$
                    .asObservable()
                    .pipe(startWith(false));
    }

    start(){
        this.loadingSubject$.next(true);
    }

    stop(){
        this.loadingSubject$.next(false);
    }
}