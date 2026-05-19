import { Directive, ElementRef, HostListener, Input, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  @Input('appTooltip') texto = '';
  @Input() tooltipPos: 'top' | 'bottom' = 'top';

  private tipEl: HTMLElement | null = null;

  @HostListener('mouseenter')
  @HostListener('focusin')
  mostrar(): void {
    if (!this.texto) return;
    this.tipEl = this.renderer.createElement('span');
    this.renderer.addClass(this.tipEl, 'app-tooltip');
    this.renderer.addClass(this.tipEl, `app-tooltip-${this.tooltipPos}`);
    this.renderer.setAttribute(this.tipEl, 'role', 'tooltip');
    const text = this.renderer.createText(this.texto);
    this.renderer.appendChild(this.tipEl, text);
    this.renderer.appendChild(this.el.nativeElement, this.tipEl);
    this.renderer.addClass(this.el.nativeElement, 'has-tooltip');
  }

  @HostListener('mouseleave')
  @HostListener('focusout')
  ocultar(): void {
    if (this.tipEl) {
      this.renderer.removeChild(this.el.nativeElement, this.tipEl);
      this.tipEl = null;
    }
    this.renderer.removeClass(this.el.nativeElement, 'has-tooltip');
  }
}
