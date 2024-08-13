/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(98)
    firstName: string

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(98)
    email: string

    @IsNotEmpty()
    @MaxLength(98)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
          'Minimum eight characters, at least one letter, one number and one special character',
      })
    password: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(98)
    lastName: string

}