import { Injectable } from '@angular/core';
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

  public init({
    menu,
    panel,
    openonInit = false
  }: {
    menu: Element;
    panel: Element;
    openonInit?: boolean;
  }) {
    this.slide = new Slideout({
      menu,
      panel,
      padding: this.getSidebarWidth(menu)
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

  public isOpen(): boolean {
    return this.slide.isOpen();
  }

  private getSidebarWidth(el: Element): number {
    return Number(getComputedStyle(el).width.replace('px', ''));
  }

  private updateObservable(status: SidebarStatus): void {
    this.statusBehaviour.next(status);
  }
}
