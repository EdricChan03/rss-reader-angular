import { SharedInjectable, SelectionDialogOptions } from '../shared';
import { Component } from '@angular/core';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActionIconService, ActionIcon } from '../actionitem.service';

@Component({
	selector: 'app-testpage',
	templateUrl: './testpage.component.html'
})
export class TestpageComponent {
	dialogTypes = ['alert', 'confirm', 'prompt', 'selection'];
	dialogType = 'alert';
	title: string;
	message: string;
	okBtn: string;
	cancelBtn: string;
	placeholder: string;
	value: string;
	duration = 1000;
	action = 'Undo';
	verticalPos = ['top', 'bottom'];
	horizontalPos = ['start', 'center', 'end', 'left', 'right'];
	verticalPosition: MatSnackBarVerticalPosition = 'bottom';
	horizontalPosition: MatSnackBarHorizontalPosition = 'end';
	extraClass: string[];
	snackBarMsg: string;
	constructor(
		private shared: SharedInjectable,
		private dom: DomSanitizer,
		private actionItemService: ActionIconService
	) { }
	/**
	 * Gets whether the user is on a mobile device
	 * @returns {boolean}
	 */
	getMobile(): boolean {
		return this.shared.isMobile();
	}
	/**
	 * Generates lorem ipsum text
	 * @param {boolean} isSnackBar Whether to generate lorem ipsum for the snackbar message
	 */
	generateLoremIpsum(isSnackBar?: boolean) {
		// tslint:disable-next-line:max-line-length
		const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis, libero ac euismod blandit, orci lacus maximus nibh, in iaculis elit elit non magna. Vestibulum elit ante, cursus eu ligula eu, elementum ullamcorper ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisis tortor id ante blandit ultrices. Nullam consequat ullamcorper dolor, nec euismod nisl egestas in. Maecenas rutrum a neque a sollicitudin. Sed eleifend ex purus, eu placerat enim varius sed. Integer venenatis, enim eget gravida dictum, justo erat porttitor dui, ac ultricies erat turpis at lacus. Morbi molestie consequat mi a maximus. Vivamus placerat mollis nisl, eu posuere nisi blandit eu. In iaculis, nisl vel tempor accumsan, dolor odio maximus est, nec tempus erat lorem at arcu. In cursus mi et mi ullamcorper, sed pharetra velit placerat. Praesent et nulla condimentum, dignissim diam vel, dictum nulla. Quisque vel risus eu sapien lobortis rhoncus vitae ac quam. Cras diam leo, sagittis molestie augue sit amet, porttitor aliquam justo.';
		if (isSnackBar) {
			this.snackBarMsg = loremIpsum;
		} else {
			this.message = loremIpsum;
		}
	}
	openDialog() {
		switch (this.dialogType) {
			case 'alert':
				this.alertDialog();
				break;
			case 'confirm':
				this.confirmDialog();
				break;
			case 'prompt':
				this.promptDialog();
				break;
			case 'selection':
				this.selectionDialog();
				break;
			default:
				console.log('Hmm...');
				this.alertDialog();
		}
	}
	alertDialog() {
		// tslint:disable-next-line:max-line-length
		this.shared.openAlertDialog({ title: this.title ? this.title : 'Alert', msg: this.message ? this.message : 'I\'m an alert message made with code!', ok: this.okBtn ? this.okBtn : 'Got it' });
	}
	confirmDialog() {
		// tslint:disable-next-line:max-line-length
		this.shared.openConfirmDialog({ title: this.title ? this.title : 'Confirmation', msg: this.message ? this.message : 'I\'m a confirm message made with code!', cancel: this.cancelBtn ? this.cancelBtn : 'Nah', ok: this.okBtn ? this.okBtn : 'Yeah' }).afterClosed().subscribe((result) => {
			this.outputResult(result);
		});
	}
	promptDialog() {
		// tslint:disable-next-line:max-line-length
		this.shared.openPromptDialog({ title: this.title ? this.title : 'Prompt', msg: this.message ? this.message : 'I\'m a prompt message prepopulated with a value!', cancel: this.cancelBtn ? this.cancelBtn : 'Nah', ok: this.okBtn ? this.okBtn : 'Yeah', inputType: 'text', placeholder: this.placeholder ? this.placeholder : 'A value goes here', value: this.value ? this.value : 'Something here', color: 'accent' }).afterClosed().subscribe((result) => {
			this.outputResult(result);
		});
	}
	selectionDialog() {
		const tempVar = [];
		for (let i = 0; i < 10; i++) {
			if (i === 1) {
				tempVar.push({ content: 'Item 1', disabled: true, value: 'item-1' });
			} else if (i === 8) {
				tempVar.push({ content: 'Item 8', value: 'item-8', selected: true });
			} else {
				tempVar.push({ content: `Item ${i}`, value: `item-${i}` });
			}
		}
		// tslint:disable-next-line:max-line-length
		const dialogRef = this.shared.openSelectionDialog({ title: this.title ? this.title : 'Select', msg: this.message ? this.message : 'Select from tons of options', ok: this.okBtn ? this.okBtn : 'Yeah', cancel: this.cancelBtn ? this.cancelBtn : 'Nah', options: tempVar });
		dialogRef.afterClosed().subscribe((result) => {
			this.outputResult(result);
		});
	}
	removeActionIcons() {
		this.actionItemService.removeActionIcons();
	}
	getActionIcons(): ActionIcon[] {
		return this.actionItemService.getActionIcons();
	}
	addActionIcon(title: string, icon?: string, isRouterLink?: boolean, href?: string, showAsAction?: boolean) {
		if (title !== '') {
			if (isRouterLink && href) {
				this.actionItemService.addActionIcon({title: title, icon: icon, routerLink: href, showAsAction: showAsAction});
			} else if (href) {
				this.actionItemService.addActionIcon({title: title, icon: icon, href: href, showAsAction: showAsAction});
			} else {
				this.actionItemService.addActionIcon({title: title, icon: icon, onClickListener: (ev: Event) => {
					console.log('TEST works.');
				}, showAsAction: showAsAction});
			}
		} else {
			console.error('Title required.');
		}
	}
	/**
	 * Outputs the result of a function
	 * @param {any} result The result of a function
	 * @private
	 */
	private outputResult(result: any) {
		console.log(`Result: ${result}`);
		document.getElementById('result').innerText = `Result: ${result}`;
	}
	/**
	 * Closes the current snackbar
	 */
	closeSnackBar() {
		this.shared.closeSnackBar();
	}
	/**
	 * Opens a snackbar
	 */
	snackBar() {
		// tslint:disable-next-line:max-line-length
		this.shared.openSnackBar({ msg: this.snackBarMsg ? this.snackBarMsg : 'I\'m a snackbar!', additionalOpts: { horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, extraClasses: this.extraClass } });
	}
	/**
	 * Opens a snackbar with a duration
	 */
	durationSnackBar() {
		// tslint:disable-next-line:max-line-length
		this.shared.openSnackBar({ msg: this.snackBarMsg ? this.snackBarMsg : 'I\'m a duration snackbar!', additionalOpts: { duration: this.duration ? this.duration : 5000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, extraClasses: this.extraClass } });
	}
	/**
	 * Opens a snackbar with a result
	 */
	snackBarWithResult() {
		// tslint:disable-next-line:max-line-length
		const snackBarRef = this.shared.openSnackBar({ msg: this.snackBarMsg ? this.snackBarMsg : 'I\'m a snackbar with an action!', action: this.action, additionalOpts: { horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, extraClasses: this.extraClass } });
		snackBarRef.onAction().subscribe(() => {
			this.shared.openAlertDialog({ msg: `You clicked on the "${this.action}" button.` });
		});
	}
}
