import * as fs from 'fs';
import DbColumn from './db-column';

export default class DbIndex {

    code: string = '';
    unique: boolean = false;
    columns: DbColumn[] = [];

}