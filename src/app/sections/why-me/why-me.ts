import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NavService } from '../../core/nav.service';
import { NextArrow } from '../../shared/next-arrow/next-arrow';

@Component({
  selector: 'app-why-me',
  imports: [TranslatePipe, NextArrow],
  templateUrl: './why-me.html',
  styleUrl: './why-me.scss',
  host: { id: 'why-me' },
})
export class WhyMe {
  protected readonly nav = inject(NavService);
  protected readonly facts = [
    { icon: 'pin', label: 'whyMe.located' },
    { icon: 'laptop', label: 'whyMe.remote' },
    { icon: 'suitcase', label: 'whyMe.relocate' },
  ];
}
