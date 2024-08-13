/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-users.dto";

export class PatchUserDto extends PartialType(CreateUserDto){}