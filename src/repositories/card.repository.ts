import { prisma } from "@src/shared/prisma";
import { CreateCardPayload, UpdateCardPayLoal } from "@modules/card/dto/card.dto";

export class CardRepository {
    getCard(cardId: string) {
        return prisma.card.findUnique({
            where: {
                id: cardId
            }
        })
    }

    getCards() {
        return prisma.card.findMany({});
    }

    createCard(cardPayLoad: CreateCardPayload) {
        return prisma.card.create({
            data: cardPayLoad
        })
    }

    updateCard(cardPayload: UpdateCardPayLoal) {
        return prisma.card.update({
            where: {
                id: cardPayload.id
            }, 
            data: {
                price: cardPayload.price,
                description: cardPayload.description, 
                imageUrl: cardPayload.imageUrl
            }
        })
    }

    deleteCard(cardId: string) {
        return prisma.card.delete({
            where:{
                id: cardId
            }
        })
    }
}