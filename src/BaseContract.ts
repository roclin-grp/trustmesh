import Web3 from 'web3'
import { Contract, BlockType } from 'web3/types'
import { getToBlockNumber } from './utils'

export abstract class BaseContract {
  public static info: IDeployInfo

  constructor(
    protected web3: Web3,
    protected contract: Contract,
  ) {}

  protected async getEventsData<T extends object>(
    eventName: string,
    options: IEventLogFilter,
  ): Promise<{ lastBlock: number, result: T[] }> {
    const lastBlock = await getToBlockNumber(this.web3, options.toBlock)
    const events = await this.contract.getPastEvents(eventName, { toBlock: lastBlock, ...options })
    const result: T[] = []

    for (const event of events) {
      const isPending = event.blockNumber === null
      if (isPending) {
        continue
      }

      result.push(event.returnValues as T)
    }

    return {
      lastBlock,
      result,
    }
  }
}

// FIXME: Make a PR to web3.js to make this an interface
export interface IEventLogFilter {
  filter?: object,
  fromBlock?: BlockType,
  toBlock?: BlockType,
  topics?: string[]
}
