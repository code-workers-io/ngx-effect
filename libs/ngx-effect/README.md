# @code-workers.io/ngx-effect

You don't longer need to worry about handling subscriptions - stream-keeper will do it for you.

## Installation

```bash
npm install @code-workers.io/ngx-effect
```

## Usage

```typescript

@Component({
  ...
    providers: [NgxEffect]
})
export class Component {

  constructor(private effects: NgxEffect) {
    this.effects.register(observable$, console.log)
    this.effects.register(observable$.subscribe(console.log))
  }
  
}

```

## Compatibility
* Version >= 1.1.x is compatible with RxJs >=6.5.0 (Angular 12.x.x +)
