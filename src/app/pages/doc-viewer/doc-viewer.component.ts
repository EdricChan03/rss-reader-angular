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
import { Subscription } from 'rxjs/Subscription';
import { DomPortalHost, ComponentPortal } from '@angular/cdk/portal';
import { ExpansionPanelComponent } from '../expansion-panel/expansion-panel.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'doc-viewer',
	template: 'Loading document...',
})
export class DocViewer implements OnDestroy {
	private _documentFetchSubscription: Subscription;

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
		private _appRef: ApplicationRef,
		private _componentFactoryResolver: ComponentFactoryResolver,
		private _elementRef: ElementRef,
		private _http: HttpClient,
		private _injector: Injector,
		private _viewContainerRef: ViewContainerRef,
		private _dom: DomSanitizer) { }

	/** Fetch a document by URL. */
	private _fetchDocument(url: string) {
		// Cancel previous pending request
		if (this._documentFetchSubscription) {
			this._documentFetchSubscription.unsubscribe();
		}

		this._documentFetchSubscription = this._http.get(url, { responseType: 'text' }).subscribe(
			result => {
				this.html = this.parse.parseFromString(result, "text/html");
				this._elementRef.nativeElement.innerHTML = result;
				this.textContent = this._elementRef.nativeElement.textContent;
				this._loadExpansionPanel();
				this.contentLoaded.next();
			},
			error => {
				this._elementRef.nativeElement.innerText =
					`Failed to load document: ${url}. Error: ${error.message}`;
			});
	}
	private _loadExpansionPanel() {
		// Query selects all elements which have the `expansion-panel` attribute
		let elements = this._elementRef.nativeElement.querySelectorAll('[expansion-panel]');
		// Similar to the above line of code, but queries from the result of the http get itself
		let tempElements = this.html.querySelectorAll("[expansion-panel]");
		// Loop between all the elements
		for (var i=0;i<elements.length;i++) {
			// Creates a new portal host
			let portalHost = new DomPortalHost(
				elements[i], this._componentFactoryResolver, this._appRef, this._injector);
			// Creates a new component portal
			let expansionPanelPortal = new ComponentPortal(ExpansionPanelComponent);
			// Clears the html of the element
			elements[i].innerHTML = "";
			// Attaches the portal to the portal host declared earlier
			let expansionPanel = portalHost.attach(expansionPanelPortal);
			// Sets the `html` instance to be a `SafeHtml` of the original element's HTML
			expansionPanel.instance.html = this._dom.bypassSecurityTrustHtml(tempElements[i].innerHTML);
		}
	}
	ngOnDestroy() {
		if (this._documentFetchSubscription) {
			this._documentFetchSubscription.unsubscribe();
		}
	}
}