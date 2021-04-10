import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

// Common Modules here
const modules = [
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class MaterialModule { }
