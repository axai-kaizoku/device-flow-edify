export const eventManager = {
  list: new Map(),
  on(event: any, callback: any) {
    this.list.has(event) || this.list.set(event, []);
    this.list.get(event)!.push((e: any) => {
      callback(e);
    });
  },
  emit(event: any, ...args: any) {
    this.list.has(event) &&
      this.list.get(event)!.forEach((callback: any) => {
        callback(...args);
      });
  },
};
