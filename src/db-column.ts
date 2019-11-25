import * as fs from 'fs';

export default class DbColumn {

    code: string = '';
    name: string = '';
    dataType: string= '';
    size: number = 0;
    enums: {key: string, value: any}[] = [];

}