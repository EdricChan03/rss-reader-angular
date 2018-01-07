import { SharedInjectable, SelectionDialogOptions } from '../shared';
import { Component, OnInit } from '@angular/core';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActionIconService, ActionIcon } from '../actionitem.service';

interface TestMenuItem {
	title?: string;
	icon?: string;
	href?: string;
	isRouterLink?: boolean;
	showAsAction?: boolean;
}
interface TestDialog {
	dialogType?: 'alert' | 'confirm' | 'prompt' | 'selection';
	title?: string;
	message?: string;
	okBtn?: string;
	cancelBtn?: string;
	placeholder?: string;
	value?: string | number | any;
}
interface TestSnackBar {
	duration?: number;
	action?: string;
	verticalPosition?: MatSnackBarVerticalPosition;
	horizontalPosition?: MatSnackBarHorizontalPosition;
	panelClass?: string[] | string;
	snackBarMsg?: string;
}
@Component({
	selector: 'app-testpage',
	templateUrl: './testpage.component.html'
})
export class TestpageComponent implements OnInit {
	menuItem: TestMenuItem = {};
	dialogTypes = ['alert', 'confirm', 'prompt', 'selection'];
	dialog: TestDialog = {};
	snackbar: TestSnackBar = {};
	verticalPos = ['top', 'bottom'];
	horizontalPos = ['start', 'center', 'end', 'left', 'right'];
	constructor(
		private shared: SharedInjectable,
		private dom: DomSanitizer,
		private actionItemService: ActionIconService
	) { }
	ngOnInit() {
		this.dialog.dialogType = 'alert';
	}
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
			this.snackbar.snackBarMsg = loremIpsum;
		} else {
			this.dialog.message = loremIpsum;
		}
	}
	openDialog() {
		switch (this.dialog.dialogType) {
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
		this.shared.openAlertDialog({ title: this.dialog.title ? this.dialog.title : 'Alert', msg: this.dialog.message ? this.dialog.message : 'I\'m an alert message made with code!', ok: this.dialog.okBtn ? this.dialog.okBtn : 'Got it' });
		this.clearOptions(this.dialog);
	}
	confirmDialog() {
		// tslint:disable-next-line:max-line-length
		this.shared.openConfirmDialog({ title: this.dialog.title ? this.dialog.title : 'Confirmation', msg: this.dialog.message ? this.dialog.message : 'I\'m a confirm message made with code!', cancel: this.dialog.cancelBtn ? this.dialog.cancelBtn : 'Nah', ok: this.dialog.okBtn ? this.dialog.okBtn : 'Yeah' }).afterClosed().subscribe((result) => {
			this.outputResult(result);
		});
		this.clearOptions(this.dialog);
	}
	promptDialog() {
		// tslint:disable-next-line:max-line-length
		this.shared.openPromptDialog({ title: this.dialog.title ? this.dialog.title : 'Prompt', msg: this.dialog.message ? this.dialog.message : 'I\'m a prompt message prepopulated with a value!', cancel: this.dialog.cancelBtn ? this.dialog.cancelBtn : 'Nah', ok: this.dialog.okBtn ? this.dialog.okBtn : 'Yeah', inputType: 'text', placeholder: this.dialog.placeholder ? this.dialog.placeholder : 'A value goes here', value: this.dialog.value ? this.dialog.value : 'Something here', color: 'accent' }).afterClosed().subscribe((result) => {
			this.outputResult(result);
		});
		this.clearOptions(this.dialog);
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
		const dialogRef = this.shared.openSelectionDialog({ title: this.dialog.title ? this.dialog.title : 'Select', msg: this.dialog.message ? this.dialog.message : 'Select from tons of options', ok: this.dialog.okBtn ? this.dialog.okBtn : 'Yeah', cancel: this.dialog.cancelBtn ? this.dialog.cancelBtn : 'Nah', options: tempVar });
		dialogRef.afterClosed().subscribe((result) => {
			this.outputResult(result);
		});
		this.clearOptions(this.dialog);
	}
	removeActionIcons() {
		this.actionItemService.removeActionIcons();
	}
	getActionIcons(): ActionIcon[] {
		return this.actionItemService.getActionIcons();
	}
	addActionIcon() {
		if (this.menuItem.title !== '') {
			if (this.menuItem.isRouterLink && this.menuItem.href) {
				// tslint:disable-next-line:max-line-length
				this.actionItemService.addActionIcon({ title: this.menuItem.title, icon: this.menuItem.icon, routerLink: this.menuItem.href, showAsAction: this.menuItem.showAsAction });
			} else if (this.menuItem.href) {
				// tslint:disable-next-line:max-line-length
				this.actionItemService.addActionIcon({ title: this.menuItem.title, icon: this.menuItem.icon, href: this.menuItem.href, showAsAction: this.menuItem.showAsAction });
			} else {
				this.actionItemService.addActionIcon({
					title: this.menuItem.title, icon: this.menuItem.icon, onClickListener: (ev: Event) => {
						console.log('TEST works.');
					}, showAsAction: this.menuItem.showAsAction
				});
			}
		} else {
			console.error('Title required.');
		}
		this.clearOptions(this.menuItem);
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
	 * Resets a value to an undefined {@link Object}
	 * @param opts The options to clear
	 */
	private clearOptions(opts: TestMenuItem | TestDialog | TestSnackBar | any) {
		opts = {};
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
		this.shared.openSnackBar({ msg: this.snackbar.snackBarMsg ? this.snackbar.snackBarMsg : 'I\'m a snackbar!', additionalOpts: { horizontalPosition: this.snackbar.horizontalPosition, verticalPosition: this.snackbar.verticalPosition, panelClass: this.snackbar.panelClass } });
		this.clearOptions(this.snackbar);
	}
	/**
	 * Opens a snackbar with a duration
	 */
	durationSnackBar() {
		// tslint:disable-next-line:max-line-length
		this.shared.openSnackBar({ msg: this.snackbar.snackBarMsg ? this.snackbar.snackBarMsg : 'I\'m a duration snackbar!', additionalOpts: { duration: this.snackbar.duration ? this.snackbar.duration : 5000, horizontalPosition: this.snackbar.horizontalPosition, verticalPosition: this.snackbar.verticalPosition, panelClass: this.snackbar.panelClass } });
		this.clearOptions(this.snackbar);
	}
	/**
	 * Opens a snackbar with a result
	 */
	snackBarWithResult() {
		// tslint:disable-next-line:max-line-length
		const snackBarRef = this.shared.openSnackBar({ msg: this.snackbar.snackBarMsg ? this.snackbar.snackBarMsg : 'I\'m a snackbar with an action!', action: this.snackbar.action, additionalOpts: { horizontalPosition: this.snackbar.horizontalPosition, verticalPosition: this.snackbar.verticalPosition, panelClass: this.snackbar.panelClass } });
		snackBarRef.onAction().subscribe(() => {
			this.shared.openAlertDialog({ msg: `You clicked on the "${this.snackbar.action}" button.` });
		});
		this.clearOptions(this.snackbar);
	}
}
