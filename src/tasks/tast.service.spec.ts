import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: 2, username: 'Test user' };

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
});

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get(TasksService);
    taskRepository = await module.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filters: GetTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Some query filter',
      };

      const result = await tasksService.getTasks(filters, mockUser);

      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('class taskRepository.findOne() and success result', async () => {
      const mockTask = { title: 'Test task', description: 'Desc' };
      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(1, mockUser);
      expect(result).toEqual(mockTask);

      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: mockUser.id,
        },
      });
    });

    it('throw an error as task is not found', async () => {
      taskRepository.findOne.mockResolvedValue(null);

      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTask', () => {
    it('calls TaskRepositoru.create() and returns the result', async () => {
      taskRepository.mockResolvedValue('someTask');
      expect(taskRepository.createTask).not.toHaveBeenCalled();

      const createTaskDto = { title: '1', description: '2' };
      const result = tasksService.createTask(createTaskDto, mockUser);

      expect(taskRepository.createTask).toHaveBeenCalledWith(
        createTaskDto,
        mockUser,
      );
      expect(result).toEqual('someTask');
    });
  });
});
