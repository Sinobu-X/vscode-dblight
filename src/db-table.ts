import * as fs from 'fs';
import DbColumn from './db-column';

export default class DbTable {

    category: string = '';
    code: string = '';
    name: string = '';
    type: 'table' | 'view' = 'table';
    columns: DbColumn[] = [];
    pkes: DbColumn[] = [];
    indexes: DbColumn[] = [];
    
    public static read(filePath: string): DbTable {
        var table: DbTable = new DbTable();

        var fileData = fs.readFileSync(filePath, {
            encoding: 'utf8',
        });

        


        console.log(fileData);
        return table;
    }

    public toModel(): string{
        return "";
    }
}