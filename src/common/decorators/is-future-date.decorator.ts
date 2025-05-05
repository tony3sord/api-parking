import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const now = new Date();
          const date = new Date(value);
          return date >= now;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} is incorrect.`;
        },
      },
    });
  };
}
