import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Common Modules here
const modules = [
  MatButtonModule,
  MatIconModule
];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class MaterialModule { }
