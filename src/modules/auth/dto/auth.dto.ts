import { OmitType, PartialType } from "@nestjs/swagger";
import { Property } from "@src/shared/parser";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class SignUpDto {
    @Property()
    @IsEmail()
    email: string; 

    @Property()
    @IsStrongPassword()
    password: string; 

    @Property()
    address: string
}

export class SignInDto extends PartialType(OmitType(SignUpDto,["address"])) {

}