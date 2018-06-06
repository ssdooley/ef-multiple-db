import { Component } from '@angular/core';
import { SnackerService } from '../../services/snacker.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  palette: string[] = [
    'snacker-red',
    'snacker-pink',
    'snacker-purple',
    'snacker-deep-purple',
    'snacker-indigo',
    'snacker-blue',
    'snacker-light-blue',
    'snacker-cyan',
    'snacker-teal',
    'snacker-green',
    'snacker-light-green',
    'snacker-lime',
    'snacker-yellow',
    'snacker-amber',
    'snacker-orange',
    'snacker-deep-orange',
    'snacker-brown',
    'snacker-grey',
    'snacker-blue-grey'
  ];

  constructor(
    private snacker: SnackerService
  ) { }

  testSnacker(color: string) {
    this.snacker.setDuration(500000);
    this.snacker.sendColorMessage('Creeping your stuff', [color]);
  }
}
