import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
@Component({
    selector: 'app-collapse',
    templateUrl: './collapse.component.html'
})
export class CollapseComponent {

    @Input()
    header: string;

    @Input()
    defaultCollapse: boolean = false;

    @Output()
    open = new EventEmitter();
}