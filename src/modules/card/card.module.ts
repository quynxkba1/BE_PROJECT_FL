import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { CardRepository } from '@repositories/card.repository';

@Module({
  imports: [CardRepository], 
  controllers: [CardController],
  providers: [CardService, CardRepository],
})
export class CardModule {}
