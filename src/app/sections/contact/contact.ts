import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactService } from '../../core/contact.service';
import { SOCIAL } from '../../data/social';
import { NextArrow } from '../../shared/next-arrow/next-arrow';

type Field = 'name' | 'email' | 'message' | 'privacy';
type Status = 'idle' | 'sending' | 'success' | 'error';

// Stricter than Validators.email: requires a domain with a dot (name@domain.ch)
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe, NextArrow],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  host: { id: 'contact' },
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly contact = inject(ContactService);
  protected readonly social = SOCIAL;
  protected readonly status = signal<Status>('idle');
  protected readonly year = new Date().getFullYear();

  /** Fields whose errors may be shown right now (only after leaving the field) */
  private readonly showErrors = signal<Record<Field, boolean>>({
    name: false,
    email: false,
    message: false,
    privacy: false,
  });

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    privacy: [false, Validators.requiredTrue],
    website: [''], // Honeypot
  });

  /** On focus: hide the error while the user is typing. */
  protected onFocus(field: Field): void {
    this.showErrors.update((s) => ({ ...s, [field]: false }));
  }

  /** On blur: validate now (checklist US7: onBlur). */
  protected onBlur(field: Field): void {
    this.showErrors.update((s) => ({ ...s, [field]: true }));
  }

  protected onPrivacyChange(): void {
    this.showErrors.update((s) => ({ ...s, privacy: true }));
  }

  /** Translation key of the error message, or null */
  protected error(field: Field): string | null {
    const control = this.form.controls[field];
    if (!this.showErrors()[field] || control.valid) return null;
    const e = control.errors ?? {};
    switch (field) {
      case 'name':
        return e['required'] ? 'contact.errors.nameRequired' : 'contact.errors.nameShort';
      case 'email':
        return e['required'] ? 'contact.errors.emailRequired' : 'contact.errors.emailInvalid';
      case 'message':
        return e['required'] ? 'contact.errors.messageRequired' : 'contact.errors.messageShort';
      case 'privacy':
        return 'contact.errors.privacy';
    }
  }

  protected submit(): void {
    if (this.form.invalid || this.status() === 'sending') return;
    const { name, email, message, website } = this.form.getRawValue();
    this.status.set('sending');
    this.contact.send({ name: name.trim(), email: email.trim(), message: message.trim(), website }).subscribe({
      next: () => {
        this.status.set('success');
        this.form.reset();
        this.showErrors.set({ name: false, email: false, message: false, privacy: false });
        setTimeout(() => this.status.set('idle'), 6000);
      },
      error: () => this.status.set('error'),
    });
  }
}
