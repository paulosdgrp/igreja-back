/*
  Warnings:

  - You are about to drop the column `liderEmTreinamentoId` on the `encontros` table. All the data in the column will be lost.
  - You are about to drop the column `liderId` on the `encontros` table. All the data in the column will be lost.
  - You are about to drop the column `membroId` on the `encontros` table. All the data in the column will be lost.
  - Added the required column `liderEmTreinamentoId` to the `celulas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liderId` to the `celulas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_encontros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "celulaId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "horario" TEXT NOT NULL,
    "observacoes" TEXT,
    CONSTRAINT "encontros_celulaId_fkey" FOREIGN KEY ("celulaId") REFERENCES "celulas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_encontros" ("celulaId", "data", "horario", "id", "observacoes") SELECT "celulaId", "data", "horario", "id", "observacoes" FROM "encontros";
DROP TABLE "encontros";
ALTER TABLE "new_encontros" RENAME TO "encontros";
CREATE TABLE "new_celulas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_celula" TEXT NOT NULL,
    "secretarioId" INTEGER NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "anfitriaoId" INTEGER NOT NULL,
    "liderId" INTEGER NOT NULL,
    "liderEmTreinamentoId" INTEGER NOT NULL,
    CONSTRAINT "celulas_secretarioId_fkey" FOREIGN KEY ("secretarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "celulas_anfitriaoId_fkey" FOREIGN KEY ("anfitriaoId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "celulas_liderId_fkey" FOREIGN KEY ("liderId") REFERENCES "membros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "celulas_liderEmTreinamentoId_fkey" FOREIGN KEY ("liderEmTreinamentoId") REFERENCES "membros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_celulas" ("anfitriaoId", "endereco", "id", "latitude", "longitude", "nome_celula", "secretarioId") SELECT "anfitriaoId", "endereco", "id", "latitude", "longitude", "nome_celula", "secretarioId" FROM "celulas";
DROP TABLE "celulas";
ALTER TABLE "new_celulas" RENAME TO "celulas";
CREATE UNIQUE INDEX "celulas_secretarioId_key" ON "celulas"("secretarioId");
CREATE UNIQUE INDEX "celulas_anfitriaoId_key" ON "celulas"("anfitriaoId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
