import { Inject, Injectable } from '@angular/core';
import Web3 from 'web3';
import { WEB3 } from './Web3';

const abi = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

@Injectable({ providedIn: 'root' })
export class ContractService {
  private address = '0x35552c16704d214347f29fa77f77da6d75d7c752';
  private contract: any;
  private accounts: string[] = [];

  constructor() {
    //@Inject(WEB3) private web3: Web3) {
    /*this.init()
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });*/
  }

  /*private async init() {
    // await this.web3.currentProvider.enable();
    this.accounts = await this.web3.eth.getAccounts();

    /*this.contract = new this.web3.eth.Contract(
      [
        {
          constant: true,
          inputs: [
            {
              name: '_owner',
              type: 'address',
            },
          ],
          name: 'balanceOf',
          outputs: [
            {
              name: 'balance',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ],
      this.address
    );*/

  /*this.contract.methods
      .balanceOf('0xb87452f101403aa837f4E2aebd65AB9c897da534')
      .call(function (err: any, res: any) {
        if (err) {
          console.log('An error occured', err);
          return;
        }
        console.log('The balance is: ', res);
      });
  }*/
}
