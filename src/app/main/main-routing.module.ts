import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BibliaComponent } from "./biblia/biblia.component";

import { MainComponent } from "./main.component";

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'biblia'
            },
            {
                path: 'biblia',
                component: BibliaComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }