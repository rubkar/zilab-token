import { Component, OnInit } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import { SnackbarService } from '../shared/snackbar.service';
import { ContractService } from './contract.service';
import mainAbi from './erc20.json';
import presaleAbi from './presale.json';
import minimalAbi from './minimalAbi.json';

const tokenAddresses = [
  {
    address: '0xF967692E2b7b1817f668300E2805cfCEd8A13A90',
    token: 'A',
    balance: 0,
  },
  {
    address: '0xdfEb02ed25fCf3466A7050B87Ce518CB868E0dBA',
    token: 'B',
    balance: 0,
  },
  {
    address: '0x353fe7a233a6bF60fC3c4F3645BA467e3f33e3b4',
    token: 'HUA',
    balance: 0,
  },
  {
    address: '0x29E8D7a08c87250E0F8E6874Ef755d7C737da07E',
    token: 'HAR',
    balance: 0,
  },
];

const presaleAddress = '0x11e9a4554390B5304C6b96333195ee4d3B030Ed1';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  loading = false;
  metamaskConnected = false;
  account!: string;
  web3!: Web3;
  bnbBalance!: string;

  constructor(
    private service: ContractService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.connectWallet();
  }

  connectOrBuyText(): string {
    return this.metamaskConnected ? 'Buy Token' : 'Connect to Wallet';
  }

  connectWallet = async () => {
    this.loading = true;
    const provider = await detectEthereumProvider({
      mustBeMetaMask: true,
    });
    if (provider) {
      try {
        const accounts = await (provider as any).request({
          method: 'eth_requestAccounts',
        });
        if (accounts) {
          this.metamaskConnected = true;
        }
        this.account = accounts[0];
        this.web3 = new Web3(provider as any);
        this.web3.eth.getBalance(this.account).then((balance) => {
          console.log(balance);
          const fromWei = this.web3.utils.fromWei(balance);
          console.log(fromWei);
          this.bnbBalance = fromWei;
        });
        console.log(accounts);

        tokenAddresses.forEach(async (token) => {
          const contract = new this.web3.eth.Contract(
            minimalAbi as any,
            token.address
          );
          const tokenBalance = await contract.methods
            .balanceOf(this.account)
            .call();

          console.log(
            'token: ' + token.token,
            this.web3.utils.fromWei(tokenBalance)
          );
        });
      } catch (e) {
        this.snackbar.error('Metamask grant failed!', 'OK');
        console.error(e);
      }
    } else {
      const snackRef = this.snackbar.error('Please install MetaMask', 'OK');
      snackRef.afterDismissed().subscribe(() => {
        window.open('https://metamask.io', '_blank');
      });
    }
    this.loading = false;
  };

  buyToken = async () => {
    const presaleContract = new this.web3.eth.Contract(
      presaleAbi as any,
      presaleAddress
    );

    const aMainContract = new this.web3.eth.Contract(
      mainAbi as any,
      tokenAddresses[0].address
    );

    const bMainContract = new this.web3.eth.Contract(
      mainAbi as any,
      tokenAddresses[1].address
    );

    const rateOfNativeCur = await presaleContract.methods.rate().call();

    console.log('rateOfNativeCur', rateOfNativeCur);
    console.log('rateOfNativeCur', this.web3.utils.fromWei(rateOfNativeCur));

    const rateOfA = await presaleContract.methods
      .tokenPrices(tokenAddresses[0].address) //'0xF967692E2b7b1817f668300E2805cfCEd8A13A90') //tokenAddresses[0].address)
      .call();
    const rateOfB = await presaleContract.methods
      .tokenPrices(tokenAddresses[1].address)
      .call();

    console.log('rateOfA', rateOfA);
    console.log('rateOfA', this.web3.utils.fromWei(rateOfA));

    console.log('rateOfB', rateOfB);
    console.log('rateOfB', this.web3.utils.fromWei(rateOfB));

    //String(10) + '0'.repeat(18)
    let amount = this.web3.utils.toWei('1000000', 'mwei');
    /*let data = presaleContract.methods
      .buyToken(tokenAddresses[0].address, amount)
      .encodeABI();
    let gas = await this.web3.eth.estimateGas({
      value,
      data,
      from: this.account,
      to: presaleAddress,
    });*/

    /*const tokenBuyTx = await presaleContract.methods
      .buyToken(tokenAddresses[0].address, amount)
      .send({ from: this.account, gas: '100000' }); //, gas: '20000000000'*/
    //String(1000) + '0'.repeat(18)

    //const amountToSpend = 10;

    const approveSpend = await bMainContract.methods
      .approve(presaleAddress, '1000000' + '0'.repeat(18))
      .send({ from: this.account });

    console.log('spend aapproved ', approveSpend);

    const tokenBuy = await presaleContract.methods
      .buyToken(tokenAddresses[1].address, '101' + '0'.repeat(18))
      .send({ from: this.account });

    console.log('buyyy', tokenBuy);

    //call({ from: this.account, gas: '20000000000' }); //tokenAddresses[0].address)

    //await tokenBuyTx.wait(1);
    //console.log('buyyyyy', tokenBuyTx);
    /*const testNet = new Web3(
      'https://data-seed-prebsc-1-s1.binance.org:8545'
    );*/

    /*const contract = new this.web3.eth.Contract(
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
          type: 'function',
        },
      ],
      tokenAddresses[3].address,
      {
        from: this.account,
      }
    );*/

    //const val = await contract.methods.balanceOf(this.account).call();
    //console.log('BALLLL', this.web3.utils.fromWei(val));

    tokenAddresses.forEach(async (token) => {
      const contract = new this.web3.eth.Contract(
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
            type: 'function',
          },
        ],
        token.address
      );
      const tokenBalance = await contract.methods
        .balanceOf(this.account)
        .call();

      console.log(
        'token: ' + token.token,
        this.web3.utils.fromWei(tokenBalance)
      );
    });
  };

  keyPressNumbersWithDecimal(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}
