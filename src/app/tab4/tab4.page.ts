import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false,
})
export class Tab4Page {
  showHelp = false;

  constructor() {}

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }
}
