import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { User } from "../../models/user.model";

@Component({
    selector: "mcb-avatar",
    templateUrl: "./avatar.component.html",
    styleUrls: ["./avatar.component.css"]
})
export class AvatarComponent implements OnInit {
    @Input() user: User;

    @Output() logout = new EventEmitter<void>();
    @Output() login = new EventEmitter<void>();

    constructor() {}

    ngOnInit() {}
}
