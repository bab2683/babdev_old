import { Component } from '@angular/core';
import { SidebarService } from '../../sidebar.service';

@Component({
  selector: 'babdev-sidebar-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class CloseComponent {
  constructor(private sidebarService: SidebarService) {}

  public close(): void {
    this.sidebarService.close();
  }
}
