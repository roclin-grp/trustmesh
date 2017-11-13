import { BigNumber } from 'bignumber.js' // TODO change to BN
import * as us from 'underscore'

//'{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
export declare interface JsonRPCRequest {
  jsonrpc: string
  method: string
  params: any[]
  id: number
}
export declare interface JsonRPCResponse {
  jsonrpc: string
  id: number
  result?: any
  error?: string
}

type Callback<T> = (error: Error, result: T) => void
type ABIDataTypes = "uint256" | "boolean" | "string" | "bytes" | string // TODO complete list
export declare interface Provider {
  send(payload: JsonRPCRequest, callback: (e: Error, val: JsonRPCResponse) => void)
}
type PromiEventType = "transactionHash" | "receipt" | "confirmation" | "error"
export declare interface PromiEvent<T> extends Promise<T> {
  once(type: "transactionHash", handler: (receipt: string) => void): PromiEvent<T>
  once(type: "receipt", handler: (receipt: TransactionReceipt) => void): PromiEvent<T>
  once(type: "confirmation", handler: (confNumber: number, receipt: TransactionReceipt) => void): PromiEvent<T>
  once(type: "error", handler: (error: Error) => void): PromiEvent<T>
  once(type: "error" | "confirmation" | "receipt" | "transactionHash", handler: (error: Error | TransactionReceipt | string) => void): PromiEvent<T>
  on(type: "transactionHash", handler: (receipt: string) => void): PromiEvent<T>
  on(type: "receipt", handler: (receipt: TransactionReceipt) => void): PromiEvent<T>
  on(type: "confirmation", handler: (confNumber: number, receipt: TransactionReceipt) => void): PromiEvent<T>
  on(type: "error", handler: (error: Error) => void): PromiEvent<T>
  on(type: "error" | "confirmation" | "receipt" | "transactionHash", handler: (error: Error | TransactionReceipt | string) => void): PromiEvent<T>
}
declare interface EventEmitter {
  on(type: "data", handler: (event: EventLog) => void): EventEmitter
  on(type: "changed", handler: (receipt: EventLog) => void): EventEmitter
  on(type: "error", handler: (error: Error) => void): EventEmitter
  on(type: "error" | "data" | "changed", handler: (error: Error | TransactionReceipt | string) => void): EventEmitter
}

declare interface TransactionObject<T> {
  arguments: any[]
  call(tx?: Tx): Promise<T>
  send(tx?: Tx): PromiEvent<T>
  estimateGas(tx?: Tx): Promise<number>
  encodeABI(): string
}

declare interface ABIDefinition {
  constant?: boolean
  payable?: boolean
  anonymous?: boolean
  inputs?: Array<{ name: string, type: ABIDataTypes, indexed?: boolean }>
  name?: string
  outputs?: Array<{ name: string, type: ABIDataTypes }>
  type: "function" | "constructor" | "event" | "fallback"
}
declare interface CompileResult {
  code: string
  info: {
    source: string
    language: string
    languageVersion: string
    compilerVersion: string
    abiDefinition: Array<ABIDefinition>
  }
  userDoc: { methods: object }
  developerDoc: { methods: object }


}
declare interface Transaction {
  hash: string
  nonce: number
  blockHash: string
  blockNumber: number
  transactionIndex: number
  from: string
  to: string
  value: string
  gasPrice: string
  gas: number
  input: string
  v?: string
  r?: string
  s?: string
}
declare interface EventLog {
  event: string
  address: string
  returnValues: object
  logIndex: number
  transactionIndex: number
  transactionHash: string
  blockHash: string
  blockNumber: number
  raw?: { data: string, topics: any[] }
}
export declare interface TransactionReceipt {
  transactionHash: string
  transactionIndex: number
  blockHash: string
  blockNumber: number
  from: string
  to: string
  contractAddress: string
  cumulativeGasUsed: number
  gasUsed: number
  logs?: Array<Log>
  events?: {
    [eventName: string]: EventLog
  }
}
declare interface BlockHeader {
  number: number
  hash: string
  parentHash: string
  nonce: string
  sha3Uncles: string
  logsBloom: string
  transactionRoot: string
  stateRoot: string
  receiptRoot: string
  miner: string
  extraData: string
  gasLimit: number
  gasUsed: number
  timestamp: number
}
declare interface Block extends BlockHeader {
  transactions: Array<Transaction>
  size: number
  difficulty: number
  totalDifficulty: number
  uncles: Array<string>
}
declare interface Logs {
  fromBlock?: number
  address?: string
  topics?: Array<string | string[]>

}
declare interface Log {
  address: string
  data: string
  topics: Array<string>
  logIndex: number
  transactionHash: string
  transactionIndex: number
  blockHash: string
  blockNumber: number

}
declare interface Subscribe<T> {
  subscription: {
    id: string
    subscribe(callback?: Callback<Subscribe<T>>): Subscribe<T>
    unsubscribe(callback?: Callback<boolean>): void | boolean
    arguments: object
  }
  /*  on(type: "data" , handler:(data:Transaction)=>void): void
    on(type: "changed" , handler:(data:Logs)=>void): void
    on(type: "error" , handler:(data:Error)=>void): void
    on(type: "block" , handler:(data:BlockHeader)=>void): void
    */
  on(type: "data", handler: (data: T) => void): void
  on(type: "changed", handler: (data: T) => void): void
  on(type: "error", handler: (data: Error) => void): void
}
declare interface Account {
  address: string
  privateKey: string
  publicKey: string

}
declare interface PrivateKey {
  address: string
  Crypto: {
    cipher: string,
    ciphertext: string,
    cipherparams: {
      iv: string
    },
    kdf: string,
    kdfparams: {
      dklen: number,
      n: number,
      p: number,
      r: number,
      salt: string
    },
    mac: string
  },
  id: string,
  version: number
}

declare interface Signature {
  message: string
  hash: string
  r: string
  s: string
  v: string
}
declare interface Tx {
  nonce?: string | number
  chainId?: string | number
  from?: string
  to?: string
  data?: string
  value?: string | number
  gas?: string | number
  gasPrice?: string | number
}
declare interface WebsocketProvider extends Provider { }
declare interface HttpProvider extends Provider { }
declare interface IpcProvider extends Provider { }
type Unit = "kwei" | "femtoether" | "babbage" | "mwei" | "picoether" | "lovelace" | "qwei" | "nanoether" | "shannon" | "microether" | "szabo" | "nano" | "micro" | "milliether" | "finney" | "milli" | "ether" | "kether" | "grand" | "mether" | "gether" | "tether"
export type BlockType = "latest" | "pending" | "genesis" | number
declare interface Iban { }
declare interface Utils {
  BN: BigNumber // TODO only static-definition
  isBN(any): boolean
  isBigNumber(any): boolean
  isAddress(any): boolean
  isHex(any): boolean
  _: us.UnderscoreStatic
  asciiToHex(val: string): string
  hexToAscii(val: string): string
  bytesToHex(val: number[]): string
  numberToHex(val: number | BigNumber): string
  checkAddressChecksum(address: string): boolean
  fromAscii(val: string): string
  fromDecimal(val: string | number | BigNumber): string
  fromUtf8(val: string): string
  fromWei(val: string | number | BigNumber, unit: Unit): string | BigNumber
  hexToBytes(val: string): number[]
  hexToNumber(val: string | number | BigNumber): number
  hexToNumberString(val: string | number | BigNumber): string
  hexToString(val: string): string
  hexToUtf8(val: string): string
  keccak256(val: string): string
  leftPad(string: string, chars: number, sign: string): string
  padLeft(string: string, chars: number, sign: string): string
  rightPad(string: string, chars: number, sign: string): string
  padRight(string: string, chars: number, sign: string): string
  sha3(val: string, val2?:string, val3?:string, val4?:string, val5?:string): string
  soliditySha3(val: string): string
  randomHex(bytes: number): string
  stringToHex(val: string): string
  toAscii(hex: string): string
  toBN(any): BigNumber
  toChecksumAddress(val: string): string
  toDecimal(val: any): number
  toHex(val: any): string
  toUtf8(val: any): string
  toWei(val: string | number | BigNumber, unit: Unit): string | BigNumber
  unitMap: any
}
export declare interface Contract {
  options: {
    address: string
    jsonInterface: ABIDefinition[]
  }
  methods: {
    [fnName: string]: (...args) => TransactionObject<any>
  }
  deploy(options: {
    data: string
    arguments: any[]
  }): TransactionObject<Contract>
  events: {
    [eventName: string]: (options?: {
      filter?: object
      fromBlock?: BlockType
      topics?: any[]
    }, cb?: Callback<EventLog>) => EventEmitter
    allEvents: (options?: { filter?: object, fromBlock?: BlockType, topics?: any[] }, cb?: Callback<EventLog>) => EventEmitter
  }

}
declare interface Request { }
declare interface Providers {
  WebsocketProvider: new (host: string, timeout?: number) => WebsocketProvider
  HttpProvider: new (host: string, timeout?: number) => HttpProvider
  IpcProvider: new (path: string, net: any) => IpcProvider
}

declare class Eth {
  defaultAccount: string
  defaultBlock: BlockType
  BatchRequest: new () => BatchRequest
  Iban: new (address: string) => Iban
  Contract: new (jsonInterface: any[], address?: string, options?: {
    from?: string
    gas?: string | number | BigNumber
    gasPrice?: number
    data?: string
  }) => Contract
  abi: {
    decodeLog(inputs: object, hexString: string, topics: string[]): object
    encodeParameter(type: string, parameter: any): string
    encodeParameters(types: string[], paramaters: any[]): string
    encodeEventSignature(name: string | object): string
    encodeFunctionCall(jsonInterface: object, parameters: any[]): string
    encodeFunctionSignature(name: string | object): string
    decodeParameter(type: string, hex: string): any
    decodeParameters(types: string[], hex: string): any
  }
  accounts: {
    'new'(entropy?: string): Account
    privateToAccount(privKey: string): Account
    publicToAddress(key: string): string
    signTransaction(tx: Tx, privateKey: string, returnSignature?: boolean, cb?: (err: Error, result: string | Signature) => void): Promise<string> | Signature
    recoverTransaction(signature: string | Signature): string
    sign(data: string, privateKey: string, returnSignature?: boolean): string | Signature
    recover(signature: string | Signature): string
    encrypt(privateKey: string, password: string): PrivateKey
    decrypt(privateKey: PrivateKey, password: string): Account
    wallet: {
      'new'(numberOfAccounts: number, entropy: string): Account[]
      add(account: string | Account): any
      remove(account: string | number): any
      save(password: string, keyname?: string): string
      load(password: string, keyname: string): any
      clear(): any
    }
  }
  call(callObject: Tx, defaultBloc?: BlockType, callBack?: Callback<string>): Promise<string>
  clearSubscriptions(): boolean
  subscribe(type: "logs", options?: Logs, callback?: Callback<Subscribe<Log>>): Promise<Subscribe<Log>>
  subscribe(type: "syncing", callback?: Callback<Subscribe<any>>): Promise<Subscribe<any>>
  subscribe(type: "newBlockHeaders", callback?: Callback<Subscribe<BlockHeader>>): Promise<Subscribe<BlockHeader>>
  subscribe(type: "pendingTransactions", callback?: Callback<Subscribe<Transaction>>): Promise<Subscribe<Transaction>>
  subscribe(type: "pendingTransactions" | "newBlockHeaders" | "syncing" | "logs", options?: Logs, callback?: Callback<Subscribe<Transaction | BlockHeader | any>>): Promise<Subscribe<Transaction | BlockHeader | any>>

  unsubscribe(callBack: Callback<boolean>): void | boolean
  compile: {
    solidity(source: string, callback?: Callback<CompileResult>): Promise<CompileResult>
    lll(source: string, callback?: Callback<CompileResult>): Promise<CompileResult>
    serpent(source: string, callback?: Callback<CompileResult>): Promise<CompileResult>
  }
  currentProvider: Provider
  estimateGas(tx: Tx, callback?: Callback<number>): Promise<number>
  getAccounts(cb?: Callback<Array<string>>): Promise<Array<string>>
  getBalance(address: string, defaultBlock?: BlockType, cb?: Callback<number>): Promise<number>
  getBlock(number: BlockType, returnTransactionObjects?: boolean, cb?: Callback<Block>): Promise<Block>
  getBlockNumber(callback?: Callback<number>): Promise<number>
  getBlockTransactionCount(number: BlockType | string, cb?: Callback<number>): Promise<number>
  getBlockUncleCount(number: BlockType | string, cb?: Callback<number>): Promise<number>
  getCode(address: string, defaultBlock?: BlockType, cb?: Callback<string>): Promise<string>
  getCoinbase(cb?: Callback<string>): Promise<string>
  getCompilers(cb?: Callback<string[]>): Promise<string[]>
  getGasPrice(cb?: Callback<number>): Promise<number>
  getHashrate(cb?: Callback<number>): Promise<number>
  getPastLogs(options: {
    fromBlock?: BlockType
    toBlock?: BlockType
    address: string
    topics?: Array<string | Array<string>>
  }, cb?: Callback<Array<Log>>): Promise<Array<Log>>
  getProtocolVersion(cb?: Callback<string>): Promise<string>
  getStorageAt(address: string, defaultBlock?: BlockType, cb?: Callback<string>): Promise<string>
  getTransactionReceipt(hash: string, cb?: Callback<TransactionReceipt>): Promise<TransactionReceipt>
  getTransaction(hash: string, cb?: Callback<Transaction>): Promise<Transaction>
  getTransactionCount(address: string, defaultBlock?: BlockType, cb?: Callback<number>): Promise<number>
  getTransactionFromBlock(block: BlockType, index: number, cb?: Callback<Transaction>): Promise<Transaction>
  getUncle(blockHashOrBlockNumber: BlockType | string, uncleIndex: number, returnTransactionObjects?: boolean, cb?: Callback<Block>): Promise<Block>
  getWork(cb?: Callback<Array<string>>): Promise<Array<string>>
  givenProvider: Provider
  isMining(cb?: Callback<boolean>): Promise<boolean>
  isSyncing(cb?: Callback<boolean>): Promise<boolean>
  net: Net
  personal: Personal
  sendSignedTransaction(data: string, cb?: Callback<string>): PromiEvent<TransactionReceipt>
  sendTransaction(tx: Tx, cb?: Callback<string>): PromiEvent<TransactionReceipt>
  submitWork(nonce: string, powHash: string, digest: string, cb?: Callback<boolean>): Promise<boolean>
  sign(address: string, dataToSign: string, cb?: Callback<string>): Promise<string>
}
declare class Net {

}
declare class Personal {
  newAccount(password: string, cb?: Callback<boolean>): Promise<boolean>
  getAccounts(cb?: Callback<Array<string>>): Promise<Array<string>>
  importRawKey()
  lockAccount()
  unlockAccount()
  sign()
}
declare class Shh { }
declare class Bzz { }
declare class BatchRequest {
  constructor()
  add(request: Request): void //
  execute(): void
}

export declare class Web3 {
  static providers: Providers
  static givenProvider: Provider
  static modules: {
    Eth: new (provider: Provider) => Eth
    Net: new (provider: Provider) => Net
    Personal: new (provider: Provider) => Personal
    Shh: new (provider: Provider) => Shh
    Bzz: new (provider: Provider) => Bzz
  }
  constructor(provider: Provider)
  version: string
  BatchRequest: new () => BatchRequest
  extend(methods: any): any // TODO
  bzz: Bzz
  currentProvider: Provider
  eth: Eth
  ssh: Shh
  givenProvider: Provider
  providers: Providers
  setProvider(provider: Provider): void
  utils: Utils
}