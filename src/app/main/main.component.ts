import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import { SnackbarService } from '../shared/snackbar.service';
import mainAbi from '../contracts/abi/erc20.json';
import minimalAbi from '../contracts/abi/minimalAbi.json';
import presaleAbi from '../contracts/abi/presale.json';

/*
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
*/

const presaleAddress = '0x11e9a4554390B5304C6b96333195ee4d3B030Ed1';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

type Token = {
  address: string;
  token: string;
  balance: string;
  parityRate: string;
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  tokenAddresses = [
    {
      address: '',
      token: 'BNB',
      balance: '0',
      parityRate: '0',
    },
    {
      address: '0xF967692E2b7b1817f668300E2805cfCEd8A13A90',
      token: 'A',
      balance: '0',
      parityRate: '0',
    },
    {
      address: '0xdfEb02ed25fCf3466A7050B87Ce518CB868E0dBA',
      token: 'B',
      balance: '0',
      parityRate: '0',
    },
  ] as Token[];

  loading = false;
  metamaskConnected = false;
  account!: string;
  web3!: Web3;

  tokenBuyForm!: FormGroup;

  constructor(
    private readonly snackbar: SnackbarService,
    private readonly fb: FormBuilder
  ) {
    this.tokenBuyForm = this.fb.group({
      fromTokenSelect: ['BNB'],
      fromTokenInput: [null],
      toTokenSelect: [{ value: null, disabled: true }],
      toTokenInput: [null],
    });
  }
  // to check if metamask not loggedin
  ngOnInit(): void {
    this.connectWallet();
  }

  connectOrBuyText(): string {
    return this.metamaskConnected ? 'Buy Token' : 'Connect to Wallet';
  }

  changeSelectFromToken(tokenName: string): void {
    const token = this.getSavedToken(tokenName);
    this.fromTokenInputControl?.setValue(token?.balance);
    this.toTokenInputControl?.setValue(
      this.calculateParityFromTo(token?.parityRate, token?.balance)
    );
  }

  fromInputChange(value: string): void {
    const token = this.getSavedToken(this.fromTokenSelectControl?.value);
    this.toTokenInputControl?.setValue(
      this.calculateParityFromTo(token?.parityRate, value)
    );
  }

  toInputChange(value: string): void {
    const token = this.getSavedToken(this.fromTokenSelectControl?.value);
    this.fromTokenInputControl?.setValue(
      this.calculateParityToFrom(token?.parityRate, value)
    );
  }

  keyPressNumbersWithDecimal(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    console.log(charCode);
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    //console.log(event.target.value.split['.']);
    return true;
  }

  connectWalletOrBuy(): void {
    if (this.metamaskConnected) {
      this.buyToken();
    }

    if (!this.metamaskConnected) {
      this.connectWallet();
    }
  }

  get fromTokenSelectControl(): AbstractControl | null {
    return this.tokenBuyForm.get('fromTokenSelect');
  }

  get fromTokenInputControl(): AbstractControl | null {
    return this.tokenBuyForm.get('fromTokenInput');
  }

  get toTokenInputControl(): AbstractControl | null {
    return this.tokenBuyForm.get('toTokenInput');
  }

  private calculateParityToFrom(
    parityRate: string | undefined,
    value: string | undefined
  ): number {
    if (!parityRate || !value) {
      return 0;
    }
    return Number.parseFloat(value) * Number.parseFloat(parityRate);
  }

  private calculateParityFromTo(
    parityRate: string | undefined,
    value: string | undefined
  ): number {
    if (!parityRate || !value) {
      return 0;
    }
    return Number.parseFloat(value) / Number.parseFloat(parityRate);
  }

  private getSavedToken(tokenName: string): Token | undefined {
    return this.tokenAddresses.find((token) => token.token === tokenName);
  }

  private connectWallet = async () => {
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
        const bnbBalanceResponse = await this.web3.eth.getBalance(this.account);
        const bnbBalance = this.web3.utils.fromWei(bnbBalanceResponse);
        console.log(accounts);

        this.tokenAddresses.forEach(async (token) => {
          const presaleContract = new this.web3.eth.Contract(
            presaleAbi as any,
            presaleAddress
          );

          if (token.token === 'BNB') {
            token.balance = bnbBalance;
            const rateOfNativeCurrencyResponse = await presaleContract.methods
              .rate()
              .call();
            token.parityRate = this.web3.utils.fromWei(
              rateOfNativeCurrencyResponse
            );
            this.changeSelectFromToken(token.token);
            return;
          }

          const contract = new this.web3.eth.Contract(
            minimalAbi as any,
            token.address
          );
          const tokenBalance = await contract.methods
            .balanceOf(this.account)
            .call();

          token.balance = this.web3.utils.fromWei(tokenBalance);

          const rateOfToken = await presaleContract.methods
            .tokenPrices(token.address)
            .call();

          token.parityRate = this.web3.utils.fromWei(rateOfToken);
        });
        console.log(this.tokenAddresses);
      } catch (e) {
        this.snackbar.error(
          'Metamask grant failed! Please login in MetaMask',
          'OK'
        );
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

  private buyToken = async () => {
    this.loading = true;
    try {
      const presaleContract = new this.web3.eth.Contract(
        presaleAbi as any,
        presaleAddress
      );

      const selectedToken = this.getSavedToken(
        this.fromTokenSelectControl?.value
      );

      const tokenContract = new this.web3.eth.Contract(
        mainAbi as any,
        selectedToken?.address
      );

      // TODO Ask how much should?
      if (selectedToken?.token !== 'BNB') {
        const approveSpend = await tokenContract.methods
          .approve(presaleAddress, '1000000' + '0'.repeat(18))
          .send({ from: this.account });
        console.log('spend approved ', approveSpend);
      }

      if (selectedToken?.token === 'BNB') {
        const tokenBuy = await presaleContract.methods
          .buyToken(ZERO_ADDRESS, '0'.repeat(18))
          .send({
            from: this.account,
            value: this.web3.utils.toWei(
              this.fromTokenInputControl?.value.toString(),
              'ether'
            ),
          });

        console.log('buy', tokenBuy);
      } else {
        const tokenBuy = await presaleContract.methods
          .buyToken(
            selectedToken?.address,
            this.fromTokenInputControl?.value + '0'.repeat(18)
          )
          .send({ from: this.account });

        console.log('buy', tokenBuy);
      }

      this.snackbar.success('Presale was successful', '');

      this.tokenAddresses.forEach(async (token) => {
        if (!token.address) {
          const bnbBalanceResponse = await this.web3.eth.getBalance(
            this.account
          );
          const bnbBalance = this.web3.utils.fromWei(bnbBalanceResponse);
          token.balance = bnbBalance;
          return;
        }
        const contract = new this.web3.eth.Contract(
          minimalAbi as any,
          token.address
        );
        const tokenBalance = await contract.methods
          .balanceOf(this.account)
          .call();

        const balance = this.web3.utils.fromWei(tokenBalance);
        token.balance = balance;
      });
      console.log(this.tokenAddresses);
    } catch (error: any) {
      console.log(error);
      this.snackbar.error('Signing failed, please try again!', 'OK');
    } finally {
      this.loading = false;
    }
  };

  private isString(s: unknown) {
    return typeof s === 'string' || s instanceof String;
  }
}
