export class InfiniteScroll {

  constructor() {}

  OnScrollDown(event) {
    if(event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight === 0) {
      this.loadMore();
    }
  }

  loadMore() {
    throw new TypeError("Must override method loadMore from parent class InfiniteScroll.");
  }
}
