import { TaskStatus } from "@/api/models/task/enum";
import { ITask } from "@/api/models/task/type";

export interface TaskInput {
    title: string;
    description: string;
    status: TaskStatus;
    dueDate?: string;
    createdBy: string;
}

export interface UpdateTaskInput {
    title?: string;
    description?: string;
    status?: TaskStatus;
    dueDate?: string;
}

export interface GetAllTasksQuery {
    createdBy?: string;
}

export interface GetAllPaginatedTasksResponse {
    tasks: ITask[];
    total: number;
    page: number;
    limit: number;
}

export interface TaskFilter {
    status?: TaskStatus;
    dueDate?: string;
    keyword?: string;
    isSortByStatus: boolean;
    isSortByDueDate: boolean;
}

export interface FilterQueryInput {
    createdBy: string;
    status?: TaskStatus;
    dueDate?: string;
    $or?: [{ title: {} }, { description: {} }];
}
