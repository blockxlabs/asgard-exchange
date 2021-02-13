import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MidgardConstants } from '../_classes/midgard-constants';
import { PoolAddressDTO } from '../_classes/pool-address';
import { TransactionDTO } from '../_classes/transaction';
import { LastBlock } from '../_classes/last-block';
import { PoolDTO } from '../_classes/pool';
import { MemberDTO } from '../_classes/member';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MidgardService {

  private v2BasePath: string;
  private devMidgardURL: string;

  constructor(private http: HttpClient) {
    this.v2BasePath = 'https://testnet.midgard.thorchain.info/v2';
    this.devMidgardURL= environment.devMidgardURL;
  }
  /**
   * V2 Endpoints
   *
   */

  getConstants(): Observable<MidgardConstants> {
    if(this.devMidgardURL){
      return this.http.get<MidgardConstants>(`${this.devMidgardURL}/constants`);
    }
    return this.http.get<MidgardConstants>(`${this.v2BasePath}/thorchain/constants`);
  }

  getLastBlock(): Observable<LastBlock[]> {
    if(this.devMidgardURL){
      return this.http.get<LastBlock[]>(`${this.devMidgardURL}//lastblock`);
    }
    return this.http.get<LastBlock[]>(`${this.v2BasePath}/thorchain/lastblock`);
  }


  getInboundAddresses(): Observable<PoolAddressDTO[]> {
    if(this.devMidgardURL){
      return this.http.get<PoolAddressDTO[]>(`${this.devMidgardURL}/inbound_addresses`);
    }
    return this.http.get<PoolAddressDTO[]>(`${this.v2BasePath}/thorchain/inbound_addresses`);
  }

  getPools(): Observable<PoolDTO[]> {
    if(this.devMidgardURL){
      return this.http.get<PoolDTO[]>(`${this.devMidgardURL}/pools`);
    }
    return this.http.get<PoolDTO[]>(`${this.v2BasePath}/pools`);
  }

  getPool(asset: string): Observable<PoolDTO> {
    if(this.devMidgardURL){
      return this.http.get<PoolDTO>(`${this.devMidgardURL}/pool/${asset}`);
    }
    return this.http.get<PoolDTO>(`${this.v2BasePath}/pool/${asset}`);
  }

  getMember(address: string): Observable<MemberDTO> {
    if(this.devMidgardURL){
      return this.http.get<MemberDTO>(`${this.devMidgardURL}/member/${address}`);
    }
    return this.http.get<MemberDTO>(`${this.v2BasePath}/member/${address}`);
  }

  getTransaction(txId: string): Observable<TransactionDTO> {

    const params = new HttpParams().set('offset', '0').set('limit', '1').set('txid', txId);
    if(this.devMidgardURL){
      return this.http.get<TransactionDTO>(`${this.devMidgardURL}/actions`, {params});
    }
    return this.http.get<TransactionDTO>(`${this.v2BasePath}/actions`, {params});
  }

}
