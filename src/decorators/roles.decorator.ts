import { SetMetadata } from '@nestjs/common';

export type Roles = 'User' | 'Admin';

export const Roles = (...roles: Roles[]) => SetMetadata('roles', roles);