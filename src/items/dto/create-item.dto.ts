export class CreateItemDto {
    userId: string;
    readonly description: string;
    completed: boolean;
}