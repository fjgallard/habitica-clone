import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectModalComponent } from './object-modal/object-modal.component';

import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ObjectModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    ObjectModalComponent
  ]
})
export class ComponentsModule { }
