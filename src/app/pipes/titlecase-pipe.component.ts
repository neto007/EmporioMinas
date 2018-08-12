import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-titlecase-pipe',
  template: `
          {{message | titlecase}}
  `,
  styles: []
})
export class TitleCasePipeComponent implements OnInit {
   message = 'Emporio Minas';
  constructor() { }

  ngOnInit() {
  }

}
