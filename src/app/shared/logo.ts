import { Component } from '@angular/core';

/**
 * "MZ" logo with the curved text "frontend developer", styled like the Figma template.
 * Inline SVG so that the Quantico web font is used.
 */
@Component({
  selector: 'app-logo',
  template: `
    <svg viewBox="0 0 128 84" role="img" aria-label="Michael Zünd">
      <defs>
        <path id="logo-arc" d="M12 66 A52 52 0 0 1 116 66" />
      </defs>
      <text class="arc"><textPath href="#logo-arc" startOffset="50%" text-anchor="middle">frontend developer</textPath></text>
      <text class="mz" x="64" y="78" text-anchor="middle">MZ</text>
    </svg>
  `,
  styles: `
    :host { display: block; }
    svg { display: block; width: 100%; height: auto; overflow: visible; }
    text { font-family: var(--font); fill: #0b0a0a; }
    .arc { font-size: 15px; letter-spacing: 0.04em; }
    .mz { font-size: 40px; font-weight: 700; fill: none; stroke: #0b0a0a; stroke-width: 1.4px; letter-spacing: -0.02em; }
  `,
})
export class Logo {}
