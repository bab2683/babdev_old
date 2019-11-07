import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { debounce } from '@babdev/utils';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { SidebarStatus } from '../../sidebar.enum';
import { SidebarService } from '../../sidebar.service';

@Component({
  selector: 'babdev-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements AfterViewInit, OnInit {
  @Input() public responsive: boolean = false;
  @Input() public responsiveLimit: number;
  @HostBinding('class.babdev-sidebar--responsive') public responsiveSidebar: boolean;

  @ViewChild('menu', { static: false }) private menu: ElementRef<Element>;
  @ViewChild('panel', { static: false }) private panel: ElementRef<Element>;

  public status$: Observable<Boolean>;

  constructor(
    private sidebarService: SidebarService,
    @Inject(PLATFORM_ID) private platformId: string,
    private ngZone: NgZone,
    private ref: ChangeDetectorRef
  ) {
    this.status$ = this.sidebarService.status$.pipe(
      delay(0),
      map(status => status === SidebarStatus.CLOSE)
    );
  }

  public ngOnInit(): void {
    if (this.isReponsive()) {
      this.responsiveSidebar = true;
      this.ref.markForCheck();
    }
  }

  public ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.sidebarService.init({
        menu: this.menu.nativeElement,
        panel: this.panel.nativeElement
      });

      if (this.isReponsive) {
        this.handleResponsiveness();
      }
    }
  }

  private isReponsive(): boolean {
    return this.responsive && !!this.responsiveLimit;
  }

  private handleResponsiveness(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener(
        'resize',
        debounce(
          () => {
            this.ngZone.run(() => {
              if (this.sidebarService.isOpen()) {
                this.sidebarService.close();
              }
            });
          },
          100,
          true
        )
      );
    });
  }
}
