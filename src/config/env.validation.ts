import { plainToInstance, Type } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
  validate,
} from 'class-validator';
import { IsDirectory } from './decorators/directory.decorator';

export class EnvironmentVariables {
  @IsIn(['development', 'production', 'test', 'provision'])
  NODE_ENV!: string;

  @IsString()
  @IsNotEmpty()
  APP_HOST!: string;

  @IsNumber()
  @Type(() => Number)
  APP_PORT!: number;

  @IsString()
  @IsNotEmpty()
  APP_API_DOMAIN!: string;

  @IsString()
  @IsNotEmpty()
  APP_CLIENT_URL!: string;

  @IsString()
  @IsNotEmpty()
  APP_LOGIN_REDIRECT!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(16)
  APP_SESSION_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(16)
  APP_JWT_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  EMAIL_HOST!: string;

  @IsString()
  EMAIL_ALIAS!: string;

  @IsEmail()
  EMAIL_USER!: string;

  @IsString()
  @IsNotEmpty()
  EMAIL_PASS!: string;

  @IsString()
  @IsNotEmpty()
  EMAIL_TRANSPORT!: string;

  @IsString()
  @IsNotEmpty()
  DB_USER!: string;

  @IsString()
  @IsNotEmpty()
  DB_PASS!: string;

  @IsString()
  @IsNotEmpty()
  DB_HOST!: string;

  @IsString()
  @IsNotEmpty()
  DB_PORT!: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME!: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL!: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_CLIENT!: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  @IsDirectory({ message: 'Path is not a valid absolute directory' })
  PICTURE_UPLOAD!: string;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  PICTURE_LIMIT!: number;
}

export async function validateEnviroment(config: Record<string, unknown>) {
  const env = plainToInstance(EnvironmentVariables, config);
  const errors = await validate(env, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return env;
}
