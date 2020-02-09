export class RoomBookingClass {
    public id: number;
    public room_id: number;
    public room_cost: number;
    public days: number;
    public comments: string;
    public guests: number;
    public extra_bed_cost: number;
    public extra_beds: number;
    public payment_Type: string;
    public advance_reservation_payment: number;
    public bed_type: string;
    public has_paid_reservation: boolean;
    public has_paid_total: boolean;
    public reservation_code: string;
    public room_extra_data_id: number;
    public google_event_id: string;
}
