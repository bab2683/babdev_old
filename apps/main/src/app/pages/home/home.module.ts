import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing.module';
import { RouteComponent } from './route/route.component';

@NgModule({
  declarations: [RouteComponent],
  imports: [CommonModule, HomeRoutingModule]
})
export class HomeModule {}
