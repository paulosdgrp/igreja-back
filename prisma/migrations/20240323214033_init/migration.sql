/*
  Warnings:

  - You are about to drop the `celula_membro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `encontroId` on the `membros` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "celula_membro";
PRAGMA foreign_keys=on;

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
    "escola_de_lideres" BOOLEAN NOT NULL DEFAULT false,
    "descubra" BOOLEAN NOT NULL DEFAULT false,
    "foto" TEXT,
    "celulaId" INTEGER,
    CONSTRAINT "membros_celulaId_fkey" FOREIGN KEY ("celulaId") REFERENCES "celulas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_membros" ("cristao", "data_nascimento", "descubra", "escola_de_lideres", "foto", "id", "nome", "novo_convertido", "sexo", "telefone") SELECT "cristao", "data_nascimento", "descubra", "escola_de_lideres", "foto", "id", "nome", "novo_convertido", "sexo", "telefone" FROM "membros";
DROP TABLE "membros";
ALTER TABLE "new_membros" RENAME TO "membros";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
