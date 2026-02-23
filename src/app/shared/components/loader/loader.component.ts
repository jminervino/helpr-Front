import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {
  @Input() label = '';
  /** 'page' (default) | 'inline' | 'button' */
  @Input() size: 'page' | 'inline' | 'button' = 'page';

  get spinnerDiameter(): number {
    if (this.size === 'button') return 16;
    if (this.size === 'inline') return 32;
    return 48;
  }

  constructor() {}

  ngOnInit(): void {}
}