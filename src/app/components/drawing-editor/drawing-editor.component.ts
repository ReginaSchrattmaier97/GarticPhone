import {
  Component,
  Input,
  Output,
  ElementRef,
  AfterViewInit,
  ViewChild,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-drawing-editor',
  templateUrl: './drawing-editor.component.html',
  styleUrls: ['./drawing-editor.component.scss'],
})
export class DrawingEditorComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;

  @Input() public width = window.innerWidth * 0.7;
  @Input() public height = window.innerHeight * 0.7;

  @Output() drawingChanged = new EventEmitter<any>();
  public context: CanvasRenderingContext2D;
  private map = new Map();
  @HostListener('window:resize', ['$event'])
  public drawingDataFromChild = '';

  onResize() {
    let temp = this.context.getImageData(0, 0, this.width, this.height);
    this.context.canvas.width = window.innerWidth * 0.7;
    this.context.canvas.height = window.innerHeight * 0.7;
    this.width = this.context.canvas.width;
    this.height = this.context.canvas.height;
    this.context.putImageData(temp, 0, 0);
  }

  ngAfterViewInit(): void {
    if (this.canvas.nativeElement.getContext('2d') != null) {
      this.context = this.canvas.nativeElement.getContext('2d');
    }
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;

    this.context.lineWidth = 6;
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#000';
    this.context.canvas.width = this.width;
    this.context.canvas.height = this.height;

    this.captureEvents(canvasEl);

    this.drawingChanged.pipe(delay(500)).subscribe(() => {
      this.drawingDataFromChild = this.submitRound(canvasEl);
    });
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    fromEvent<MouseEvent>(canvasEl, 'mousedown')
      .pipe(
        switchMap(() => {
          return fromEvent<MouseEvent>(canvasEl, 'mousemove').pipe(
            takeUntil(fromEvent<MouseEvent>(canvasEl, 'mouseup')),
            takeUntil(fromEvent<MouseEvent>(canvasEl, 'mouseleave')),
            pairwise()
          );
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top,
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top,
        };
        //store the drawn points with the color in a map
        this.map.set(currentPos, this.context.strokeStyle);
        this.drawOnCanvas(prevPos, currentPos);
        this.drawingChanged.emit(canvasEl.toDataURL());
      });
  }

  private drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number }
  ) {
    if (!this.context) {
      return;
    }

    this.context.beginPath();

    if (prevPos) {
      this.context.moveTo(prevPos.x, prevPos.y);
      this.context.lineTo(currentPos.x, currentPos.y);
      this.context.stroke();
    }
  }

  public setColor(color: string) {
    this.context.strokeStyle = color;
  }

  public clearCanvas() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.drawingChanged.emit('');
    this.map.clear();
  }

  public submitRound(canvasEl) {
    let base64 = canvasEl.toDataURL();
    return base64;
  }
}
