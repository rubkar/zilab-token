import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WalletConnectService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public isValidKYC() {
    return true;
    return this.httpClient.get<any[]>('https://wallet.gruuk.com/public/validate-authorization')
      .subscribe(
        (response) => {
          console.log(response);
          return true;
        },
        (error) => {
          console.log(error);
          return false;
        }
      );
  }
}
