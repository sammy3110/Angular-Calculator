import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dark',
  templateUrl: './dark.component.html',
  styleUrls: ['./dark.component.css'],
})
export class DarkComponent implements OnInit {
  @Input() label = '';
  @Input() display = '0';
  @Input() operator = '';
  @Input() var1 = 0;
  @Input() equalPressed = false;

  @Output() darkEmmiter = new EventEmitter<any[]>();

  constructor() {}

  ngOnInit(): void {}
  clearScreen() {
    this.display = '0';
    this.label = '';
    this.operator = '';
    this.darkEmmiter.emit([
      this.display,
      this.label,
      this.operator,
      this.var1,
      this.equalPressed,
    ]);
  }

  signChanged() {
    if (
      this.display === '0' ||
      this.display === 'Cannot divide by 0' ||
      this.display === 'Invalid Evalution'
    )
      return;
    if (this.display.startsWith('-')) {
      this.display = this.display.substr(1);
    } else {
      this.display = '-' + this.display;
    }
    this.darkEmmiter.emit([
      this.display,
      this.label,
      this.operator,
      this.var1,
      this.equalPressed,
    ]);
  }

  operatorClicked(op: string) {
    this.var1 = parseFloat(this.display);
    this.operator = op;
    if (
      this.display === 'Cannot divide by 0' ||
      this.display === 'Invalid Evalution'
    )
      return;
    if (this.display.endsWith('.')) {
      this.display = this.display.substr(0, this.display.length - 1);
    }

    if (this.label === '') {
      this.label = this.display + ' ' + op;
      this.display = '0';
    } else if (this.display === '0') {
      this.label = this.label.substr(0, this.label.length - 1) + op;
    } else {
      this.operator = this.label.substr(this.label.length - 1);
      this.var1 = parseFloat(this.label.substr(0, this.label.length - 2));
      this.equals('op');
      this.operator = op;
      this.label += ' ' + op;
      this.display = '0';
    }
    this.darkEmmiter.emit([
      this.display,
      this.label,
      this.operator,
      this.var1,
      this.equalPressed,
    ]);
  }

  numberClicked(n: string) {
    if (
      this.display === 'Cannot divide by 0' ||
      this.display === 'Invalid Evalution'
    )
      this.clearScreen();
    if (this.display === '0') {
      this.display = '';
    }
    if (this.equalPressed) {
      if (n !== '.') {
        this.display = '';
      }
      this.equalPressed = false;
    }
    if (n === '.' && this.display.includes('.')) return;
    if (n === '.' && this.display === '') {
      this.display = '0';
    }

    this.display = this.display + n;
    this.darkEmmiter.emit([
      this.display,
      this.label,
      this.operator,
      this.var1,
      this.equalPressed,
    ]);
  }

  equals(op: string) {
    if (this.label === '') return;
    let result = '';
    if (op === '=') {
      this.var1 = parseFloat(this.label.substr(0, this.label.length - 2));
      this.equalPressed = true;
    }
    switch (this.operator) {
      case '+':
        result = (this.var1 + parseFloat(this.display)).toString();
        break;
      case 'X':
        result = (this.var1 * parseFloat(this.display)).toString();
        break;
      case '-':
        result = (this.var1 - parseFloat(this.display)).toString();
        break;
      case '/':
        result = (this.var1 / parseFloat(this.display)).toString();
        break;
      case '%':
        result = (this.var1 % parseFloat(this.display)).toString();
        break;
    }
    if (result.toString().includes('Infinity')) {
      result = 'Cannot divide by 0';
    }
    if (result.toString().includes('NaN')) {
      result = 'Invalid Evalution';
    }

    console.log(result);
    if (result.toString().includes('.')) result = parseFloat(result).toFixed(2);
    if (op == '=') {
      this.display = result;

      this.label = '';
    } else {
      this.label = result;
    }
    this.operator = '';
    this.darkEmmiter.emit([
      this.display,
      this.label,
      this.operator,
      this.var1,
      this.equalPressed,
    ]);
  }
}
