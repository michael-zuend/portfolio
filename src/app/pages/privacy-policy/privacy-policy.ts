import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/language.service';
import { SOCIAL } from '../../data/social';
import { LegalLayout } from '../../layout/legal-layout/legal-layout';

/** Privacy policy. Not legal advice. */
@Component({
  selector: 'app-privacy-policy',
  imports: [LegalLayout, TranslatePipe],
  templateUrl: './privacy-policy.html',
})
export class PrivacyPolicy {
  protected readonly lang = inject(LanguageService);
  protected readonly social = SOCIAL;
}
