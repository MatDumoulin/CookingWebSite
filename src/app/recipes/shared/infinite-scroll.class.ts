// Children classes must implement the 'loadMore' function.
//
// How to use?: Call onScrollDown function of children class on the (scroll) event.
//              The 'loadMore' function will be called
export abstract class InfiniteScroll {

  // triggerDistance: The buffer (in pixels) in which the 'loadMore' function will be called.
  constructor(private triggerDistance:number = 0) {}

  onScrollDown(event) {
    if(event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight <= this.triggerDistance) {
      this.loadMore();
    }
  }

  loadMore() {
    throw new TypeError("Abstract function 'loadMore' of parent class 'InfiniteScroll' must be implemented in children class.");
  }
}
