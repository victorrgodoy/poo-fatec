-- DropForeignKey
ALTER TABLE "consumed_products" DROP CONSTRAINT "consumed_products_clientId_fkey";

-- DropForeignKey
ALTER TABLE "consumed_products" DROP CONSTRAINT "consumed_products_productId_fkey";

-- DropForeignKey
ALTER TABLE "consumed_services" DROP CONSTRAINT "consumed_services_clientId_fkey";

-- DropForeignKey
ALTER TABLE "consumed_services" DROP CONSTRAINT "consumed_services_serviceId_fkey";

-- CreateTable
CREATE TABLE "consumed_pets" (
    "id" SERIAL NOT NULL,
    "petId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "itemName" TEXT NOT NULL,
    "consumedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "consumed_pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "consumed_products" ADD CONSTRAINT "consumed_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_products" ADD CONSTRAINT "consumed_products_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_services" ADD CONSTRAINT "consumed_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_services" ADD CONSTRAINT "consumed_services_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_pets" ADD CONSTRAINT "consumed_pets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_pets" ADD CONSTRAINT "consumed_pets_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
