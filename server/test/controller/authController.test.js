const { registerUser, loginUser } = require('../../src/controllers/authController');
const User = require('../../src/models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');

jest.mock('../../src/models/user');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        it('should register a user successfully', async () => {
            req.body = {
                full_name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            User.findOne.mockResolvedValue(null);
            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedPassword');
            User.create.mockResolvedValue({
                id: 1,
                full_name: 'Test User',
                email: 'test@example.com',
                role: 'free'
            });

            await registerUser(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({
                message: "User Registered Successfully",
                user: {
                    id: 1,
                    full_name: 'Test User',
                    email: 'Test User'
                }
            });
        });

        it('should return 400 if email already exists', async () => {
            req.body = { email: 'exist@example.com', password: '123' };

            User.findOne.mockResolvedValue({ id: 1, email: 'exist@example.com' });

            await registerUser(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ message: "Email already exists" });
        });
    });

    describe('loginUser', () => {
        it('should login successfully and return token', async () => {
            req.body = { email: 'test@example.com', password: 'password123' };

            const mockUser = {
                _id: 1,
                email: 'test@example.com',
                password_hash: 'hashedPassword'
            };

            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('valid_token');

            await loginUser(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toHaveProperty('token', 'valid_token');
        });

        it('should return 400 if user not found', async () => {
            req.body = { email: 'notfound@example.com', password: '123' };
            User.findOne.mockResolvedValue(null);

            await loginUser(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ message: "Email or Password is wrong" });
        });

        it('should return 400 if password is incorrect', async () => {
            req.body = { email: 'test@example.com', password: 'wrongpass' };
            User.findOne.mockResolvedValue({ password_hash: 'hashed' });
            bcrypt.compare.mockResolvedValue(false);

            await loginUser(req, res);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ message: "Email or Password is wrong" });
        });
    });
});