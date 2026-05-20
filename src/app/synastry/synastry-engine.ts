// ===== 星盘合盘（Synastry）核心计算引擎 =====
// 基于双方本命盘计算跨盘相位与契合度评分

import type { Planet, AspectType, CityData } from "./synastry-data";

import {
  RELATION_KEY_PLANETS,
  ASPECT_BASE_SCORE,
  getAspectText,
  DIMENSION_LABELS,
  getScoreTier,
} from "./synastry-data";

import type { RelationType } from "./synastry-data";

import {
  calcJulianDay,
} from "../astro/astro-engine";

import {
  ASPECT_LIST,
  PLANET_LIST,
  ZODIAC_LIST,
  PLANET_MAP,
} from "../astro/astro-data";

// ===== 输入类型 =====
export interface PersonInput {
  name: string;
  birthDate: string;       // YYYY-MM-DD
  birthTime: string;       // HH:MM，"" 表示未知
  unknownTime: boolean;
  city: CityData;
}

export interface SynastryInput {
  personA: PersonInput;
  personB: PersonInput;
  relationType: RelationType;
}

// ===== 行星位置（轻量） =====
export interface PlanetPos {
  planet: Planet;
  longitude: number;   // 0-360°
  sign: string;        // 星座中文名
  signId: string;      // 星座英文 ID
  degree: number;      // 星座内度数 0-30
  symbol: string;      // 行星符号
  color: string;       // 行星颜色
}

// ===== 跨盘相位 =====
export interface SynastryAspect {
  planetA: Planet;      // 甲方行星
  planetB: Planet;      // 乙方行星
  type: AspectType;
  orb: number;          // 容许度
  score: number;        // 对契合度的影响分（可正可负）
  weight: number;       // 行星对权重
  shortTitle: string;   // 相位标题（大白话）
  description: string;  // 相位解读
  isKeyPlanet: boolean; // 是否为该关系类型的重点行星对
  nature: "harmonious" | "challenging" | "neutral";
}

// ===== 契合度维度得分 =====
export interface DimensionScore {
  label: string;
  icon: string;
  desc: string;
  raw: number;    // 原始分
  score: number;  // 百分制 0-100
}

// ===== 合盘结果 =====
export interface SynastryResult {
  input: SynastryInput;
  // 双方行星位置
  planetsA: PlanetPos[];
  planetsB: PlanetPos[];
  // 跨盘相位
  aspects: SynastryAspect[];
  topAspects: SynastryAspect[];  // 最重要的 8 个相位
  // 契合度
  totalScore: number;    // 总分 0-100
  dimensions: [DimensionScore, DimensionScore, DimensionScore];
  tier: ReturnType<typeof getScoreTier>;
  // 元数据
  generatedAt: string;
}

// ===== 天文计算辅助 =====

function deg2rad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function rad2deg(rad: number): number {
  return (rad * 180) / Math.PI;
}

function normalizeDeg(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function jdToT(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

function calcSunLongitude(T: number): number {
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const Mrad = deg2rad(M);
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
    + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
    + 0.000289 * Math.sin(3 * Mrad);
  const sunLon = L0 + C;
  const omega = 125.04 - 1934.136 * T;
  const apparent = sunLon - 0.00569 - 0.00478 * Math.sin(deg2rad(omega));
  return normalizeDeg(apparent);
}

function calcMoonLongitude(T: number): number {
  const D = 297.85036 + 445267.111480 * T - 0.0019142 * T * T + T * T * T / 189474;
  const M = 357.52772 + 35999.050340 * T - 0.0001603 * T * T - T * T * T / 300000;
  const Mp = 134.96298 + 477198.867398 * T + 0.0086972 * T * T + T * T * T / 56250;
  const F = 93.27191 + 483202.017538 * T - 0.0036825 * T * T + T * T * T / 327270;
  const L0 = 218.3165 + 481267.8813 * T;

  const sumL = 6288774 * Math.sin(deg2rad(Mp))
    + 1274027 * Math.sin(deg2rad(2 * D - Mp))
    + 658314 * Math.sin(deg2rad(2 * D))
    + 213618 * Math.sin(deg2rad(2 * Mp))
    - 185116 * Math.sin(deg2rad(M))
    - 114332 * Math.sin(deg2rad(2 * F))
    + 58793 * Math.sin(deg2rad(2 * D - 2 * Mp))
    + 57066 * Math.sin(deg2rad(2 * D - M - Mp))
    + 53322 * Math.sin(deg2rad(2 * D + Mp))
    + 45758 * Math.sin(deg2rad(2 * D - M))
    - 40923 * Math.sin(deg2rad(M - Mp))
    - 34720 * Math.sin(deg2rad(D))
    - 30383 * Math.sin(deg2rad(M + Mp));

  return normalizeDeg(L0 + sumL / 1000000);
}

const PLANET_ORBITAL_ELEMENTS: Record<string, [number, number, number, number, number, number, number, number, number, number]> = {
  Mercury: [252.2509573, 149472.6746358, 0.38709927, 0.20563593, 0.00001906, 7.00497902, 48.33076593, -0.12534081, 77.45779628, 0.16047689],
  Venus:   [181.9790995,  58517.8156026, 0.72333566, 0.00677672, -0.00004107, 3.39467605, 76.67984255, -0.27769418, 131.60246718, 0.00268329],
  Mars:    [355.4333275,  19140.2993313, 1.52371034, 0.09339410,  0.00007882, 1.84969142, 49.55953891, -0.29257343, 336.06023395, 0.44441088],
  Jupiter: [ 34.3971219,   3034.9056606, 5.20288700, 0.04838624, -0.00013253, 1.30439695, 100.47390909, 0.20469106,  14.72847983, 0.21252668],
  Saturn:  [ 50.0774443,   1222.1138488, 9.53667594, 0.05386179, -0.00050991, 2.48599187, 113.66242448, -0.28867794, 92.59887831, -0.41897216],
  Uranus:  [314.2278298,    428.4669983,19.18916464, 0.04725744, -0.00004397, 0.77263783,  74.01692503,  0.04240589, 170.95427630,  0.40805281],
  Neptune: [304.8799785,    218.4651798,30.06992276, 0.00859048,  0.00005105, 1.77004347, 131.78422574, -0.00508664,  44.96476227, -0.32241464],
  Pluto:   [238.9290977,    145.2078580,39.48211675, 0.24882730,  0.00005170,17.14001206, 110.30393684, -0.01183482, 224.06891629, -0.04062942],
};

function calcPlanetLongitude(planet: string, T: number): number {
  const el = PLANET_ORBITAL_ELEMENTS[planet];
  if (!el) return 0;
  const [L0, L1, , e0, e1, , , , w0, w1] = el;
  const L = normalizeDeg(L0 + L1 * T / 36525);
  const e = e0 + e1 * T;
  const w = normalizeDeg(w0 + w1 * T);
  const M = normalizeDeg(L - w);
  const Mrad = deg2rad(M);
  const EC = (2 * e - e * e * e / 4) * Math.sin(Mrad)
    + (5 / 4) * e * e * Math.sin(2 * Mrad)
    + (13 / 12) * e * e * e * Math.sin(3 * Mrad);
  return normalizeDeg(L + rad2deg(EC));
}

function getZodiacInfo(longitude: number) {
  const normalized = normalizeDeg(longitude);
  const signIndex = Math.floor(normalized / 30);
  const degInSign = normalized - signIndex * 30;
  const zodiac = ZODIAC_LIST[signIndex];
  return {
    signId: zodiac?.id ?? "Aries",
    sign: zodiac?.name ?? "白羊座",
    degree: Math.floor(degInSign),
    minute: Math.floor((degInSign - Math.floor(degInSign)) * 60),
  };
}

function getTimezoneHours(timezone: string): number {
  if (timezone.includes("Shanghai") || timezone.includes("Taipei") ||
      timezone.includes("Hong_Kong") || timezone.includes("Macau") ||
      timezone.includes("Singapore") || timezone.includes("Kuala_Lumpur")) return 8;
  if (timezone.includes("Tokyo") || timezone.includes("Seoul")) return 9;
  if (timezone.includes("Kolkata")) return 5.5;
  if (timezone.includes("Bangkok") || timezone.includes("Jakarta")) return 7;
  if (timezone.includes("Urumqi")) return 6;
  if (timezone.includes("London")) return 0;
  if (timezone.includes("Paris") || timezone.includes("Berlin")) return 1;
  if (timezone.includes("Moscow")) return 3;
  if (timezone.includes("New_York") || timezone.includes("Toronto")) return -5;
  if (timezone.includes("Los_Angeles")) return -8;
  if (timezone.includes("Sydney")) return 10;
  return 8;
}

// ===== 计算某人的行星位置列表 =====
function calcPersonPlanets(input: PersonInput): PlanetPos[] {
  const { birthDate, birthTime, unknownTime, city } = input;
  const [year, month, day] = birthDate.split("-").map(Number) as [number, number, number];

  let hour = 12;
  if (!unknownTime && birthTime) {
    const [h, m] = birthTime.split(":").map(Number) as [number, number];
    const tzOffset = getTimezoneHours(city.timezone);
    hour = h + m / 60 - tzOffset;
    if (hour < 0) hour += 24;
    if (hour >= 24) hour -= 24;
  }

  const jd = calcJulianDay(year, month, day, hour);
  const T = jdToT(jd);

  const longitudes: Record<Planet, number> = {
    Sun: calcSunLongitude(T),
    Moon: calcMoonLongitude(T),
    Mercury: calcPlanetLongitude("Mercury", T),
    Venus: calcPlanetLongitude("Venus", T),
    Mars: calcPlanetLongitude("Mars", T),
    Jupiter: calcPlanetLongitude("Jupiter", T),
    Saturn: calcPlanetLongitude("Saturn", T),
    Uranus: calcPlanetLongitude("Uranus", T),
    Neptune: calcPlanetLongitude("Neptune", T),
    Pluto: calcPlanetLongitude("Pluto", T),
  };

  return PLANET_LIST.map((p) => {
    const lon = longitudes[p.id] ?? 0;
    const info = getZodiacInfo(lon);
    return {
      planet: p.id,
      longitude: lon,
      sign: info.sign,
      signId: info.signId,
      degree: info.degree,
      symbol: p.symbol,
      color: p.color,
    };
  });
}

// ===== 计算两星之间的相位 =====
function detectAspect(lon1: number, lon2: number): { type: AspectType; orb: number; nature: "harmonious" | "challenging" | "neutral" } | null {
  let diff = Math.abs(normalizeDeg(lon1) - normalizeDeg(lon2));
  if (diff > 180) diff = 360 - diff;

  for (const asp of ASPECT_LIST) {
    const orb = Math.abs(diff - asp.degrees);
    if (orb <= asp.orb) {
      return { type: asp.id, orb, nature: asp.nature };
    }
  }
  return null;
}

// ===== 计算跨盘相位 =====
function calcSynastryAspects(
  planetsA: PlanetPos[],
  planetsB: PlanetPos[],
  relationType: RelationType,
): SynastryAspect[] {
  const keyPlanets = RELATION_KEY_PLANETS[relationType];
  const keyPlanetSet = new Set(
    keyPlanets.flatMap((kp) => [`${kp.p1}-${kp.p2}`, `${kp.p2}-${kp.p1}`])
  );

  // 关键行星权重快查
  const keyWeightMap = new Map<string, number>();
  for (const kp of keyPlanets) {
    keyWeightMap.set(`${kp.p1}-${kp.p2}`, kp.weight);
    keyWeightMap.set(`${kp.p2}-${kp.p1}`, kp.weight);
  }

  const results: SynastryAspect[] = [];

  // 只计算重要行星（内行星 + 木星土星）之间的跨盘相位
  const importantPlanets: Planet[] = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];

  for (const posA of planetsA) {
    if (!importantPlanets.includes(posA.planet)) continue;
    for (const posB of planetsB) {
      if (!importantPlanets.includes(posB.planet)) continue;

      const asp = detectAspect(posA.longitude, posB.longitude);
      if (!asp) continue;

      const key = `${posA.planet}-${posB.planet}`;
      const revKey = `${posB.planet}-${posA.planet}`;
      const weight = keyWeightMap.get(key) ?? keyWeightMap.get(revKey) ?? 1.0;
      const isKey = keyPlanetSet.has(key) || keyPlanetSet.has(revKey);

      // 获取相位文案
      const textData = getAspectText(posA.planet, posB.planet, asp.type, relationType);

      // 计算得分：基础分 × 权重
      const baseScore = ASPECT_BASE_SCORE[asp.type];
      const orbFactor = 1 - (asp.orb / (ASPECT_LIST.find((a) => a.id === asp.type)?.orb ?? 8)) * 0.4;
      const score = baseScore * weight * orbFactor;

      // 生成默认文案（如果没有专属文案）
      const pAName = PLANET_MAP[posA.planet]?.name ?? posA.planet;
      const pBName = PLANET_MAP[posB.planet]?.name ?? posB.planet;
      const aspName = ASPECT_LIST.find((a) => a.id === asp.type)?.name ?? asp.type;

      results.push({
        planetA: posA.planet,
        planetB: posB.planet,
        type: asp.type,
        orb: asp.orb,
        score,
        weight,
        shortTitle: textData?.shortTitle ?? `${pAName}${aspName}${pBName}`,
        description: textData?.description ?? `你的${pAName}与TA的${pBName}形成${aspName}（容许度 ${asp.orb.toFixed(1)}°），两人在这方面有${asp.nature === "harmonious" ? "和谐" : asp.nature === "challenging" ? "张力" : "强烈"}的能量交互。`,
        isKeyPlanet: isKey,
        nature: asp.nature,
      });
    }
  }

  // 按综合重要度排序：关键行星优先，分数绝对值大的优先，容许度小的优先
  results.sort((a, b) => {
    if (a.isKeyPlanet !== b.isKeyPlanet) return a.isKeyPlanet ? -1 : 1;
    if (Math.abs(b.score) !== Math.abs(a.score)) return Math.abs(b.score) - Math.abs(a.score);
    return a.orb - b.orb;
  });

  return results;
}

// ===== 计算各维度得分 =====
function calcDimensions(
  aspects: SynastryAspect[],
  relationType: RelationType,
): [DimensionScore, DimensionScore, DimensionScore] {
  const dimLabels = DIMENSION_LABELS[relationType];

  // 维度行星映射
  const dimPlanets: [Planet[], Planet[], Planet[]] = relationType === "love"
    ? [
        ["Moon", "Sun"],          // d1: 情感共鸣
        ["Venus", "Mars"],        // d2: 浪漫吸引
        ["Sun", "Jupiter", "Saturn"], // d3: 灵魂契合
      ]
    : relationType === "friendship"
    ? [
        ["Mercury", "Moon"],      // d1: 沟通默契
        ["Moon", "Venus"],        // d2: 情感支持
        ["Sun", "Jupiter"],       // d3: 共同成长
      ]
    : [
        ["Mercury", "Saturn"],    // d1: 沟通效率
        ["Mars", "Sun"],          // d2: 执行默契
        ["Sun", "Jupiter", "Saturn"], // d3: 目标一致
      ];

  const calcDimRaw = (planets: Planet[]): number => {
    let total = 0;
    let count = 0;
    for (const asp of aspects) {
      if (planets.includes(asp.planetA) || planets.includes(asp.planetB)) {
        total += asp.score;
        count++;
      }
    }
    // 无相位时给中性基础分
    if (count === 0) return 20;
    return total;
  };

  // 归一化：原始分 → 0-100
  const normalize = (raw: number): number => {
    // 典型范围约 [-30, 80]，映射到 30-95
    const clamped = Math.max(-50, Math.min(120, raw));
    return Math.round(30 + ((clamped + 50) / 170) * 65);
  };

  return [
    { label: dimLabels.d1.label, icon: dimLabels.d1.icon, desc: dimLabels.d1.desc, raw: calcDimRaw(dimPlanets[0]), score: normalize(calcDimRaw(dimPlanets[0])) },
    { label: dimLabels.d2.label, icon: dimLabels.d2.icon, desc: dimLabels.d2.desc, raw: calcDimRaw(dimPlanets[1]), score: normalize(calcDimRaw(dimPlanets[1])) },
    { label: dimLabels.d3.label, icon: dimLabels.d3.icon, desc: dimLabels.d3.desc, raw: calcDimRaw(dimPlanets[2]), score: normalize(calcDimRaw(dimPlanets[2])) },
  ];
}

// ===== 计算总契合度 =====
function calcTotalScore(aspects: SynastryAspect[], relationType: RelationType): number {
  const keyPlanets = RELATION_KEY_PLANETS[relationType];

  let weightedSum = 0;
  let totalWeight = 0;

  for (const asp of aspects) {
    // 找是否是关键行星对
    const isKey = keyPlanets.some(
      (kp) => (kp.p1 === asp.planetA && kp.p2 === asp.planetB) ||
               (kp.p1 === asp.planetB && kp.p2 === asp.planetA)
    );
    const w = isKey ? asp.weight * 2 : asp.weight;
    weightedSum += asp.score * w;
    totalWeight += w;
  }

  // 基础分 + 加权平均
  const avgScore = totalWeight > 0 ? weightedSum / totalWeight : 0;

  // 将 [-20, 25] 的平均分映射到 [35, 95]
  const clamped = Math.max(-20, Math.min(25, avgScore));
  const total = Math.round(35 + ((clamped + 20) / 45) * 60);

  // 加入一点随机性（基于姓名 hash，保持稳定），让相近分数有所区分
  const nameHash = [...(keyPlanets.map((k) => k.p1).join(""))].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const jitter = (nameHash % 7) - 3; // -3 ~ +3

  return Math.max(30, Math.min(98, total + jitter));
}

// ===== 主入口 =====
export function buildSynastryResult(input: SynastryInput): SynastryResult {
  const planetsA = calcPersonPlanets(input.personA);
  const planetsB = calcPersonPlanets(input.personB);

  const aspects = calcSynastryAspects(planetsA, planetsB, input.relationType);
  const topAspects = aspects.slice(0, 8);

  const dimensions = calcDimensions(aspects, input.relationType);
  const totalScore = calcTotalScore(aspects, input.relationType);
  const tier = getScoreTier(totalScore);

  return {
    input,
    planetsA,
    planetsB,
    aspects,
    topAspects,
    totalScore,
    dimensions,
    tier,
    generatedAt: new Date().toISOString(),
  };
}

// ===== 辅助：格式化行星度数 =====
export function formatDegree(longitude: number): string {
  const info = (() => {
    const normalized = normalizeDeg(longitude);
    const signIndex = Math.floor(normalized / 30);
    const degInSign = normalized - signIndex * 30;
    const degree = Math.floor(degInSign);
    const minute = Math.floor((degInSign - degree) * 60);
    const zodiac = ZODIAC_LIST[signIndex];
    return { sign: zodiac?.name ?? "", degree, minute };
  })();
  return `${info.sign} ${info.degree}°${info.minute.toString().padStart(2, "0")}'`;
}

// ===== 辅助：获取相位的中文名和符号 =====
export function getAspectInfo(type: AspectType) {
  return ASPECT_LIST.find((a) => a.id === type);
}
