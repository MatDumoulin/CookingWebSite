import { Component, OnInit, Input, HostBinding } from "@angular/core";

@Component({
    selector: "mcb-grid-layout",
    templateUrl: "./grid-layout.component.html",
    styleUrls: ["./grid-layout.component.css"]
})
export class GridLayoutComponent implements OnInit {
    /** In pixels */
    private _gridWidth: number;
    /** In pixels */
    private _colWidth: number;

    // Host Bindings
    @HostBinding('style.width.px')
    set gridWidth(width: number) {
        this._gridWidth = width;
        this.updateColWidth();
    }
    get gridWidth(): number {
        return this._gridWidth;
    }


    // Inputs
    @Input() gutterSize = 10;
    @Input() set colWidth(width: number) {
        this._colWidth = width;
        this.updateColWidth();
    }
    get colWidth(): number {
        return this._colWidth;
    }

    columnCount = 0;

    constructor() {
        this.gridWidth = 500;
        this.colWidth = 100;
    }

    ngOnInit() {}

    private updateColWidth() {
        const currentGridWidth = this.gridWidth ? this.gridWidth : 0;
        // Take all space available if the current col width is invalid.
        const currentColWidth = this.colWidth && this.colWidth > 0 ? this.colWidth : 1;
        this.columnCount = Math.floor(currentGridWidth / currentColWidth);
        this._colWidth = Math.floor(currentGridWidth / this.columnCount); // Adjusting the width of the tiles.
    }
}
