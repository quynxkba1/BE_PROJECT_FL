import { OmitType, PartialType } from "@nestjs/swagger";
import { Property } from "@src/shared/parser";
import { IsEmail, IsOptional, IsStrongPassword, MaxLength } from "class-validator";

export class CreateUserPayload {
    @Property()
    @IsEmail()
    @MaxLength(50)
    email: String
    
    @Property()
    @IsStrongPassword()
    password: String 

    @Property()
    @MaxLength(42)
    address: String 
}

export class UpdateUserPayload extends PartialType(OmitType(CreateUserPayload, ['email', 'password'])){
    @Property()
    @MaxLength(42)
    @IsOptional()
    address: String 
}