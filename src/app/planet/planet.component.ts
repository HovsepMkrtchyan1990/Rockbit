import { Component, OnInit } from '@angular/core';
import { MyAnimation } from '../components/my-animation';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {

  private canvas: any;
  private context: any;
  private arr: MyAnimation[] = [];
  private pTimestamp: number = 0;
  private date = new Date();

  constructor() {
  }

  ngOnInit(): void {
    this.canvas = document.getElementById('canvas');
    this.canvas.width = 1000;
    this.canvas.height = 700;
    this.context = this.canvas?.getContext('2d');
    this.animation();
  }

  private clearContext() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private animation() {
    requestAnimationFrame(() => this.tick(this.date.getMilliseconds()));
    this.canvas?.addEventListener('mousedown', (e: any) => {
      if (this.arr.length < 15) {
        this.arr.push(new MyAnimation(this.context, e.clientX, e.clientY,  `#${(Math.floor(Math.random() * 10000000)).toString(16)}`, 650));
      }
    });
  }

  private tick(timestamp: number) {
    const diff = timestamp - this.pTimestamp;
    this.pTimestamp = timestamp;
    const fps = 1000 / diff;
    const secondPath = diff / 1000;

    const params = {
      timestamp,
      pTimestamp: this.pTimestamp,
      diff,
      fps,
      secondPath,
    };

    this.clearContext();
    this.arr = this.arr.filter(el => !el.end);

    for (let i = 0; i < this.arr.length; i++){
      if (this.arr[i].floor > this.arr[i].switcher) {
        this.arr[i].update();
        this.arr[i].render();
      }
      else {
        this.arr[i].reUpdate();
        this.arr[i].reRender();
      }
    }

    requestAnimationFrame(() => this.tick(this.date.getMilliseconds()));

  }
}
