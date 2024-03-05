/*
  Warnings:

  - You are about to drop the column `celulaId` on the `membros` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "celula_membro" (
    "celulaId" INTEGER NOT NULL,
    "membroId" INTEGER NOT NULL,

    PRIMARY KEY ("celulaId", "membroId"),
    CONSTRAINT "celula_membro_celulaId_fkey" FOREIGN KEY ("celulaId") REFERENCES "celulas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "celula_membro_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "membros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_membros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "cristao" BOOLEAN NOT NULL,
    "novo_convertido" BOOLEAN NOT NULL,
    "encontroId" INTEGER
);
INSERT INTO "new_membros" ("cristao", "data_nascimento", "encontroId", "id", "nome", "novo_convertido", "sexo", "telefone") SELECT "cristao", "data_nascimento", "encontroId", "id", "nome", "novo_convertido", "sexo", "telefone" FROM "membros";
DROP TABLE "membros";
ALTER TABLE "new_membros" RENAME TO "membros";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
