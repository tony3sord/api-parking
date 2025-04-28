import { createUserDtoTest } from '../../test/user/create.user.objects';

export const loginDtoTest = [
  {
    identifier: createUserDtoTest[0].username,
    password: createUserDtoTest[0].password,
    role: createUserDtoTest[0].role,
  },
  {
    identifier: createUserDtoTest[1].username,
    password: createUserDtoTest[1].password,
    role: createUserDtoTest[1].role,
  },
  {
    identifier: createUserDtoTest[2].username,
    password: createUserDtoTest[2].password,
    role: createUserDtoTest[2].role,
  },
];
