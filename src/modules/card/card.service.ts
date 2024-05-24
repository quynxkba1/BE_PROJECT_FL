import { Injectable, NotFoundException } from '@nestjs/common';
import { CardRepository } from '@repositories/card.repository';
import { CreateCardPayload, UpdateCardPayLoal } from './dto/card.dto';

@Injectable()
export class CardService {

    constructor(private readonly cardRepository: CardRepository){}

    async getCard(cardId: string) {
        const card =  await this.cardRepository.getCard(cardId);
        if(!card) {
            throw new NotFoundException("Invalid cardId"); 
        } 
        return card; 
    }

    async getCards() {
        return await this.cardRepository.getCards();
    }

    async createCard(cardPayload: CreateCardPayload) {
        return await this.cardRepository.createCard(cardPayload); 
    }

    async updateCard(cardPayload: UpdateCardPayLoal) {
        const card =  await this.cardRepository.updateCard(cardPayload); 
        if(!card) {
            throw new NotFoundException("Invalid cardId"); 
        } 
        return card; 
    }

    async deleteCard(cardId: string) {
        const card =  await this.cardRepository.deleteCard(cardId);
        if(!card) {
            throw new NotFoundException("Invalid cardId"); 
        } 
        return card;
    }
}
