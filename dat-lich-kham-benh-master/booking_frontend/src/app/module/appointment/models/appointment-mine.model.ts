import { PagingRequest, PagingResponse } from "src/app/module/shared/paging/models/paging.model";
import { AppointmentStatus } from "../constant/appointment-status.enum";
import { Appointment } from "./appointment.model";

export interface AppointmentMineReq extends PagingRequest<
{
    status: AppointmentStatus;
    time: string;
}
> {}

export interface AppointmentMineRes extends PagingResponse<Appointment> {}