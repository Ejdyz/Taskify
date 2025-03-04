/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Task` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_FavoriteTasks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FavoriteTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FavoriteTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT 'Untitled',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Task_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("authorId", "createdAt", "id", "title") SELECT "authorId", "createdAt", "id", "title" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteTasks_AB_unique" ON "_FavoriteTasks"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteTasks_B_index" ON "_FavoriteTasks"("B");
