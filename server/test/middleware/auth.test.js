const authMiddleware = require('../../src/middleware/auth');
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
        process.env.JWT_SECRET = 'test_secret';
    });

    it('should call next() if token is valid', () => {
        req.header = jest.fn().mockReturnValue('Bearer valid_token');

        const decodedToken = { id: 1, email: 'test@test.com' };
        jwt.verify.mockReturnValue(decodedToken);

        authMiddleware(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith('valid_token', 'test_secret');
        expect(req.user).toEqual(decodedToken);
        expect(next).toHaveBeenCalled();
    });

    it('should return 401 if no authorization header', () => {
        req.header = jest.fn().mockReturnValue(null);

        authMiddleware(req, res, next);

        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toEqual({ message: "Access Denied" });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 400 if token is invalid', () => {
        req.header = jest.fn().mockReturnValue('Bearer invalid_token');
        jwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        authMiddleware(req, res, next);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ message: "Invalid Token" });
        expect(next).not.toHaveBeenCalled();
    });
});