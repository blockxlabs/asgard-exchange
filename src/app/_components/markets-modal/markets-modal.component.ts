import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Market } from 'src/app/_classes/market';
import { MidgardService } from 'src/app/_services/midgard.service';
import { Asset } from '../../_classes/asset';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-markets-modal',
  templateUrl: './markets-modal.component.html',
  styleUrls: ['./markets-modal.component.scss']
})
export class MarketsModalComponent implements OnInit, OnDestroy {

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(term: string) {
    this._searchTerm = term;

    if (term && term.length > 0) {
      this.filteredMarketListItems = this.marketListItems.filter( (asset) => {
        const search = term.toUpperCase();
        return asset.symbol.includes(search);
      });
    } else {
      this.filteredMarketListItems = this.marketListItems;
    }

  }
  _searchTerm: string;
  markets: Market[] = [];
  marketListItems: Asset[];
  filteredMarketListItems: Asset[];
  subs: Subscription[];

  constructor(
    private midgardService: MidgardService,
    @Inject(MAT_DIALOG_DATA) public data: {disabledAssetSymbol: string},
    public dialogRef: MatDialogRef<MarketsModalComponent>) {
      this.subs = [];
  }

  ngOnInit(): void {
    this.getPools();
  }

  getPools() {
    this.midgardService.getPools().subscribe(
      (res) => {

        const sortedByName = res.sort();

        this.marketListItems = sortedByName.map( (poolName) => new Asset(poolName) );
        this.marketListItems.unshift(
          new Asset(environment.network === 'chaosnet' ? 'RUNE-B1A' : 'RUNE-67C')
        );
        this.filteredMarketListItems = this.marketListItems;
      },
      (err) => console.error('error fetching pools: ', err)
    );
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

  selectItem(item: Asset) {

    if (item.symbol !== this.data.disabledAssetSymbol) {
      this.dialogRef.close(item);
    }

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
