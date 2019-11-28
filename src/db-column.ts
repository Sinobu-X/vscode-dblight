import * as fs from 'fs';

export default class DbColumn {

    code: string = '';
    name: string = '';
    dataType: string= '';
    size: number = 0;
    nullable: boolean = true;
    isPK: boolean = false;
    values: {key: string, value: any}[] = [];
}