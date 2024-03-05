/*
  Warnings:

  - You are about to drop the column `telefone` on the `usuarios` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "tipo_usuario" INTEGER NOT NULL,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_usuarios" ("id", "nome", "senha", "tipo_usuario", "usuario") SELECT "id", "nome", "senha", "tipo_usuario", "usuario" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_usuario_key" ON "usuarios"("usuario");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
