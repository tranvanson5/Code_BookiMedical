import { CommonModule } from "@angular/common";
import { Component, Input, ViewChild } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NgbDate, NgbDatepicker, NgbDatepickerModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'input-datetime',
    templateUrl: './input-datetime.component.html',
    styleUrls: ['./input-datetime.component.scss'],
    standalone: true,
    imports: [
        NgbTimepickerModule,
        NgbDatepickerModule,
        FormsModule,
        CommonModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputDatetimeComponent,
            multi: true,
        }
    ]
})
export class InputDatetimeComponent implements ControlValueAccessor {

    @Input()
    isValid: boolean;

    // view-child
    @ViewChild('dp') datepicker: NgbDatepicker;

    public inputValue: string = '';
    public time: {
        hour: number,
        minute: number
    } = {
        hour: 12,
        minute: 30
    };

    public isOpenDatePopup: boolean = false;

    private onChange: (value: string | null) => void;
    private onTouch: (value: any) => void;
    public disabled: boolean;

    public ngOnChangeDate({day, month, year}: NgbDate): void {
        const { hour, minute } = this.time;
        this.inputValue = `${year}-${month}-${day} ${hour}:${minute}`;
        this.onChange(this.inputValue);
        this.isOpenDatePopup = false;
    }

    public ngOnChangeHour(event: any): void {
        if (!this.inputValue) return;
        this.inputValue = this.inputValue.replace(/[0-9]{2}\:/, `${event.target.value}:`);
        this.onChange(this.inputValue);
    }

    public ngOnChangeMinute(event: any): void {
        if (!this.inputValue) return;
        this.inputValue = this.inputValue.replace(/\:[0-9]{2}/, `:${event.target.value}`);
        this.onChange(this.inputValue);
    }

    writeValue(obj: any): void {
        if (!obj) return;
        const d = new Date(obj);
        // this.time = {
        //     hour: d.getHours(),
        //     minute: d.getMinutes(),
        // };
        // this.datepicker?.navigateTo?.({
        //     day: d.getDate(),
        //     month: d.getMonth() + 1,
        //     year: d.getFullYear()
        // })
        this.inputValue = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    datepickerToggle(): void {
        this.isOpenDatePopup = !this.isOpenDatePopup;
    }

    blurInput(): void {
        this.isOpenDatePopup = false;
        this.onTouch(this.inputValue);
    }
}