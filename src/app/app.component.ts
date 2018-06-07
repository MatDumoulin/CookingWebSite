import { Component, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
// Router animation
import { fadeAnimation } from "./routing/animations";

@Component({
    selector: "mcb-app",
    templateUrl: "app.html",
    animations: [fadeAnimation] // register the animation
})
export class AppComponent implements OnDestroy {
    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    isUserOnMobile = true;
    // Display options for the sidenav when it is on desktop;
    readonly desktopSidenavOptions: SidenavOptions = {
        fixedInViewport: true,
        disableClose: true,
        mode: "side",
        opened: true,
        fixedTopGap: 64
    };
    // Display options for the sidenav when it is on mobile;
    readonly mobileSidenavOptions: SidenavOptions = {
        fixedInViewport: false,
        disableClose: false,
        mode: "over",
        opened: false,
        fixedTopGap: 0
    };

    sidenavOptions: SidenavOptions;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        // Listening to the screen size in order to display either in mobile or desktop mode.
        this.mobileQuery = media.matchMedia("(max-width: 600px)");
        this._mobileQueryListener = () => {
            this.handleScreenChange();
            changeDetectorRef.detectChanges();
        };
        this.mobileQuery.addListener(this._mobileQueryListener);

        // Setting up the sidenav for mobile if the user is on mobile,
        // Or for desktop if the user is on desktop.
        this.handleScreenChange();
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    private isMobile(): boolean {
        return this.mobileQuery.matches;
    }

    private handleScreenChange() {
        // If the user is not on mobile anymore, change display to desktop
        if (this.isUserOnMobile && !this.isMobile()) {
            this.isUserOnMobile = false;
            this.sidenavOptions = this.desktopSidenavOptions;
        }
        // If user is not on desktop anymore, change display to mobile.
        else if (!this.isUserOnMobile && this.isMobile()) {
            this.isUserOnMobile = true;
            this.sidenavOptions = this.mobileSidenavOptions;
        }
    }
}

interface SidenavOptions {
    fixedInViewport: boolean;
    disableClose: boolean;
    mode: string;
    opened: boolean;
    fixedTopGap: number;
}
