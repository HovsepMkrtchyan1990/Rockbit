export class MyAnimation {
  public context: any;
  public clientX: number;
  public color: string;
  public floor: number;
  public end: boolean = false;
  public switcher: number = 0;

  private radius: number = Math.random() * 20;
  private gravitation: number = 0.0098;
  private start: number;
  private V0: number = 0;
  private S: number = 0;
  private heightGravitation: number;


  constructor(context: any, clientX: number, clientY: number, color: string, floor: number) {
    this.context = context;
    this.clientX = clientX;
    this.start = this.heightGravitation = clientY;
    this.color = color;
    this.floor = floor;
  }

  public update() {
    this.V0 += this.gravitation * this.radius / 2;
    this.S = this.V0 + this.gravitation / 2;
    this.heightGravitation += this.S;
  }

  public reUpdate() {
    this.V0 -= this.gravitation * this.radius / 2;
    this.S = this.V0 + this.gravitation / 2;
    this.heightGravitation -= this.S;
  }

  public render() {
    this.context?.beginPath();
    this.context?.arc(
      this.clientX,
      this.heightGravitation,
      this.radius,
      0,
      Math.PI*2
    );

    if (this.heightGravitation > this.floor){
      this.switcher = this.heightGravitation;
      this.V0 = Math.sqrt(2 * this.gravitation * (this.floor - this.start) * this.radius) / 2;
      if (this.V0 <= 0.025 * this.radius || this.V0 < 0.01) {
        this.end = true;
      }
    }

    this.context && (this.context.fillStyle = this.color);
    this.context?.fill();
  }

  public reRender() {
    this.context?.beginPath();
    this.context?.arc(
      this.clientX,
      this.heightGravitation,
      this.radius,
      0,
      Math.PI * 2
    );

    if (this.V0 <= 0) {
      this.switcher = this.start = this.heightGravitation;
    }

    this.context && (this.context.fillStyle = this.color);
    this.context?.fill();
  }

}
