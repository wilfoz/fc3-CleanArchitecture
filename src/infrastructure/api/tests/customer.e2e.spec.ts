import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for customer', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    });
    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: 'John',
                address: {
                    street: 'Street',
                    number: 123,
                    zip: '123',
                    city: 'City'
                },
            });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('John');
        expect(response.body.address.street).toBe('Street');
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe('123');
        expect(response.body.address.city).toBe('City');
    });

    it('should not create a customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: 'John Deu'
            });
        
        expect(response.status).toBe(500);
    });

    it('should list all customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: 'John',
                address: {
                    street: 'Street',
                    number: 123,
                    zip: '123',
                    city: 'City'
                },
            });
        expect(response.status).toBe(200);
        const response1 = await request(app)
            .post('/customer')
            .send({
                name: 'Tony',
                address: {
                    street: 'Street1',
                    number: 1234,
                    zip: '1234',
                    city: 'Foz'
                },
            });
        expect(response1.status).toBe(200);

        const listResponse = await request(app).get('/customer').send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);

        const customer1 = listResponse.body.customers[0];
        expect(customer1.name).toBe('John');
        expect(customer1.address.street).toBe('Street');

        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe('Tony');
        expect(customer2.address.street).toBe('Street1');
    });
});