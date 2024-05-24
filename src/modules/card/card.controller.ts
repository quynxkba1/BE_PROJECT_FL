import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CardService } from './card.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCardPayload, UpdateCardPayLoal } from './dto/card.dto';

@Controller('card')
@ApiTags("User")
export class CardController {

  constructor(private readonly cardService: CardService) {}

  @Get("list")
  getCards() {
    return this.cardService.getCards();
  }

  @Post('create-card')
  createCard(@Body() createCardPayload: CreateCardPayload) {
    return this.cardService.createCard(createCardPayload);
  }

  @Patch("update-card")
  updateCard(@Body() updateCardPayload: UpdateCardPayLoal) {
    return this.cardService.updateCard(updateCardPayload);
  }

  @Get(":cardId")
  getCard(@Param('cardId') cardId: string) {
    return this.cardService.getCard(cardId); 
  }  

  @Delete(":cardId")
  deleteCard(@Param("cardId") cardId: string) {
    return this.cardService.deleteCard(cardId);
  }
}
