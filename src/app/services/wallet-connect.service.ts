import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Authorization} from "../authorization";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WalletConnectService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public async isValidKYC() {
    const response = await this.httpClient.get<Authorization[]>(environment.kycValidationEndpoint)
      .toPromise();

    return response;
  }
}
