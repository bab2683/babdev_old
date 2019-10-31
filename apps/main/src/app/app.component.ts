import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from '@babdev/sidebar';

@Component({
  selector: 'babdev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('panel', { static: false }) panel: ElementRef;
  @ViewChild('menu', { static: false }) menu: ElementRef;

  title = 'main';

  constructor(private sidebarService: SidebarService) {}

  public ngOnInit() {
    console.log(this.sidebarService);
    console.log(this.menu, this.panel);
    this.sidebarService.init(this.menu, this.panel);
  }
}
