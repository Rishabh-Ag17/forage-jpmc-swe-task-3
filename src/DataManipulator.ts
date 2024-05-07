import { timeStamp } from 'console';
import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  lower_bound: number,
  upper_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    const price_ABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2;
    const price_DEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2;
    const ratio = price_ABC/price_DEF;
    const upperbound = 1 + 0.05;
    const lowerbound = 1 - 0.05;
    return {
      price_abc: price_ABC,
      price_def: price_DEF,
      ratio,
      lower_bound: lowerbound,
      upper_bound: upperbound,
      trigger_alert: (ratio>upperbound|| ratio<lowerbound)?ratio:undefined,
      timestamp: serverResponds[0].timestamp>serverResponds[1].timestamp?serverResponds[0].timestamp:serverResponds[1].timestamp,
    }
  }
}
