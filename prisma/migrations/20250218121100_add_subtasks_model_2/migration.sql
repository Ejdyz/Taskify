/*
  Warnings:

  - You are about to drop the column `test` on the `SubTask` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "isMarked" BOOLEAN NOT NULL,
    "taskId" TEXT NOT NULL,
    CONSTRAINT "SubTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SubTask" ("content", "id", "isMarked", "taskId") SELECT "content", "id", "isMarked", "taskId" FROM "SubTask";
DROP TABLE "SubTask";
ALTER TABLE "new_SubTask" RENAME TO "SubTask";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
