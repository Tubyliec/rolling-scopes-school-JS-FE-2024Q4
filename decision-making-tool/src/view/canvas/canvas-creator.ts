import { optionsArray } from '../../data/options';
import type { CreateOptions } from '../../models/interfaces/create-options.interface';
import type { ListOptions } from '../../models/interfaces/list-options.interface';
import { AdditionalUtilities } from '../../utils/additional-utils/additional-utilities';
import { HtmlElementCreator } from '../../utils/html-element-creator';

import './canvas.scss';

const cssClasses: string[] = ['canvas-field'];

export class CanvasCreator extends HtmlElementCreator {
  public ctx: CanvasRenderingContext2D | undefined | null = undefined;
  public canvasWidth: number = 0;
  public canvasHeight: number = 0;
  public centerX: number;
  public centerY: number;
  public radius: number;
  public items: ListOptions[] = [];
  public currentDegree: number;

  constructor(width: number, height: number) {
    const options: CreateOptions = { tag: 'canvas', classes: [...cssClasses] };
    super(options);
    if (this.element instanceof HTMLCanvasElement) {
      this.element.width = width;
      this.element.height = height;
      this.ctx = this.element.getContext('2d');
    }
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.radius = width / 2;

    this.items = [...optionsArray]
      .sort(function () {
        return Math.random() - 0.5;
      })
      .filter(function (element) {
        return (
          Object.keys(element).length > 0 &&
          element.title &&
          Number(element.weight) > 0
        );
      });
    this.currentDegree = 0;
    this.draw();
  }

  public draw(): void {
    if (this.ctx) {
      let startDegree: number = this.currentDegree;

      const weightArray: number[] = [];
      const namesArray: string[] = [];
      let weightSum: number = 0;

      for (let index = 0; index < this.items.length; index++) {
        if (this.items[index].weight) {
          weightSum = weightSum + Number(this.items[index].weight);
        }
        weightArray.push(Number(this.items[index].weight));
        namesArray.push(this.items[index].title ?? '');
      }
      for (let index = 0; index < this.items.length; index += 1) {
        if (Object.keys(this.items).length > 0) {
          const step: number = (weightArray[index] / weightSum) * 360;
          const endDegree: number = startDegree + step;
          this.ctx.fillStyle = AdditionalUtilities.getRandomColor();
          this.ctx.strokeStyle = 'white';
          this.ctx.lineWidth = 3;
          this.ctx.beginPath();
          this.ctx.arc(
            this.centerX,
            this.centerY,
            this.radius - 32,
            AdditionalUtilities.degreesToRadians(startDegree),
            AdditionalUtilities.degreesToRadians(endDegree),
          );
          this.ctx.lineTo(this.centerX, this.centerY);
          this.ctx.fill();
          this.ctx.stroke();
          this.ctx.closePath();

          if (step > 30) {
            this.ctx.save();
            this.ctx.translate(this.centerX, this.centerY);
            this.ctx.rotate(
              AdditionalUtilities.degreesToRadians(
                (startDegree + endDegree) / 2,
              ),
            );
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 20px serif';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = 'black';
            if (namesArray[index].length > 10) {
              this.ctx.fillText(`${namesArray[index].slice(0, 8)} ...`, 90, 10);
            } else {
              this.ctx.fillText(namesArray[index], 100, 10);
            }
          }

          this.ctx.restore();
          this.ctx.closePath();
          startDegree = endDegree;
        }
      }

      this.ctx.beginPath();
      this.ctx.arc(
        this.centerX,
        this.centerY,
        this.radius - 170,
        AdditionalUtilities.degreesToRadians(0),
        AdditionalUtilities.degreesToRadians(360),
      );
      this.ctx.fillStyle = 'white';
      this.ctx.lineWidth = 3;
      this.ctx.lineTo(this.centerX, this.centerY);
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.arc(
        this.centerX,
        this.centerY,
        this.radius - 175,
        AdditionalUtilities.degreesToRadians(0),
        AdditionalUtilities.degreesToRadians(360),
      );
      this.ctx.fillStyle = 'black';
      this.ctx.lineWidth = 3;
      this.ctx.lineTo(this.centerX, this.centerY);
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.fillStyle = 'black';
      this.ctx.strokeStyle = 'white';
      this.ctx.moveTo(this.centerX - 20, 0);
      this.ctx.lineTo(this.centerX + 20, 0);
      this.ctx.lineTo(this.centerX, 20);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
}
