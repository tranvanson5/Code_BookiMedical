import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { UserModel } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { ConfirmComponent } from 'src/app/base/core/components/popup-confirm/popup-confirm.component';
import { ACTION_CLOSE } from 'src/app/base/_helpers/constant';
import { UserContainer } from '../../user.container';
import { SpinnerService } from 'src/app/base/core/services/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-action-user',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ActionComponent implements ICellRendererAngularComp {

    params;
    data: UserModel;
    context: UserContainer;

    constructor(
        private matDialog: MatDialog,
        private userService: UserService,
        private spinnerService: SpinnerService,
        private toastrService: ToastrService
    ) {}

    refresh(params: ICellRendererParams): boolean {
        return true;
    }

    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.data = this.params.data;
        this.context = this.params.context;
    }

    onInActive(): void {
        this.matDialog.open(ConfirmComponent, {
            width: '500px',
            data: {
                title: 'Xác nhận',
                message: 'Bạn có chắc chắn muốn khóa tài khoản.'
            }
        }).afterClosed().subscribe(res => {
            if (res !== ACTION_CLOSE) {
                this.spinnerService.isLoading(true);
                this.userService.inactiveUser(this.data.id).subscribe(res => {
                    this.spinnerService.isLoading(false);
                    this.toastrService.success('Vô hiệu hóa tài khoản thành công');
                    this.context.doSearch();
                })
            }
        })
    }

    onActive(): void {
        this.matDialog.open(ConfirmComponent, {
            width: '500px',
            data: {
                title: 'Xác nhận',
                message: 'Bạn có chắc chắn muốn mở tài khoản.'
            }
        }).afterClosed().subscribe(res => {
            if (res !== ACTION_CLOSE) {
                this.spinnerService.isLoading(true);
                this.userService.activeUser(this.data.id).subscribe(res => {
                    this.spinnerService.isLoading(false);
                    this.toastrService.success('Mở tài khoản thành công');
                    this.context.doSearch();
                })
            }
        })
    }
}