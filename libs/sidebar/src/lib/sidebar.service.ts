import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Slideout from 'slideout';

import { SidebarStatus } from './sidebar.enum';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public slide: any;
  public statusBehaviour: BehaviorSubject<SidebarStatus> = new BehaviorSubject(
    SidebarStatus.NOT_CREATED
  );
  public status$: Observable<SidebarStatus> = this.statusBehaviour.asObservable();

  constructor() {}

  public init(menu: ElementRef, panel: ElementRef, openonInit: boolean = false) {
    this.slide = new Slideout({
      menu,
      panel
    });

    if (openonInit) {
      this.open();
    } else {
      this.updateObservable(SidebarStatus.CLOSE);
    }
  }

  public open(): void {
    if (this.slide) {
      this.slide.open();
      this.updateObservable(SidebarStatus.OPEN);
    }
  }

  public close(): void {
    if (this.slide && this.slide.isOpen()) {
      this.slide.close();
      this.updateObservable(SidebarStatus.CLOSE);
    }
  }

  private updateObservable(status: SidebarStatus): void {
    this.statusBehaviour.next(status);
  }
}
