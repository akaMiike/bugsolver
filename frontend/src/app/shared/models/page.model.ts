export class Page<T> {
    page: number = 1;
    size: number = 9;
    sort: string = 'DESC';
    totalElements: number = 0;
    content: T[] = [];
    filters: any = {};
}
