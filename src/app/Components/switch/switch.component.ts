import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
})
export class SwitchComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  toggleMode() {
    document.getElementsByClassName('fas')[0].classList.toggle('darkButton');
    document.getElementsByClassName('dark')[0].classList.toggle('darkAnimate');
  }
}
