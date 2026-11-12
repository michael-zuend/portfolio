import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactService } from '../../core/contact.service';
import { SOCIAL } from '../../data/social';
import { NextArrow } from '../../shared/next-arrow/next-arrow';

type Field = 'name' | 'email' | 'message' | 'privacy';
type Status = 'idle' | 'sending';
type Toast = 'success' | 'error';

/**
 * Stricter than Validators.email:
 * - local part: letters, digits and . _ % + - (no double dots, no dot at start or end)
 * - domain: labels separated by single dots, then a top-level domain of at least 2 letters
 * Rejects typos like "name@domain..ch", "name@domain:ch" or "name@domain;ch".
 */
const EMAIL_PATTERN =
  /^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

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

  /** Toast message after sending: slides in, stays a few seconds, slides out. */
  protected readonly toast = signal<Toast | null>(null);
  protected readonly toastLeaving = signal(false);
  private toastTimers: ReturnType<typeof setTimeout>[] = [];

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

  /** Has the user typed something into this field? */
  protected filled(field: 'name' | 'email' | 'message'): boolean {
    return this.form.controls[field].value.trim().length > 0;
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
        this.status.set('idle');
        this.form.reset();
        this.showErrors.set({ name: false, email: false, message: false, privacy: false });
        this.showToast('success');
      },
      error: () => {
        this.status.set('idle');
        this.showToast('error');
      },
    });
  }

  private showToast(type: Toast): void {
    this.toastTimers.forEach(clearTimeout);
    this.toast.set(type);
    this.toastLeaving.set(false);
    this.toastTimers = [
      setTimeout(() => this.toastLeaving.set(true), 4000),
      setTimeout(() => this.toast.set(null), 4400),
    ];
  }
}
