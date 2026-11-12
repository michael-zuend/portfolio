import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/language.service';
import { SOCIAL } from '../../data/social';
import { LegalLayout } from '../../layout/legal-layout/legal-layout';

/** Impressum. Keine Rechtsberatung. */
@Component({
  selector: 'app-legal-notice',
  imports: [LegalLayout, TranslatePipe],
  templateUrl: './legal-notice.html',
})
export class LegalNotice {
  protected readonly lang = inject(LanguageService);
  protected readonly social = SOCIAL;
}
