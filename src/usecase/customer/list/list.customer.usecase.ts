import Customer from '../../../domain/customer/entity/customer';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { InputLisCustomerDto, OutputListCustomerDto } from './list.customer.dto';

export class ListCustomerUseCase {
    constructor(private customerRepository: CustomerRepositoryInterface) { }
    
    async execute(_input: InputLisCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();
        return OutputMapper.toOutput(customers);
    }
}

class OutputMapper {
    static toOutput(customer: Customer[]): OutputListCustomerDto {
        return {
            customers: customer.map((item) => ({
                id: item.id,
                name: item.name,
                address: {
                    street: item.Address.street,
                    number: item.Address.number,
                    zip: item.Address.zip,
                    city: item.Address.city,
                }
            }))
        }
    }
}