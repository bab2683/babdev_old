import { ElementRef, Injectable } from '@angular/core';
import * as Slideout from 'slideout';
import { BehaviorSubject, Observable } from 'rxjs';

import { SidebarStatus } from './sidebar.enum';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public slide: any;
  public statusBehaviour: BehaviorSubject<SidebarStatus> = new BehaviorSubject(SidebarStatus.CLOSE);
  public status: Observable<SidebarStatus> = this.statusBehaviour.asObservable();

  constructor() {}

  public init(menu: ElementRef, panel: ElementRef) {
    console.log(menu, panel);

    this.slide = new Slideout({
      menu,
      panel
    });
  }

  public open() {
    this.slide.open();
  }

  public close() {
    this.slide.close();
  }
}
