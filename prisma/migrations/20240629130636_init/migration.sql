/*
  Warnings:

  - You are about to drop the column `latitude` on the `celulas` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `celulas` table. All the data in the column will be lost.
  - You are about to drop the column `secretarioId` on the `celulas` table. All the data in the column will be lost.
  - You are about to drop the column `celulaId` on the `membros` table. All the data in the column will be lost.
  - You are about to drop the column `horario` on the `encontros` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[celulaId]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `visita` to the `encontro_presenca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_membro` to the `membros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN "celulaId" INTEGER;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_encontro_presenca" (
    "encontroId" INTEGER NOT NULL,
    "membroId" INTEGER NOT NULL,
    "visita" BOOLEAN NOT NULL,

    PRIMARY KEY ("encontroId", "membroId"),
    CONSTRAINT "encontro_presenca_encontroId_fkey" FOREIGN KEY ("encontroId") REFERENCES "encontros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "encontro_presenca_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "membros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_encontro_presenca" ("encontroId", "membroId") SELECT "encontroId", "membroId" FROM "encontro_presenca";
DROP TABLE "encontro_presenca";
ALTER TABLE "new_encontro_presenca" RENAME TO "encontro_presenca";
CREATE TABLE "new_celulas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_celula" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "foto" TEXT,
    "liderId" INTEGER,
    "liderEmTreinamentoId" INTEGER,
    "anfitriaoId" INTEGER,
    CONSTRAINT "celulas_liderId_fkey" FOREIGN KEY ("liderId") REFERENCES "membros" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "celulas_liderEmTreinamentoId_fkey" FOREIGN KEY ("liderEmTreinamentoId") REFERENCES "membros" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "celulas_anfitriaoId_fkey" FOREIGN KEY ("anfitriaoId") REFERENCES "membros" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_celulas" ("endereco", "id", "liderEmTreinamentoId", "liderId", "nome_celula") SELECT "endereco", "id", "liderEmTreinamentoId", "liderId", "nome_celula" FROM "celulas";
DROP TABLE "celulas";
ALTER TABLE "new_celulas" RENAME TO "celulas";
CREATE UNIQUE INDEX "celulas_liderId_key" ON "celulas"("liderId");
CREATE UNIQUE INDEX "celulas_liderEmTreinamentoId_key" ON "celulas"("liderEmTreinamentoId");
CREATE UNIQUE INDEX "celulas_anfitriaoId_key" ON "celulas"("anfitriaoId");
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
    "tipo_membro" INTEGER NOT NULL
);
INSERT INTO "new_membros" ("cristao", "data_nascimento", "descubra", "escola_de_lideres", "foto", "id", "nome", "novo_convertido", "sexo", "telefone") SELECT "cristao", "data_nascimento", "descubra", "escola_de_lideres", "foto", "id", "nome", "novo_convertido", "sexo", "telefone" FROM "membros";
DROP TABLE "membros";
ALTER TABLE "new_membros" RENAME TO "membros";
CREATE TABLE "new_encontros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "celulaId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "observacoes" TEXT,
    CONSTRAINT "encontros_celulaId_fkey" FOREIGN KEY ("celulaId") REFERENCES "celulas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_encontros" ("celulaId", "data", "id", "observacoes") SELECT "celulaId", "data", "id", "observacoes" FROM "encontros";
DROP TABLE "encontros";
ALTER TABLE "new_encontros" RENAME TO "encontros";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_celulaId_key" ON "usuarios"("celulaId");
