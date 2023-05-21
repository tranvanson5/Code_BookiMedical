import { FormControl } from "@angular/forms";

export class Utils {

    public static beforeSubmitFormGroup(formGroup: any): void {
        const controls = formGroup.controls;
        for (const ctrl in controls) {
            const value = controls[ctrl].value;
            if (typeof value === 'string' && Boolean(value)) {
                controls[ctrl].setValue(value.trim());
            }
            if (controls[ctrl] instanceof FormControl) {
                const formControl = controls[ctrl] as FormControl;
                formControl.markAsTouched();
                formControl.updateValueAndValidity();
            } else {
                this.beforeSubmitFormGroup(controls[ctrl]);
            }
        }
    }

}