import { Component } from '@angular/core';
import { SidebarService } from '../../sidebar.service';

@Component({
  selector: 'babdev-sidebar-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss']
})
export class OpenComponent {
  constructor(private sidebarService: SidebarService) {}

  public open(): void {
    this.sidebarService.open();
  }
}
