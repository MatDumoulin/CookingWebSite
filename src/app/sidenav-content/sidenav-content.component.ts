import { Component, OnInit, Output, EventEmitter } from "@angular/core";

interface SidenavItem {
    text: string;
    routerLink: string[];
    icon: string;
}

@Component({
    selector: "mcb-sidenav-content",
    templateUrl: "./sidenav-content.component.html",
    styleUrls: ["./sidenav-content.component.css"]
})
export class SidenavContentComponent implements OnInit {
    @Output() itemClick = new EventEmitter();

    items: SidenavItem[] = [
        /*{
            text: "Accueil",
            routerLink: ['/home'],
            icon: "home"
        },*/
        {
            text: "Mes recettes",
            routerLink: ['/recipes'],
            icon: "library_books"
        },
        {
            text: "Créer une recette",
            routerLink: ['/recipe/create'],
            icon: "note_add"
        },
    ];

    constructor() {}

    ngOnInit() {}

    emitClick(): void {
        this.itemClick.emit();
    }
}
