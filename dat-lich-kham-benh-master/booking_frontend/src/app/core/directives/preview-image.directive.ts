import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Directive({
    selector: '[preview-image]',
    standalone: true
})
export class PreviewImageDirective implements OnInit {

    @Input()
    public imageElement: HTMLImageElement;

    @Output()
    public uploaded = new EventEmitter<File>();

    private readonly toastrsService = inject(ToastrService);
    private readonly self = inject(ElementRef<HTMLInputElement>);

    public ngOnInit(): void {
        const native = this.self.nativeElement;
        native.type = 'file';
        native.accept = 'image/*';
        native.hidden = true;
    }

    @HostListener('change', ['$event'])
    public onChange(event: any): void {
        const fileList = event.target.files as FileList;
        if (fileList.length === 0) return;
        const file = fileList[0] as File;
        if (file.size > environment.maxSizeImg) {
            this.toastrsService.warning(`Ảnh không thể vượt quá ${environment.maxSizeImg/1024/1024} MB`)
            return;
        }

        if (!file.type.startsWith('image')) {
            this.toastrsService.warning('Ảnh không đúng định dạng.')
            return;
        }

        const encodedImage = URL.createObjectURL(file);
        this.imageElement.src = encodedImage;
        this.uploaded.emit(file);
    }

}