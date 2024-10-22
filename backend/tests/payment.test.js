const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Assuming your Express app is exported from app.js or index.js
const UserPayment = require('../models/UserPayment');

describe('UserPayment API', () => {

  // Before running tests, connect to the database
  beforeAll(async () => {
    const mongoURI = 'mongodb+srv://samarakoonlapjayaisuru:u9MYbWA4SgX51vZf@cluster0.x5apt.mongodb.net/'; // Replace with your test database URI
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  // After all tests, clear the database and close the connection
  afterAll(async () => {
    await UserPayment.deleteMany(); // Clean up the test data
    await mongoose.connection.close();
  });

  // Positive test case: Create a new payment
  it('should create a new payment successfully', async () => {
    const newPayment = {
      userId: 'user123',
      trashBinId: 'bin123',
      paymentAmount: 100,
      paymentMethod: 'Credit Card',
      transactionId: 'tx12345',
      billingAddress: {
        street: '123 Main St',
        city: 'Test City',
        state: 'Test State',
        postalCode: '12345',
      },
      userEmail: 'testuser@example.com',
      receiptUrl: 'http://example.com/receipt.jpg',
    };

    const response = await request(app)
      .post('/api/payments')
      .send(newPayment)
      .expect(201); // Expect status 201 (Created)

    expect(response.body).toHaveProperty('_id'); // Verify payment was saved
    expect(response.body.paymentAmount).toBe(newPayment.paymentAmount);
  });

  // Negative test case: Fail to create payment with invalid paymentAmount
  it('should fail to create payment with negative paymentAmount', async () => {
    const invalidPayment = {
      userId: 'user123',
      trashBinId: 'bin123',
      paymentAmount: -50, // Invalid negative amount
      paymentMethod: 'Credit Card',
      transactionId: 'tx12345',
      billingAddress: {
        street: '123 Main St',
        city: 'Test City',
        state: 'Test State',
        postalCode: '12345',
      },
      userEmail: 'testuser@example.com',
      receiptUrl: 'http://example.com/receipt.jpg',
    };

    const response = await request(app)
      .post('/api/payments')
      .send(invalidPayment)
      .expect(400); // Expect validation error

    expect(response.body).toHaveProperty('error');
  });

  // Positive test case: Fetch a specific payment
  it('should fetch a payment by ID', async () => {
    const newPayment = new UserPayment({
      userId: 'user456',
      trashBinId: 'bin456',
      paymentAmount: 150,
      paymentMethod: 'Debit Card',
      transactionId: 'tx67890',
      billingAddress: {
        street: '456 Main St',
        city: 'Test City',
        state: 'Test State',
        postalCode: '54321',
      },
      userEmail: 'anotheruser@example.com',
      receiptUrl: 'http://example.com/receipt2.jpg',
    });
    await newPayment.save();

    const response = await request(app)
      .get(`/api/payments/${newPayment._id}`)
      .expect(200); // Expect status 200 (OK)

    expect(response.body).toHaveProperty('_id', newPayment._id.toString());
    expect(response.body.paymentAmount).toBe(newPayment.paymentAmount);
  });

  // Negative test case: Fetch non-existent payment
  it('should return 404 for non-existent payment', async () => {
    const nonExistentId = mongoose.Types.ObjectId(); // Generate a random ObjectId
    await request(app)
      .get(`/api/payments/${nonExistentId}`)
      .expect(404); // Expect status 404 (Not Found)
  });

  // Positive test case: Update a payment
  it('should update an existing payment successfully', async () => {
    const payment = new UserPayment({
      userId: 'user789',
      trashBinId: 'bin789',
      paymentAmount: 200,
      paymentMethod: 'Digital Wallet',
      transactionId: 'tx99999',
      billingAddress: {
        street: '789 Main St',
        city: 'Update City',
        state: 'Update State',
        postalCode: '99999',
      },
      userEmail: 'updateuser@example.com',
      receiptUrl: 'http://example.com/receipt3.jpg',
    });
    await payment.save();

    const updatedPaymentData = {
      paymentAmount: 250, // Updated amount
      paymentStatus: 'Completed', // Updated status
    };

    const response = await request(app)
      .put(`/api/payments/${payment._id}`)
      .send(updatedPaymentData)
      .expect(200); // Expect status 200 (OK)

    expect(response.body.paymentAmount).toBe(250);
    expect(response.body.paymentStatus).toBe('Completed');
  });

  // Negative test case: Update a payment with invalid data
  it('should fail to update payment with invalid data', async () => {
    const payment = new UserPayment({
      userId: 'user1010',
      trashBinId: 'bin1010',
      paymentAmount: 300,
      paymentMethod: 'Credit Card',
      transactionId: 'tx1010',
      billingAddress: {
        street: '1010 Main St',
        city: 'Test City',
        state: 'Test State',
        postalCode: '101010',
      },
      userEmail: 'invaliduser@example.com',
      receiptUrl: 'http://example.com/receipt4.jpg',
    });
    await payment.save();

    const invalidUpdateData = {
      paymentAmount: -100, // Invalid negative amount
    };

    const response = await request(app)
      .put(`/api/payments/${payment._id}`)
      .send(invalidUpdateData)
      .expect(400); // Expect validation error

    expect(response.body).toHaveProperty('error');
  });

  // Positive test case: Delete a payment
  it('should delete a payment by ID', async () => {
    const payment = new UserPayment({
      userId: 'user1111',
      trashBinId: 'bin1111',
      paymentAmount: 400,
      paymentMethod: 'Debit Card',
      transactionId: 'tx1111',
      billingAddress: {
        street: '1111 Main St',
        city: 'Test City',
        state: 'Test State',
        postalCode: '11111',
      },
      userEmail: 'deleteuser@example.com',
      receiptUrl: 'http://example.com/receipt5.jpg',
    });
    await payment.save();

    await request(app)
      .delete(`/api/payments/${payment._id}`)
      .expect(204); // Expect status 204 (No Content)
  });

});
