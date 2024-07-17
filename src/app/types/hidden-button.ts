export class HiddenButton {
  hidden: boolean = true;
  hide(): void {
    this.hidden = true
  }
  unhide(): void {
    this.hidden = false;
  }
}
