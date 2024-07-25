import { Knight, KnightWeapon, SimpleKnight } from "../../models/knight.model";
import { faker } from "@faker-js/faker";
import { KnightAttributesEnum } from "../../models/enums/knight-attributes";
import { KnightType } from "../../models/enums/knight-type";
import { PaginatedResponse } from "../../models/pagination";

export function makeSimpleKnight(
  overrides?: Partial<SimpleKnight>
): SimpleKnight {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 100 }),
    attack: faker.number.int({ min: 1, max: 100 }),
    experience: faker.number.int({ min: 1, max: 100 }),
    keyAttribute: KnightAttributesEnum.STRENGTH,
    createdAt: faker.date.recent(),
    nickname: faker.person.firstName(),
    type: KnightType.HERO,
    weaponsQuantity: 1,
    updatedAt: faker.date.recent(),
    ...overrides,
  };
}

export function makeKnight(overrides?: Partial<Knight>): Knight {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 100 }),
    attack: faker.number.int({ min: 1, max: 100 }),
    experience: faker.number.int({ min: 1, max: 100 }),
    keyAttribute: KnightAttributesEnum.STRENGTH,
    createdAt: faker.date.recent(),
    nickname: faker.person.firstName(),
    type: KnightType.HERO,
    updatedAt: faker.date.recent(),
    attributes: {
      strength: faker.number.int({ min: 1, max: 100 }),
    },
    birthday: faker.date.past(),
    weapons: [makeWeapon()],
    ...overrides,
  };
}

export function makeWeapon(overrides?: Partial<KnightWeapon>): KnightWeapon {
  return {
    name: faker.commerce.productName(),
    attr: KnightAttributesEnum.STRENGTH,
    equipped: true,
    mod: faker.number.int({ min: 1, max: 100 }),
    image: faker.image.url(),
    ...overrides,
  };
}

export function makeGetKnightsResponse(
  overrides?: Partial<PaginatedResponse<SimpleKnight>>
): PaginatedResponse<SimpleKnight> {
  return {
    data: Array.from({ length: 10 }, () => makeSimpleKnight()),
    limit: 10,
    page: 1,
    total: 10,
    totalPages: 1,
    nextPage: null,
    ...overrides,
  };
}
