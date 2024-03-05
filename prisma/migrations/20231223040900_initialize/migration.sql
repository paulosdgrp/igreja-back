-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "tipo_usuario" INTEGER NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "celulas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_celula" TEXT NOT NULL,
    "secretarioId" INTEGER NOT NULL,
    "larAnfitriaoId" INTEGER NOT NULL,
    CONSTRAINT "celulas_secretarioId_fkey" FOREIGN KEY ("secretarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "celulas_larAnfitriaoId_fkey" FOREIGN KEY ("larAnfitriaoId") REFERENCES "lares_anfitrioes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "membros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "cristao" BOOLEAN NOT NULL,
    "novo_convertido" BOOLEAN NOT NULL,
    "celulaId" INTEGER NOT NULL,
    "encontroId" INTEGER,
    CONSTRAINT "membros_celulaId_fkey" FOREIGN KEY ("celulaId") REFERENCES "celulas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "encontros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "liderId" INTEGER NOT NULL,
    "liderEmTreinamentoId" INTEGER NOT NULL,
    "larAnfitriaoId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "horario" TEXT NOT NULL,
    "observacoes" TEXT,
    "membroId" INTEGER,
    CONSTRAINT "encontros_liderId_fkey" FOREIGN KEY ("liderId") REFERENCES "membros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "encontros_liderEmTreinamentoId_fkey" FOREIGN KEY ("liderEmTreinamentoId") REFERENCES "membros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "encontros_larAnfitriaoId_fkey" FOREIGN KEY ("larAnfitriaoId") REFERENCES "lares_anfitrioes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "encontros_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "membros" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "lares_anfitrioes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "proprietarioId" INTEGER NOT NULL,
    CONSTRAINT "lares_anfitrioes_proprietarioId_fkey" FOREIGN KEY ("proprietarioId") REFERENCES "membros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "encontro_presenca" (
    "encontroId" INTEGER NOT NULL,
    "membroId" INTEGER NOT NULL,

    PRIMARY KEY ("encontroId", "membroId"),
    CONSTRAINT "encontro_presenca_encontroId_fkey" FOREIGN KEY ("encontroId") REFERENCES "encontros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "encontro_presenca_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "membros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_usuario_key" ON "usuarios"("usuario");
