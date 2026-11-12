import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  /** Honeypot gegen Spam-Bots, muss leer bleiben */
  website: string;
}

/**
 * Schickt das Kontaktformular an das PHP-Script auf dem Server
 * (public/sendMail.php). Später durch das eigene Backend ersetzbar,
 * dann nur die URL hier ändern.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/sendMail.php';

  send(data: ContactMessage): Observable<unknown> {
    return this.http.post(this.endpoint, data);
  }
}
