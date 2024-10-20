/*
  Warnings:

  - Added the required column `movie_name` to the `watcheds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "watcheds" ADD COLUMN     "movie_name" TEXT NOT NULL,
ADD COLUMN     "themes" INTEGER[];
