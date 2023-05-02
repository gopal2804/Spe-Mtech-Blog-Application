// const request = require('supertest');
// const app = require('../server');
// const { MongoClient } = require('mongodb');
// const User=require('../models/User');



// beforeAll(async () => {


//   connection = await MongoClient.connect(global.__MONGO_URI__, {
//     useNewUrlParser: true,
//   });
// //   db = await connection.db(global.__MONGO_DB_NAME__);

//   // create a test user to login with
//   const testUser = new User({
//     firstName: 'Test User',
//     email: 'testuser@example.com',
//     password: 'testpassword',
//   });
//   await testUser.save();


// });


  
//   describe('POST Register', () => {
//     it('should register a new user', async () => {
//       const response = await request(app)
//         .post('/api/users/register')
//         .send({
//           firstName: 'New User',
//           email: 'newuser@example.com',
//           password: 'newpassword',
//         });
//       expect(response.status).toBe(201);
//       expect(response.body.name).toBe('New User');
//       expect(response.body.email).toBe('newuser@example.com');
//       expect(response.body.password).toBeFalsy();
//     });
  
//     it('should return a 400 error if name is missing', async () => {
//       const response = await request(app)
//         .post('/api/users/register')
//         .send({
//           email: 'newuser@example.com',
//           password: 'newpassword',
//         });
//       expect(response.status).toBe(400);
//       expect(response.body.errors.name).toBeTruthy();
//     });
  
//     it('should return a 400 error if email is missing', async () => {
//       const response = await request(app)
//         .post('/api/users/register')
//         .send({
//           firstName: 'New User',
//           password: 'newpassword',
//         });
//       expect(response.status).toBe(400);
//       expect(response.body.errors.email).toBeTruthy();
//     });
  
//     it('should return a 400 error if password is missing', async () => {
//       const response = await request(app)
//         .post('/api/users/register')
//         .send({
//           name: 'New User',
//           email: 'newuser@example.com',
//         });
//       expect(response.status).toBe(400);
//       expect(response.body.errors.password).toBeTruthy();
//     });
  
//     it('should return a 409 error if email already exists', async () => {
//       const response = await request(app)
//         .post('/api/users/register')
//         .send({
//           firstName: 'New User',
//           email: 'testuser@example.com',
//           password: 'newpassword',
//         });
//       expect(response.status).toBe(409);
//       expect(response.body.errors.email).toBeTruthy();
//     });
//   });
  


//   afterAll(async () => {

//     // clean up the test user
//     await User.deleteMany({ });
   
//      await connection.close();
//      await db.close();
   
   
//    });


import { registerUser } from "../controllers/userController";

const mockRequest=()=>{
  return{
    body:{
      firstName: "test",
      lastName:"user",
      email:"test@gmail.com",
      password:"12345678"
    }
  }
}

const mockResponse=()=>{
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  }
}

describe('Register User',()=>{
  it('should register user',async()=>{
    await registerUser()
  })
})