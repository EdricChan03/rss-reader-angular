import { Shared, SelectionDialogOptions } from './../shared';
import { Component } from '@angular/core';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-testpage',
	templateUrl: './testpage.component.html'
})
export class TestpageComponent {
	constructor(private shared: Shared, private dom: DomSanitizer) { }
	dialogTypes = ["alert", "confirm", "prompt", "selection"];
	dialogType: string = "alert";
	title: string;
	message: string;
	okBtn: string;
	cancelBtn: string;
	duration: number = 1000;
	action: string = "Undo";
	verticalPos = ["top", "bottom"];
	horizontalPos = ["start", "center", "end", "left", "right"];
	verticalPosition: MatSnackBarVerticalPosition = "bottom";
	horizontalPosition: MatSnackBarHorizontalPosition = "end";
	extraClass: string;
	private generateLoremIpsum() {
		this.message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis, libero ac euismod blandit, orci lacus maximus nibh, in iaculis elit elit non magna. Vestibulum elit ante, cursus eu ligula eu, elementum ullamcorper ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisis tortor id ante blandit ultrices. Nullam consequat ullamcorper dolor, nec euismod nisl egestas in. Maecenas rutrum a neque a sollicitudin. Sed eleifend ex purus, eu placerat enim varius sed. Integer venenatis, enim eget gravida dictum, justo erat porttitor dui, ac ultricies erat turpis at lacus. Morbi molestie consequat mi a maximus. Vivamus placerat mollis nisl, eu posuere nisi blandit eu. In iaculis, nisl vel tempor accumsan, dolor odio maximus est, nec tempus erat lorem at arcu. In cursus mi et mi ullamcorper, sed pharetra velit placerat. Praesent et nulla condimentum, dignissim diam vel, dictum nulla. Quisque vel risus eu sapien lobortis rhoncus vitae ac quam. Cras diam leo, sagittis molestie augue sit amet, porttitor aliquam justo.";
	}
	openDialog() {
		switch (this.dialogType) {
			case "alert":
				this.alertDialog();
				break;
			case "confirm":
				this.confirmDialog();
				break;
			case "prompt":
				this.promptDialog();
				break;
			case "selection":
				this.selectionDialog();
				break;
		}
	}
	alertDialog() {
		this.shared.openAlertDialog({ title: this.title ? this.title : "Alert", msg: this.message ? this.message : "I'm an alert message made with code!", ok: this.okBtn ? this.okBtn : "Got it" });
	}
	confirmDialog() {
		this.shared.openConfirmDialog({ title: this.title ? this.title : "Confirmation", msg: this.message ? this.message : "I'm a confirm message made with code!", cancel: this.cancelBtn ? this.cancelBtn : "Nah", ok: this.okBtn ? this.okBtn : "Yeah" }).afterClosed().subscribe((result) => {
			this.outputResult(result);
		});
	}
	promptDialog() {
		this.shared.openPromptDialog({ title: this.title ? this.title : "Prompt", msg: "I'm a prompt message prepopulated with a value!", cancel: "Nah", ok: "Yeah", inputType: "text", placeholder: "A value goes here", value: "Something here", color: "accent" }).afterClosed().subscribe((result) => {
			this.outputResult(result);
		});
	}
	selectionDialog() {
		let tempVar = [];
		for (var i = 0; i < 10; i++) {
			if (i == 1) {
				tempVar.push({ content: "Item 1", disabled: true, value: "item-1" });
			} else if (i == 8) {
				tempVar.push({ content: "Item 8", value: "item-8", selected: true });
			} else {
				tempVar.push({ content: `Item ${i}`, value: `item-${i}` });
			}
		}
		let dialogRef = this.shared.openSelectionDialog({ title: this.title ? this.title : "Select", msg: this.message ? this.message : "Select from tons of options", ok: this.okBtn ? this.okBtn : "Yeah", cancel: this.cancelBtn ? this.cancelBtn : "Nah", options: tempVar });
		dialogRef.afterClosed().subscribe((result) => {
			this.outputResult(result);
		})
	}
	/**
	 * Outputs the result of a function
	 * @param {any} result The result of a function
	 * @private
	 */
	private outputResult(result: any) {
		document.getElementById('result').innerText = `Result: ${result}`;
	}
	closeSnackBar() {
		this.shared.closeSnackBar();
	}
	snackBar() {
		if (this.extraClass) {
			this.shared.openSnackBar({ msg: "I'm a snackbar!", additionalOpts: { horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, extraClasses: [this.extraClass]} });
		} else {
			this.shared.openSnackBar({ msg: "I'm a snackbar!", additionalOpts: { horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition } });
		}
	}
	durationSnackBar() {
		this.shared.openSnackBar({ msg: "I'm a duration snackbar!", additionalOpts: { duration: this.duration } });
	}
	snackBarWithResult() {
		let snackBarRef = this.shared.openSnackBarWithRef({ msg: "I'm a snackbar with an action!", action: this.action });
		snackBarRef.onAction().subscribe(_ => {
			this.shared.openAlertDialog({ msg: `You clicked on the "${this.action}" button.` });
		});
	}
}
