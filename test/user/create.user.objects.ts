import { RolesEnum } from '../../src/common/enums/roles.enum';

export const createUserDtoTest = [
  {
    name: 'Tony',
    lastname: 'Aliaga',
    username: 'tony3sord',
    email: 'tony@gmail.com',
    phone: '+53 55964629',
    password: 'securepassword123',
    role: RolesEnum.Client,
  },
  {
    name: 'Alice',
    lastname: 'Smith',
    username: 'alice123',
    email: 'alice@gmail.com',
    phone: '+53 55964630',
    password: 'securepassword123',
    role: RolesEnum.Admin,
  },
  {
    name: 'Diana',
    lastname: 'Prince',
    username: 'dianap',
    email: 'diana@gmail.com',
    phone: '+53 55964633',
    password: 'securepassword123',
    role: RolesEnum.Worker,
  },
];
