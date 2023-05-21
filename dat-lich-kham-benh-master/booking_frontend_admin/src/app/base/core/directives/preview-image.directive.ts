import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";

@Directive({
    selector: '[preview-image]'
})
export class PreviewImageDirective implements OnInit {

    @Input('image')
    imageElement: HTMLImageElement;

    @Output()
    output: EventEmitter<File> = new EventEmitter<File>();

    constructor(private el: ElementRef<HTMLInputElement>) {}

    public ngOnInit(): void {
        this.el.nativeElement.type = 'file';
        this.el.nativeElement.hidden = true;
        this.el.nativeElement.accept = 'image/*';
    }

    @HostListener('change', ['$event'])
    public onUpload(event) {
        const fileList = event.target.files as FileList;
        if (fileList.length == 0) return;
        const file = fileList[0];
        if (!file.type.startsWith('image')) return;
        const based = URL.createObjectURL(file);
        this.imageElement.src = based;
        this.imageElement.style.display = 'block';
        this.output.emit(file);
    }

}