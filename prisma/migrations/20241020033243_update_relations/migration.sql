/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `packs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "packs_user_id_key" ON "packs"("user_id");
