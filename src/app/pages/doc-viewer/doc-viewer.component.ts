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
} from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

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

	constructor(private _elementRef: ElementRef,
		private _http: Http,
		private _injector: Injector,
		private _viewContainerRef: ViewContainerRef) { }

	/** Fetch a document by URL. */
	private _fetchDocument(url: string) {
		// Cancel previous pending request
		if (this._documentFetchSubscription) {
			this._documentFetchSubscription.unsubscribe();
		}

		this._documentFetchSubscription = this._http.get(url).subscribe(
			response => {
				// TODO(mmalerba): Trust HTML.
				if (response.ok) {
					this._elementRef.nativeElement.innerHTML = response.text();
					this.textContent = this._elementRef.nativeElement.textContent;
					this.contentLoaded.next();
				} else {
					this._elementRef.nativeElement.innerText =
						`Failed to load document: ${url}. Error: ${response.status}`;
				}
			},
			error => {
				this._elementRef.nativeElement.innerText =
					`Failed to load document: ${url}. Error: ${error}`;
			});
	}
	ngOnDestroy() {
		if (this._documentFetchSubscription) {
			this._documentFetchSubscription.unsubscribe();
		}
	}
}