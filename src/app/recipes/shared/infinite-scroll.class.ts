// Children classes must implement the 'loadMore' function.
//
// How to use?: Call onScrollDown function of children class on the (scroll) event.
//              The 'loadMore' function will be called
export abstract class InfiniteScroll {
    private isLoading = false;

    // triggerDistance: The buffer (in pixels) in which the 'loadMore' function will be called.
    constructor(private triggerDistance: number = 0) { }

    onScrollDown(event) {
        if (!this.isLoading) {
            // And is at the bottom of its container.
            if (event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight <= this.triggerDistance) {
                this.isLoading = true;
                this.loadMore().then(() => this.isLoading = false);
            }
        }
    }

    loadMore(): Promise<any> {
        throw new TypeError("Abstract function 'loadMore' of parent class 'InfiniteScroll' must be implemented in children class.");
    }
}
