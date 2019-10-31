import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CloseComponent } from './components/close/close.component';
import { OpenComponent } from './components/open/open.component';

@NgModule({
  declarations: [SidebarComponent, CloseComponent, OpenComponent],
  exports: [SidebarComponent],
  imports: [CommonModule]
})
export class SidebarModule {}
