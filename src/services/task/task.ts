import Task from '@/api/models/task/task';
import { FilterQueryInput, GetAllPaginatedTasksResponse, GetAllTasksQuery, TaskFilter, TaskInput } from './types';
import { UserRoles } from '@/api/models/user/enum';
import { JWTEncryptedData } from '@/api/controllers/authentication/types';
import { ITask } from '@/api/models/task/type';
import _ from 'lodash';
import { IError } from '@/utils/CustomError';
import { findById } from '../user/user';


export const findTaskById = async (id: string): Promise<ITask | null> => {
    const task = await Task.findById(id).lean();
    return task;
};

export const getAllTasks = async (user: JWTEncryptedData): Promise<ITask[]> => {
    const query = {} as GetAllTasksQuery;
    if (user?.role === UserRoles.USER) {
        query.createdBy = user.id;
    }
    const tasks = await Task.find(query).lean();
    return tasks;
}
export const getAllPaginatedTasks = async (user: JWTEncryptedData, page: number, limit: number): Promise<GetAllPaginatedTasksResponse> => {
    const query = {} as GetAllTasksQuery;
    if (user?.role === UserRoles.USER) {
        query.createdBy = user.id;
    }
    const tasks = await Task.find(query).skip((page - 1) * limit).limit(limit).lean();
    const total = await Task.countDocuments(query);
    return { tasks, total, page, limit };
}
export const createNewTask = async (task: TaskInput, user: JWTEncryptedData): Promise<ITask> => {
    const checkUser = await findById(user?.id);
    if (!checkUser) {
        throw new IError('User not found', 404);
    }
    task.createdBy = user?.id;
    const newTask = new Task({ ...task });
    return await newTask.save();
};

export const updateTask = async (id: string, task: TaskInput, user: JWTEncryptedData): Promise<ITask | null> => {
    const checkTask = await findTaskById(id);
    if (!checkTask) {
        throw new IError('Task not found', 404);
    }
    // make sure the user is authorized to update the task, or this task belongs to the user
    if (user?.id?.toString() !== checkTask?.createdBy?.toString()) {
        throw new IError('You are not authorized to perform this action', 403);
    }

    const updatedTask = await Task.findByIdAndUpdate(id, { ...task }, { new: true });
    return updatedTask;
};

export const deleteTask = async (id: string, user: JWTEncryptedData): Promise<ITask | null> => {
    const checkTask = await findTaskById(id);
    if (!checkTask) {
        throw new IError('Task not found', 404);
    }
    // make sure the user is authorized to update the task, or this task belongs to the user
    if (user?.id?.toString() !== checkTask?.createdBy?.toString()) {
        throw new IError('You are not authorized to perform this action', 403);
    }
    await Task.findByIdAndDelete(id);
    return checkTask;
}

export const filterTasks = async (user: JWTEncryptedData, page: number, limit: number, filter: TaskFilter,): Promise<GetAllPaginatedTasksResponse> => {
    const query = {} as FilterQueryInput;
    if (user?.role === UserRoles.USER) {
        query.createdBy = user?.id;
    }
    if (!_?.isEmpty(filter.status)) {
        query.status = filter?.status;
    }
    if (!_?.isEmpty(filter.dueDate)) {
        query.dueDate = filter?.dueDate;
    }
    if (!_?.isEmpty(filter.keyword)) {
        query.$or = [
            { title: { $regex: new RegExp(filter?.keyword as string, 'i') } },
            { description: { $regex: new RegExp(filter?.keyword as string, 'i') } }
        ];
    }
    let sortOptions = {};
    if (filter?.isSortByStatus) {
        sortOptions = { ...sortOptions, status: 1 };
    }
    if (filter?.isSortByDueDate) {
        sortOptions = { ...sortOptions, dueDate: 1 };
    }
    const tasks = await Task.find(query).sort(sortOptions).skip((page - 1) * limit).limit(limit).lean();
    const total = await Task.countDocuments(query);

    return { tasks, total, page, limit };
}

