type Customer = {
    id: string,
    name: string,
    address: {
        street: string,
        number: number,
        zip: string,
        city: string,
    }
}
export interface InputLisCustomerDto { }

export interface OutputListCustomerDto {
    customers: Customer[];
}