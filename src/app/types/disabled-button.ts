export class DisabledButton {
  disabled: boolean = true;
  disable(): void {
    this.disabled = true
  }
  enable(): void {
    this.disabled = false;
  }
}
