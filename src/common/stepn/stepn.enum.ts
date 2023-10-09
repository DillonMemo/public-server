/**
 * Stepn Market API 데이터 enums
 * {@link https://m.stepn.com/ StepnMarket}
 */
export enum Chain {
  SOL = 103,
  BNB = 104,
  EHT = 101,
}

export enum Type {
  shoeboxes = 301,
  gems = 501,
  sneakers = 600,
  walker = 601,
  jogger = 602,
  runner = 603,
  trainer = 604,
  rainbow = 614,
  specialSkin = 615,
  others = 701,
  badge = 410,
}

export enum Rarity {
  genesis = 1,
  og = 2,
}

export enum Quality {
  common = 1,
  uncommon = 2,
  rare = 3,
  epic = 4,
  legendary = 5,
}

export enum Order {
  lowestPrice = 2001,
  highestPrice = 2002,
  latest = 1002,
}

// level = 10031 -> 9레벨 부터 30레벨 까지
