export interface Todo {
    title: string;
    description: string;
    expectedCompletionDate: Date;
    completionDate: Date;
    completed: boolean;
    creationDate: Date;
}
