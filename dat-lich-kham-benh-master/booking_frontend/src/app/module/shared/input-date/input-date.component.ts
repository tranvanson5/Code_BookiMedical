import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDate, NgbDateStruct, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'input-date',
    templateUrl: './input-date.component.html',
    styleUrls: ['./input-date.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        NgbDatepickerModule,
        FormsModule,
        NgbTimepickerModule,
    ],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: InputDateComponent,
          multi: true
        }
    ]
})
export class InputDateComponent implements ControlValueAccessor {
    
    @Input()
    isValid: boolean;
    
    model: NgbDateStruct | null;
    onChange: (value: string | null) => void;
    onTouched: () => void;
    disabled: boolean;
    
    public ngOnChangeValue(d: NgbDate): void {
        if (this.disabled) return;
        const { day, month, year } = d;
        this.onChange(`${year}-${month}-${day}`);
    }

    public ngOnBlurInput(): void {
        this.onTouched();
    }

    writeValue(obj: string): void {
        if (!obj) {
            this.model = null;
            return;
        }
        const d = new Date(obj);
        this.model = {
            day: d.getDate(),
            month: d.getMonth() + 1,
            year: d.getFullYear()
        };
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    
}