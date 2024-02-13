import { KnightAttributesEnum } from "./enums/knight-attributes";
import { KnightType } from "./enums/knight-type";
import type { Weapon } from "./weapon.model";

export type SimpleKnight = {
  id: string;
  name: string;
  nickname: string;
  age: number;
  weaponsQuantity: number;
  keyAttribute: KnightAttributesEnum;
  attack: number;
  experience: number;
  type: KnightType;
  createdAt: Date;
  updatedAt?: Date;
};

export type Knight = {
  id: string;
  name: string;
  nickname: string;
  birthday: Date;
  age: number;
  attributes: KnightAttributes;
  keyAttribute: KnightAttributesEnum;
  weapons: KnightWeapon[];
  type: KnightType;
  attack: number;
  experience: number;
  createdAt: Date;
  updatedAt?: Date;
};

export type KnightAttributes = Partial<
  Record<Lowercase<keyof typeof KnightAttributesEnum>, number>
>;

export type KnightWeapon = Weapon & {
  equipped: boolean;
};

export const knightAttributesPortuguese: {
  [key in Lowercase<keyof typeof KnightAttributesEnum>]: string;
} = {
  charisma: "Carisma",
  constitution: "Constituição",
  dexterity: "Destreza",
  intelligence: "Inteligência",
  strength: "Força",
  wisdom: "Sabedoria",
};

export const knightTypePortuguese: {
  [key in Lowercase<keyof typeof KnightType>]: string;
} = {
  hero: "Herói",
  villain: "Vilão",
};
