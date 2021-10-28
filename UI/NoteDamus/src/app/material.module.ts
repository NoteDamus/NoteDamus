import { NgModule } from '@angular/core';
import { MatExpansionModule, } from '@angular/material/expansion';
import { MatDatepickerModule,} from '@angular/material/datepicker';
import { MatNativeDateModule,} from '@angular/material/core';
import { MatFormFieldModule,} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';


@NgModule({
  exports: [
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule { }