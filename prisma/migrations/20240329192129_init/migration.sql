-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_celulas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_celula" TEXT NOT NULL,
    "secretarioId" INTEGER NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "liderId" INTEGER,
    "liderEmTreinamentoId" INTEGER,
    CONSTRAINT "celulas_secretarioId_fkey" FOREIGN KEY ("secretarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "celulas_liderId_fkey" FOREIGN KEY ("liderId") REFERENCES "membros" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "celulas_liderEmTreinamentoId_fkey" FOREIGN KEY ("liderEmTreinamentoId") REFERENCES "membros" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_celulas" ("endereco", "id", "latitude", "liderEmTreinamentoId", "liderId", "longitude", "nome_celula", "secretarioId") SELECT "endereco", "id", "latitude", "liderEmTreinamentoId", "liderId", "longitude", "nome_celula", "secretarioId" FROM "celulas";
DROP TABLE "celulas";
ALTER TABLE "new_celulas" RENAME TO "celulas";
CREATE UNIQUE INDEX "celulas_secretarioId_key" ON "celulas"("secretarioId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
