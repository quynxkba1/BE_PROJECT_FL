import { OmitType, PartialType } from "@nestjs/swagger";
import { Property } from "@src/shared/parser";

import { IsInt, IsString, IsUUID } from "class-validator";

export class CreateCardPayload {
    @Property()
    @IsInt()
    price: number; 
  
    @Property()
    @IsString()
  description: string;
  
    @Property()
    @IsString()
    imageUrl: string;
 
  }
  
export class UpdateCardPayLoal extends CreateCardPayload{
  @Property()
  @IsUUID()
  id: string;
}