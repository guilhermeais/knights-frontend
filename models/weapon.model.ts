import { KnightAttributesEnum } from "./enums/knight-attributes";

export type Weapon = {
  name: string;
  mod: number;
  attr: KnightAttributesEnum;
  image?: string;
};
