/*
  Warnings:

  - You are about to drop the `lares_anfitrioes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `larAnfitriaoId` on the `encontros` table. All the data in the column will be lost.
  - You are about to drop the column `larAnfitriaoId` on the `celulas` table. All the data in the column will be lost.
  - Added the required column `celulaId` to the `encontros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anfitriaoId` to the `celulas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `celulas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `celulas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `celulas` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "lares_anfitrioes";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_encontros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "liderId" INTEGER NOT NULL,
    "liderEmTreinamentoId" INTEGER NOT NULL,
    "celulaId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "horario" TEXT NOT NULL,
    "observacoes" TEXT,
    "membroId" INTEGER,
    CONSTRAINT "encontros_liderId_fkey" FOREIGN KEY ("liderId") REFERENCES "membros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "encontros_liderEmTreinamentoId_fkey" FOREIGN KEY ("liderEmTreinamentoId") REFERENCES "membros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "encontros_celulaId_fkey" FOREIGN KEY ("celulaId") REFERENCES "celulas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "encontros_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "membros" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_encontros" ("data", "horario", "id", "liderEmTreinamentoId", "liderId", "membroId", "observacoes") SELECT "data", "horario", "id", "liderEmTreinamentoId", "liderId", "membroId", "observacoes" FROM "encontros";
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
    CONSTRAINT "celulas_secretarioId_fkey" FOREIGN KEY ("secretarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "celulas_anfitriaoId_fkey" FOREIGN KEY ("anfitriaoId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_celulas" ("id", "nome_celula", "secretarioId") SELECT "id", "nome_celula", "secretarioId" FROM "celulas";
DROP TABLE "celulas";
ALTER TABLE "new_celulas" RENAME TO "celulas";
CREATE UNIQUE INDEX "celulas_secretarioId_key" ON "celulas"("secretarioId");
CREATE UNIQUE INDEX "celulas_anfitriaoId_key" ON "celulas"("anfitriaoId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
