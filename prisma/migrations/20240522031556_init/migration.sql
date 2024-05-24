-- CreateTable
CREATE TABLE "user" (
    "id" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card" (
    "id" VARCHAR NOT NULL,
    "price" INTEGER NOT NULL,
    "description" VARCHAR NOT NULL,
    "imageUrl" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history_card" (
    "id" VARCHAR NOT NULL,
    "userId" VARCHAR NOT NULL,
    "cardId" VARCHAR NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "history_card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_card" ADD CONSTRAINT "history_card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_card" ADD CONSTRAINT "history_card_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
