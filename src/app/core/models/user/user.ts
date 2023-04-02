import { Entity } from 'dist/finan-exp-common';

export abstract class User extends Entity {
  public name!: string;

  public email!: string;

  public password!: string;
}
