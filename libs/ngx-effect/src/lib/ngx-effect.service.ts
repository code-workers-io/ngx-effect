import { ErrorHandler, Injectable, OnDestroy } from '@angular/core';
import {
  catchError,
  EMPTY,
  mergeMap,
  MonoTypeOperatorFunction,
  Observable,
  of,
  Subscription,
  tap
} from 'rxjs';

/**
 * Keeps track of your subscriptions and unsubscribes them automatically when destroyed.
 *
 * @example
 */
@Injectable()
export class NgxEffect implements OnDestroy {
  #sub = new Subscription();
  constructor(private readonly e: ErrorHandler) {}

  /**
   *
   * @example
   * ```typescript
   * keeper.register(of(1).subscribe(console.log));
   * ```
   */
  register(sub: Subscription): void;
  /**
   *
   * @example
   * ```typescript
   * keeper.register(of(1).pipe(tap(console.log)));
   * ```
   */
  register(o$: Observable<unknown>): void;
  /**
   *
   * @example
   * ```typescript
   * const trigger$ = of(1);
   * const effect = console.log;
   * keeper.register(trigger$, effect);
   * ```
   */
  register(o$: Observable<unknown>, operation: (v: unknown) => void): void;
  register(
    obsOrSub$: Observable<unknown> | Subscription,
    operation?: (v: unknown) => void
  ): void {
    if (obsOrSub$ instanceof Subscription) {
      this.#sub.add(obsOrSub$);
      return;
    }
    this.#sub.add(
      obsOrSub$
        .pipe(
          // execute operation/ side effect
          tap(operation),
          catchError((err) => {
            this.e.handleError(err);
            return EMPTY;
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }

  // need to wrap the source with this
  continueOnError =
    <T, R>(
      errorProneOperators: MonoTypeOperatorFunction<T>,
      errorObservable?: (err: Error) => Observable<T | R>
    ) =>
    (o$: Observable<T>): Observable<R | T> =>
      o$.pipe(
        mergeMap((v) =>
          of(v).pipe(
            errorProneOperators,
            catchError((err) => {
              this.e.handleError(err);
              return errorObservable ? errorObservable(err) : EMPTY;
            })
          )
        )
      );
}
