import { Prisma } from '@prisma/client';

export type SignUpDto = Omit<Prisma.UserCreateInput, 'roles'> & {
  roleId: number;
};
