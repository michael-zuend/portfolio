import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  /** Honeypot against spam bots, must stay empty */
  website: string;
}

/**
 * Sends the contact form to the PHP script on the server
 * (public/sendMail.php). Can later be replaced by my own backend,
 * then only the URL here needs to change.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/sendMail.php';

  send(data: ContactMessage): Observable<unknown> {
    return this.http.post(this.endpoint, data);
  }
}
