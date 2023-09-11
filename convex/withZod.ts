import { z } from "zod";
import { Id, TableNames } from "./_generated/dataModel";

export const zid = <TableName extends TableNames>(tableName: TableName) =>
  z
    .custom<Id<TableName>>((val) => typeof val === "string")
    .pipe(z.coerce.string());
