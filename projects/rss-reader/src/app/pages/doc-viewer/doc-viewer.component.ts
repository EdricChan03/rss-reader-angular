import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  ViewContainerRef,
  Output,
  Type
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DomPortalHost, ComponentPortal } from '@angular/cdk/portal';
import { ExpansionPanelComponent } from '../expansion-panel/expansion-panel.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'doc-viewer',
  template: 'Loading document...',
})
export class DocViewerComponent implements OnDestroy {
  private documentFetchSubscription: Subscription;

  /** The URL of the document to display. */
  @Input()
  set documentUrl(url: string) {
    this._fetchDocument(url);
  }

  @Output() contentLoaded = new EventEmitter<void>();

  /** The document text. It should not be HTML encoded. */
  textContent = '';
  html: Document;
  parse = new DOMParser();
  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private http: HttpClient,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef,
    private dom: DomSanitizer) { }

  /** Fetch a document by URL. */
  private _fetchDocument(url: string) {
    // Cancel previous pending request
    if (this.documentFetchSubscription) {
      this.documentFetchSubscription.unsubscribe();
    }

    this.documentFetchSubscription = this.http.get(url, { responseType: 'text' }).subscribe(
      result => {
        this.html = this.parse.parseFromString(result, 'text/html');
        this.elementRef.nativeElement.innerHTML = result;
        this.textContent = this.elementRef.nativeElement.textContent;
        this._loadExpansionPanel();
        this.contentLoaded.next();
      },
      error => {
        this.elementRef.nativeElement.innerText =
          `Failed to load document: ${url}. Error: ${error.message}`;
      });
  }
  private _loadExpansionPanel() {
    // Query selects all elements which have the `expansion-panel` attribute
    const elements = this.elementRef.nativeElement.querySelectorAll('[expansion-panel]');
    // Similar to the above line of code, but queries from the result of the http get itself
    const tempElements = this.html.querySelectorAll('[expansion-panel]');
    // Loop between all the elements
    for (let i = 0; i < elements.length; i++) {
      // Creates a new portal host
      const portalHost = new DomPortalHost(
        elements[i], this.componentFactoryResolver, this.appRef, this.injector);
      // Creates a new component portal
      const expansionPanelPortal = new ComponentPortal(ExpansionPanelComponent);
      // Clears the html of the element
      elements[i].innerHTML = '';
      // Attaches the portal to the portal host declared earlier
      const expansionPanel = portalHost.attach(expansionPanelPortal);
      // Sets the `html` instance to be a `SafeHtml` of the original element's HTML
      expansionPanel.instance.html = this.dom.bypassSecurityTrustHtml(tempElements[i].innerHTML);
    }
  }
  ngOnDestroy() {
    if (this.documentFetchSubscription) {
      this.documentFetchSubscription.unsubscribe();
    }
  }
}
