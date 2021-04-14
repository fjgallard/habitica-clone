import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectModalComponent } from './object-modal/object-modal.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    ObjectModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,

    MaterialModule
  ],
  exports: [
    ObjectModalComponent
  ]
})
export class ComponentsModule { }
