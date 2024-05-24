import { BadRequestException } from "@nestjs/common";
import type { ApiPropertyOptions } from "@nestjs/swagger";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
  Validate,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isEmpty
} from "class-validator";
import { isAddress } from "viem";

import { intoError } from "@src/utils/intoError";

export function IsBool(
  target: NonNullable<unknown>,
  propertyKey: string | symbol
) {
  Transform(({ value }) => {
    return [true, "enabled", "true"].indexOf(value) > -1;
  })(target, propertyKey);
  IsBoolean()(target, propertyKey);
}

export function OptionalProperty(
  options?: ApiPropertyOptions
): PropertyDecorator {
  return (target: NonNullable<unknown>, propertyKey: string | symbol) => {
    ApiPropertyOptional(options)(target, propertyKey);
    Transform(({ value }) => (isEmpty(value) ? undefined : value))(
      target,
      propertyKey
    );
    IsOptional()(target, propertyKey);
  };
}

export function IsInteger() {
  return (target: NonNullable<unknown>, propertyKey: string | symbol) => {
    Type(() => Number)(target, propertyKey);
    IsInt()(target, propertyKey);
  };
}

export function Property(options?: ApiPropertyOptions): PropertyDecorator {
  return (target: NonNullable<unknown>, propertyKey: string | symbol) => {
    ApiProperty(options)(target, propertyKey);
    IsNotEmpty()(target, propertyKey);
  };
}

export class PaginatedQuery {
  @OptionalProperty({ example: 1, description: "default=1, min=1" })
  @IsInteger()
  @Min(1)
  page: number = 1;

  @OptionalProperty({ example: 60, description: "default=60, max=300" })
  @IsInteger()
  @Max(300)
  take: number = 60;
}

@ValidatorConstraint({ name: "isValidEthereumAddress", async: false })
class AddressValidator implements ValidatorConstraintInterface {
  validate(address: string) {
    return isAddress(address);
  }

  defaultMessage() {
    return "invalid address";
  }
}

@ValidatorConstraint({ name: "isValidEthereumAddress", async: false })
class BigIntValidator implements ValidatorConstraintInterface {
  validate(value: string | number) {
    try {
      return typeof BigInt(value) === "bigint";
    } catch (error) {
      return false;
    }
  }

  defaultMessage() {
    return "can not parse to bigint";
  }
}

export function IsAddress(): PropertyDecorator {
  return (target: NonNullable<unknown>, propertyKey: string | symbol) => {
    Validate(AddressValidator)(target, propertyKey);
  };
}

export function IsBigInt(
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (target: NonNullable<unknown>, propertyKey: string | symbol) => {
    Validate(BigIntValidator, validationOptions)(target, propertyKey);
    Transform(({ value }) => {
      try {
        return validationOptions?.each ? value.map(BigInt) : BigInt(value);
      } catch (error) {
        throw new BadRequestException(intoError(error).message);
      }
    })(target, propertyKey);
  };
}
