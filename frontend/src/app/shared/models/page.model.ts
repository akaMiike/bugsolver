export class Page<T> {
    page: number = 0;
    size: number = 10;
    sort: string = 'DESC';
    content: T[] = [];
    filters: any = {};
}
