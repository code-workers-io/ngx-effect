# @code-workers.io/ngx-effect

You don't longer need to worry about handling subscriptions - ngx-effect will do it for you.

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
* Version 1.x.x is compatible with RxJs >=7.4.0 (Angular 13.x.x +)
