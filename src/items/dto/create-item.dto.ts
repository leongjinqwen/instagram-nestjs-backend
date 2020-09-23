export class CreateItemDto {
    userId: string;
    readonly description: string;
    readonly completed: boolean;
}