/**
* RxJs + EventBus
*
*
* @langversion TypeScript 2.0
* @tiptext
*
*/

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ToRxEmitterOperator } from './torxemitteroperator';

export function toRxEmitter<T>(this: Observable<T>, a: any, b?: any): Subscription {
    let eventObj: any = typeof a == 'object' ? a : { eventName: a, map: b };
    if (eventObj.name) eventObj.eventName = eventObj.name;
    if (eventObj.event) eventObj.eventName = eventObj.event;

    return this.lift(new ToRxEmitterOperator(eventObj))
        .subscribe(x => { eventObj.log && console.log(x); });
}

Observable.prototype.toRxEmitter = toRxEmitter;
declare module 'rxjs/Observable' {
    interface Observable<T> {
        toRxEmitter: typeof toRxEmitter;
    }
}
