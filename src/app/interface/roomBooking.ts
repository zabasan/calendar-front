export interface RoomBooking {
    id: number;
    room_id: number;
    room_cost: number;
    days: number;
    comments: string;
    guests: number;
    extra_bed_cost: number;
    extra_beds: number;
    payment_Type: string;
    advance_reservation_payment: number;
    bed_type: string;
    has_paid_reservation: boolean;
    has_paid_total: boolean;
    reservation_code: string;
    room_extra_data_id: number;
    google_event_id: string;
}
