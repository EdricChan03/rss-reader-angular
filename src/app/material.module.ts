// Material design.
import {
	MatCardModule,
	MatToolbarModule,
	MatButtonModule,
	MatIconModule,
	MatProgressBarModule,
	MatDialogModule,
	MatMenuModule,
	MatCheckboxModule,
	MatSelectModule,
	MatChipsModule,
	MatSidenavModule,
	MatTooltipModule,
	MatFormFieldModule,
	MatSnackBarModule,
	MatProgressSpinnerModule,
	MatSlideToggleModule,
	MatInputModule,
	MatListModule
} from '@angular/material';
import { NgModule } from '@angular/core';
const MATERIAL_MODULES = [
	MatCardModule,
	MatToolbarModule,
	MatButtonModule,
	MatIconModule,
	MatProgressBarModule,
	MatDialogModule,
	MatMenuModule,
	MatCheckboxModule,
	MatFormFieldModule,
	MatSelectModule,
	MatChipsModule,
	MatSidenavModule,
	MatTooltipModule,
	MatSnackBarModule,
	MatProgressSpinnerModule,
	MatSlideToggleModule,
	MatInputModule,
	MatListModule
]
@NgModule({
	imports: [
		MATERIAL_MODULES
	],
	exports: [
		MATERIAL_MODULES
	]
})
export class MaterialModule {}