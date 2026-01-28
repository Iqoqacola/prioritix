const taskController = require('../../src/controllers/taskController');
const Task = require('../../src/models/task');
const httpMocks = require('node-mocks-http');

jest.mock('../../src/models/task');

describe('Task Controller', () => {
    let req, res;
    const mockUserId = 1;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        req.user = { id: mockUserId };
        jest.clearAllMocks();
    });

    describe('getTasks', () => {
        it('should return all tasks for the user', async () => {
            const mockTasks = [{ id: 1, title: 'Task 1', user_id: mockUserId }];
            Task.findAll.mockResolvedValue(mockTasks);

            await taskController.getTasks(req, res);

            expect(Task.findAll).toHaveBeenCalledWith({ where: { user_id: mockUserId } });
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockTasks);
        });
    });

    describe('getTask', () => {
        it('should return a single task if found', async () => {
            req.params.id = 1;
            const mockTask = { id: 1, title: 'Task 1', user_id: mockUserId };
            Task.findOne.mockResolvedValue(mockTask);

            await taskController.getTask(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockTask);
        });

        it('should return 404 if task not found', async () => {
            req.params.id = 999;
            Task.findOne.mockResolvedValue(null);

            await taskController.getTask(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: "Task not found" });
        });
    });

    describe('createTask', () => {
        it('should create a new task', async () => {
            req.body = { title: 'New Task', status: 'pending' };
            const createdTask = { ...req.body, id: 1, user_id: mockUserId };
            Task.create.mockResolvedValue(createdTask);

            await taskController.createTask(req, res);

            expect(Task.create).toHaveBeenCalledWith(expect.objectContaining({
                title: 'New Task',
                user_id: mockUserId
            }));
            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toEqual(createdTask);
        });
    });

    describe('updateTask', () => {
        it('should update task successfully', async () => {
            req.params.id = 1;
            req.body = { title: 'Updated Task' };

            const mockTaskInstance = {
                id: 1,
                title: 'Old Title',
                update: jest.fn().mockResolvedValue(true)
            };

            Task.findOne.mockResolvedValue(mockTaskInstance);

            await taskController.updateTask(req, res);

            expect(mockTaskInstance.update).toHaveBeenCalledWith(req.body);
            expect(res.statusCode).toBe(200);

            const jsonResponse = res._getJSONData();

            expect(jsonResponse.message).toBe("Task updated");

            expect(jsonResponse.task).toEqual(expect.objectContaining({
                id: mockTaskInstance.id,
                title: mockTaskInstance.title
            }));
        });

        it('should return 404 if task to update not found', async () => {
            req.params.id = 999;
            Task.findOne.mockResolvedValue(null);

            await taskController.updateTask(req, res);

            expect(res.statusCode).toBe(404);
        });
    });

    describe('deleteTask', () => {
        it('should delete task successfully', async () => {
            req.params.id = 1;
            Task.destroy.mockResolvedValue(1);

            await taskController.deleteTask(req, res);

            expect(Task.destroy).toHaveBeenCalledWith({
                where: { id: 1, user_id: mockUserId }
            });
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({ message: "Task deleted succesfuly" });
        });
    });
});