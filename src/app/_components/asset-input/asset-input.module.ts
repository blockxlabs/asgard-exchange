import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssetInputComponent } from './asset-input.component';
import { MarketsModalModule } from '../markets-modal/markets-modal.module';

/** MATERIAL */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [AssetInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MarketsModalModule,
    MatIconModule
  ],
  exports: [AssetInputComponent]
})
export class AssetInputModule { }