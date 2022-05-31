import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { access, lstat } from 'fs/promises';
import { isAbsolute } from 'path';

@ValidatorConstraint({ async: true })
export class IsDirectoryConstraint implements ValidatorConstraintInterface {
  async validate(path: string, _: ValidationArguments): Promise<boolean> {
    if (isAbsolute(path)) {
      try {
        await access(path);
        const stats = await lstat(path);
        return stats.isDirectory();
      } catch {
        return false;
      }
    }
    return false;
  }
}

export function IsDirectory(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [IsDirectoryConstraint],
      validator: IsDirectoryConstraint,
    });
  };
}
