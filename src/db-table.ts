import * as fs from 'fs';
import DbColumn from './db-column';
import DbIndex from './db-index';

export default class DbTable {

    category: string = '';
    code: string = '';
    name: string = '';
    type: 'table' | 'view' = 'table';
    columns: DbColumn[] = [];
    indexes: DbIndex[] = [];

    getPkes(): DbColumn[]{
        return this.columns.filter(x => x.isPK);
    }

    static load(filePath: string): DbTable {

        var fileText = fs.readFileSync(filePath, {
            encoding: 'utf8',
        });

        if (DbTable.isJsonString(fileText)) {
            return JSON.parse(fileText) as DbTable;
        }

        var table: DbTable = new DbTable();

        var fileLines = fileText.replace(/\r\n/g, '\n').split('\n');
        var isColumn = false;
        var curColumn!: DbColumn;

        for (var i = 0; i < fileLines.length; i++) {
            var line = fileLines[i].trim();

            if(line === 'C.START'){
                if(isColumn){
                    throw new Error(`Invalid column start at line ${i + 1}`);
                }
                isColumn = true;
                curColumn = new DbColumn();
                curColumn.nullable = true;
                continue;
            }
            else if(line === 'C.END'){
                if(!isColumn){
                    throw new Error(`Invalid column end at line ${i  + 1}`);
                }
                isColumn = false;
                table.columns.push(curColumn);
                continue;
            }
            
            if(!isColumn){
                if(line.startsWith('T.DBCode=')){
                    table.category = line.substr('T.DBCode='.length);
                }
                else if(line.startsWith('T.TableCode=')){
                    table.code = line.substr('T.TableCode='.length);
                }
                else if(line.startsWith('T.TableType=')){
                    table.type= line.substr('T.TableCode='.length) === 'T' ? 'table' : 'view';
                }
                else if(line.startsWith('T.TableName=')){
                    table.name = line.substr('T.TableName='.length);
                }
                continue;
            }

            if(line.startsWith('C.Code=')){
                curColumn.code = line.substr('C.Code='.length);
            }
            else if(line.startsWith('C.Name=')){
                curColumn.name = line.substr('C.Name='.length);
            }
            else if(line.startsWith('C.DataType=')){
                curColumn.dataType = line.substr('C.DataType='.length);
            }
            else if(line.startsWith('C.ColumnSize=')){
                curColumn.size = parseInt(line.substr('C.ColumnSize='.length), 10);
            }
            else if(line.startsWith('C.IsPK=Y')){
                curColumn.isPK = true;
            }
            else if(line.startsWith('C.NotNull=Y')){
                curColumn.nullable = false;
            }
            else if(line.startsWith('C.LimitValue=')){
                var rows = line.substr('C.LimitValue='.length).split('\\r');
                rows.forEach(row => {
                    var cells = row.split('=');
                    if(cells.length === 2){
                        curColumn.values.push({
                            key: cells[0],
                            value: cells[1]
                        });
                    }
                });
            }            
        }

        return table;
    }

    private static isJsonString(text: string): boolean {
        try {
            JSON.parse(text);
            return true;
        }
        catch{
            return false;
        }
    }

    toModel(): string {
        return "";
    }
}