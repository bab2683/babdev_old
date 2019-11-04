import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { SidebarStatus } from '../../sidebar.enum';
import { SidebarService } from '../../sidebar.service';

@Component({
  selector: 'babdev-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('menu', { static: false }) menu: ElementRef;
  @ViewChild('panel', { static: false }) panel: ElementRef;

  public status$: Observable<Boolean>;

  constructor(private sidebarService: SidebarService) {
    this.status$ = this.sidebarService.status$.pipe(
      delay(0),
      map(status => status === SidebarStatus.CLOSE)
    );
  }

  public ngAfterViewInit(): void {
    this.sidebarService.init(this.menu.nativeElement, this.panel.nativeElement);
  }
}
