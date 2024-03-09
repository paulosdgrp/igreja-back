-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_celulas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_celula" TEXT NOT NULL,
    "secretarioId" INTEGER NOT NULL,
    "larAnfitriaoId" INTEGER,
    CONSTRAINT "celulas_secretarioId_fkey" FOREIGN KEY ("secretarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "celulas_larAnfitriaoId_fkey" FOREIGN KEY ("larAnfitriaoId") REFERENCES "lares_anfitrioes" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_celulas" ("id", "larAnfitriaoId", "nome_celula", "secretarioId") SELECT "id", "larAnfitriaoId", "nome_celula", "secretarioId" FROM "celulas";
DROP TABLE "celulas";
ALTER TABLE "new_celulas" RENAME TO "celulas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
