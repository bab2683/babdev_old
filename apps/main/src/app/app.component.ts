import { Component } from '@angular/core';
import { MOBILE_LIMIT } from '@constants';

@Component({
  selector: 'babdev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public responsiveLimit: number = MOBILE_LIMIT;
  public title = 'main';
}
