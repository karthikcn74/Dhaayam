import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

export let fade = trigger('check',[
  transition('void <=> *', [
    style({
      opacity: 1,
      backgroundColor: 'yellow'
    }),
    animate('3s',style({backgroundColor: 'blue', opacity: 1}))
  ]),
])
