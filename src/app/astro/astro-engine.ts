// ===== 星盘计算引擎 =====
// 使用纯 JS 近似算法计算星盘数据（适合 MVP 前端直接运算）
// 精度：太阳/月亮 ~1°，其他行星 ~2-3°，足够 MVP 使用

import type {
  ZodiacSign,
  Planet,
  AspectType,
  CityData,
} from "./astro-data";

import {
  ZODIAC_LIST,
  ASPECT_LIST,
  PLANET_LIST,
  HOUSE_LIST,
} from "./astro-data";

import {
  type Lang,
  getZodiacName,
  getPlanetName,
  getAspectName,
  getSunSignText,
  getMoonSignText,
  getRisingSignText,
  getPlanetInSignKeyword,
  getPlanetInHouseText,
  getAspectInterpretation,
} from "./astro-content-i18n";

// ===== 输入类型 =====
export interface AstroInput {
  name: string;           // 姓名/昵称
  birthDate: string;      // 出生日期 YYYY-MM-DD
  birthTime: string;      // 出生时间 HH:MM（"" 表示未知）
  unknownTime: boolean;   // 是否不知道时间
  city: CityData;         // 出生地
}

// ===== 输出类型 =====
export interface PlanetPosition {
  planet: Planet;
  longitude: number;     // 黄道经度 0-360°
  sign: ZodiacSign;      // 所在星座
  degree: number;        // 在星座内的度数 0-30°
  minute: number;        // 分
  house: number;         // 所在宫位 1-12
  retrograde: boolean;   // 是否逆行（MVP 近似计算）
}

export interface HouseCusp {
  house: number;         // 宫位编号 1-12
  longitude: number;     // 宫头黄道经度 0-360°
  sign: ZodiacSign;      // 宫头所在星座
  degree: number;        // 宫头在星座内的度数
}

export interface AspectResult {
  planet1: Planet;
  planet2: Planet;
  type: AspectType;
  orb: number;           // 实际容许度（度）
  applying: boolean;     // 是否入相位（两星靠近中）
  interpretation: string; // 解析文本
}

export interface Big3Interpretation {
  sun: { sign: ZodiacSign; text: string; };
  moon: { sign: ZodiacSign; text: string; };
  rising: { sign: ZodiacSign; text: string; } | null;
}

export interface AstroChart {
  input: AstroInput;
  // 计算时间（UTC）
  julianDay: number;
  // 行星位置
  planets: PlanetPosition[];
  // 宫位数据
  houses: HouseCusp[];
  ascendant: number;     // 上升点黄道经度
  mc: number;            // 天顶黄道经度
  // 相位
  aspects: AspectResult[];
  // 解析
  big3: Big3Interpretation;
  planetInterpretations: Array<{
    planet: Planet;
    sign: ZodiacSign;
    house: number;
    signKeyword?: string;
    houseText?: string;
  }>;
  topAspects: AspectResult[]; // 最紧密的 5 个相位
  // 元数据
  generatedAt: string;
  hasTimeData: boolean;
}

// ===== 天文计算工具函数 =====

// 角度转弧度
function deg2rad(deg: number): number {
  return (deg * Math.PI) / 180;
}

// 弧度转角度
function rad2deg(rad: number): number {
  return (rad * 180) / Math.PI;
}

// 规范化角度到 0-360
function normalizeDeg(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

// 计算儒略日（Julian Day Number）
// 输入：UTC 时间
export function calcJulianDay(year: number, month: number, day: number, hour = 12): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + hour / 24 + B - 1524.5;
}

// 从 Julian Day 计算 T（从 J2000.0 起算的儒略世纪数）
function jdToT(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

// ===== 太阳位置计算（VSOP87 简化版，精度约 0.01°）=====
function calcSunLongitude(T: number): number {
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const Mrad = deg2rad(M);
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
    + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
    + 0.000289 * Math.sin(3 * Mrad);
  const sunLon = L0 + C;
  // 修正光行差
  const omega = 125.04 - 1934.136 * T;
  const apparent = sunLon - 0.00569 - 0.00478 * Math.sin(deg2rad(omega));
  return normalizeDeg(apparent);
}

// ===== 月亮位置计算（简化版，精度约 0.5°）=====
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

  const moonLon = L0 + sumL / 1000000;
  return normalizeDeg(moonLon);
}

// ===== 行星黄道经度计算（VSOP87 简化，各行星精度 1-3°）=====
// 使用轨道根数方法进行近似计算
// interface OrbitalElements {
//   L: number; // 平均黄经系数 [0]:基准 [1]:T系数
//   a: number; // 半长轴（AU）
//   e: number; // 轨道离心率 [0]:基准 [1]:T系数
//   i: number; // 轨道倾角
//   omega: number; // 升交点黄经 [0]:基准 [1]:T系数
//   w: number;  // 近日点辐角 [0]:基准 [1]:T系数
// }

const PLANET_ORBITAL_ELEMENTS: Record<string, [number, number, number, number, number, number, number, number, number, number]> = {
  // [L0, L1, a, e0, e1, i0, omega0, omega1, w0, w1]
  Mercury: [252.2509573, 149472.6746358, 0.38709927, 0.20563593, 0.00001906, 7.00497902, 48.33076593, -0.12534081, 77.45779628, 0.16047689],
  Venus: [181.9790995, 58517.8156026, 0.72333566, 0.00677672, -0.00004107, 3.39467605, 76.67984255, -0.27769418, 131.60246718, 0.00268329],
  Mars: [355.4333275, 19140.2993313, 1.52371034, 0.09339410, 0.00007882, 1.84969142, 49.55953891, -0.29257343, 336.06023395, 0.44441088],
  Jupiter: [34.3971219, 3034.9056606, 5.20288700, 0.04838624, -0.00013253, 1.30439695, 100.47390909, 0.20469106, 14.72847983, 0.21252668],
  Saturn: [50.0774443, 1222.1138488, 9.53667594, 0.05386179, -0.00050991, 2.48599187, 113.66242448, -0.28867794, 92.59887831, -0.41897216],
  Uranus: [314.2278298, 428.4669983, 19.18916464, 0.04725744, -0.00004397, 0.77263783, 74.01692503, 0.04240589, 170.95427630, 0.40805281],
  Neptune: [304.8799785, 218.4651798, 30.06992276, 0.00859048, 0.00005105, 1.77004347, 131.78422574, -0.00508664, 44.96476227, -0.32241464],
  Pluto: [238.9290977, 145.2078580, 39.48211675, 0.24882730, 0.00005170, 17.14001206, 110.30393684, -0.01183482, 224.06891629, -0.04062942],
};

// 地球（EM Bary）轨道根数（JPL 近似星历表，1800–2050），用于地心换算
const EARTH_ORBITAL_ELEMENTS: [number, number, number, number, number, number, number, number, number, number] =
  [100.46457166, 35999.37244981, 1.00000261, 0.01671123, -0.00004392, -0.00001531, 0.0, 0.0, 102.93768193, 0.32327364];

// 由开普勒根数求行星日心黄道直角坐标（JPL 近似星历算法）
// 根数列：[L0, L1, a, e0, e1, i0, Ω0, Ω1, ϖ0, ϖ1]，速率单位为度/儒略世纪
function helioEclipticCoords(el: readonly number[], T: number): [number, number, number] {
  const [L0, L1, a, e0, e1, i0, om0, om1, w0, w1] = el as [number, number, number, number, number, number, number, number, number, number];

  const L = normalizeDeg(L0 + L1 * T);            // 平黄经
  const e = e0 + e1 * T;                          // 离心率
  const incl = deg2rad(i0);                       // 轨道倾角
  const node = deg2rad(normalizeDeg(om0 + om1 * T)); // 升交点黄经
  const wbar = normalizeDeg(w0 + w1 * T);         // 近日点黄经
  const argPeri = deg2rad(normalizeDeg(wbar - (om0 + om1 * T))); // 近日点辐角
  const M = normalizeDeg(L - wbar);               // 平近点角
  const Mrad = deg2rad(M);

  // 解开普勒方程 E - e·sinE = M（牛顿迭代）
  let E = Mrad + e * Math.sin(Mrad);
  for (let k = 0; k < 12; k++) {
    E = E - (E - e * Math.sin(E) - Mrad) / (1 - e * Math.cos(E));
  }

  // 轨道面坐标
  const xp = a * (Math.cos(E) - e);
  const yp = a * Math.sqrt(1 - e * e) * Math.sin(E);

  // 旋转到黄道坐标系
  const cw = Math.cos(argPeri), sw = Math.sin(argPeri);
  const cO = Math.cos(node), sO = Math.sin(node);
  const ci = Math.cos(incl), si = Math.sin(incl);
  const x = (cw * cO - sw * sO * ci) * xp + (-sw * cO - cw * sO * ci) * yp;
  const y = (cw * sO + sw * cO * ci) * xp + (-sw * sO + cw * cO * ci) * yp;
  const z = sw * si * xp + cw * si * yp;
  return [x, y, z];
}

function calcPlanetLongitude(planet: string, T: number): number {
  const el = PLANET_ORBITAL_ELEMENTS[planet];
  if (!el) return 0;

  // 日心坐标 → 减去地球日心坐标 = 地心矢量 → 地心黄经
  // （此前误写为 L0 + L1*T/36525，T 已是儒略世纪导致多除 36525，
  //   行星位置被冻结在 J2000 附近；且原返回值是日心经度，未做地心换算）
  const [px, py] = helioEclipticCoords(el, T);
  const [ex, ey] = helioEclipticCoords(EARTH_ORBITAL_ELEMENTS, T);
  return normalizeDeg(rad2deg(Math.atan2(py - ey, px - ex)));
}

// ===== 上升点计算（Placidus 分宫制）=====
// 输入：恒星时（LAST，度），纬度（度）
function calcAscendant(lst: number, lat: number): number {
  const lstRad = deg2rad(lst);
  const latRad = deg2rad(lat);
  // 黄赤交角（约 23.4°）
  const eps = deg2rad(23.4393);
  // 计算上升点
  const y = -Math.cos(lstRad);
  const x = Math.sin(lstRad) * Math.cos(eps) + Math.tan(latRad) * Math.sin(eps);
  let asc = rad2deg(Math.atan2(y, x));
  // 确保在正确象限
  if (x < 0) asc += 180;
  return normalizeDeg(asc);
}

// 计算天顶（MC）
function calcMC(lst: number): number {
  const lstRad = deg2rad(lst);
  const eps = deg2rad(23.4393);
  const mc = rad2deg(Math.atan2(Math.sin(lstRad), Math.cos(lstRad) * Math.cos(eps)));
  // 确保天顶在白天半球
  if (Math.cos(lstRad) < 0) return normalizeDeg(mc + 180);
  return normalizeDeg(mc);
}

// 计算恒星时（度）
function calcLocalSiderealTime(jd: number, longitude: number): number {
  const T = jdToT(jd);
  // 格林尼治恒星时（度）
  let GMST = 280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T - T * T * T / 38710000;
  GMST = normalizeDeg(GMST);
  // 加上地理经度
  return normalizeDeg(GMST + longitude);
}

// Placidus 十二宫计算（近似）
function calcPlacidusHouses(asc: number, mc: number): number[] {
  // 使用等距插值近似 Placidus 宫位
  const cusps = new Array<number>(13);
  cusps[1] = asc;      // 第一宫 = 上升点
  cusps[10] = mc;      // 第十宫 = 天顶

  // 第4宫 = MC + 180°
  cusps[4] = normalizeDeg(mc + 180);
  // 第7宫 = ASC + 180°
  cusps[7] = normalizeDeg(asc + 180);

  // 其余宫位近似插值
  for (let i = 2; i <= 3; i++) {
    const ratio = (i - 1) / 3;
    let span = normalizeDeg(cusps[4] - cusps[1]);
    if (span < 0) span += 360;
    cusps[i] = normalizeDeg(cusps[1] + span * ratio);
  }
  for (let i = 5; i <= 6; i++) {
    const ratio = (i - 4) / 3;
    let span = normalizeDeg(cusps[7] - cusps[4]);
    if (span < 0) span += 360;
    cusps[i] = normalizeDeg(cusps[4] + span * ratio);
  }
  for (let i = 8; i <= 9; i++) {
    const ratio = (i - 7) / 3;
    let span = normalizeDeg(cusps[10] - cusps[7]);
    if (span < 0) span += 360;
    cusps[i] = normalizeDeg(cusps[7] + span * ratio);
  }
  for (let i = 11; i <= 12; i++) {
    const ratio = (i - 10) / 3;
    let span = normalizeDeg(cusps[1] + 360 - cusps[10]);
    if (span < 0) span += 360;
    cusps[i] = normalizeDeg(cusps[10] + span * ratio);
  }

  return cusps;
}

// 根据黄道经度获取星座
function getZodiacSign(longitude: number): { sign: ZodiacSign; degree: number; minute: number } {
  const normalized = normalizeDeg(longitude);
  const signIndex = Math.floor(normalized / 30);
  const degInSign = normalized - signIndex * 30;
  const degree = Math.floor(degInSign);
  const minute = Math.floor((degInSign - degree) * 60);
  const signs: ZodiacSign[] = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
  ];
  return { sign: signs[signIndex]!, degree, minute };
}

// 根据黄道经度和宫头确定宫位
function getHouseForPlanet(longitude: number, houseCusps: number[]): number {
  const lon = normalizeDeg(longitude);
  for (let h = 1; h <= 12; h++) {
    const start = houseCusps[h] ?? 0;
    const end = houseCusps[h === 12 ? 1 : h + 1] ?? 0;
    if (start <= end) {
      if (lon >= start && lon < end) return h;
    } else {
      // 跨越0°
      if (lon >= start || lon < end) return h;
    }
  }
  return 1;
}

// 计算两星之间的相位
function calcAspect(lon1: number, lon2: number): { type: AspectType; orb: number } | null {
  let diff = Math.abs(normalizeDeg(lon1) - normalizeDeg(lon2));
  if (diff > 180) diff = 360 - diff;

  for (const aspect of ASPECT_LIST) {
    const orb = Math.abs(diff - aspect.degrees);
    if (orb <= aspect.orb) {
      return { type: aspect.id, orb };
    }
  }
  return null;
}

// ===== 主计算函数 =====
export function buildAstroChart(input: AstroInput, lang: Lang = "zh"): AstroChart {
  const { birthDate, birthTime, unknownTime, city } = input;

  // 解析出生日期
  const dateParts = birthDate.split("-").map(Number);
  const year = dateParts[0] ?? 2000;
  const month = dateParts[1] ?? 1;
  const day = dateParts[2] ?? 1;

  // 解析出生时间（转为UTC）
  let hour = 12; // 默认正午
  let hasTimeData = false;
  if (!unknownTime && birthTime) {
    const parts = birthTime.split(":").map(Number);
    const h = parts[0] ?? 0;
    const m = parts[1] ?? 0;
    // 从本地时间转UTC（使用时区偏移近似处理）
    const tzOffsetHours = city.timezone.includes("Shanghai") ? 8
      : city.timezone.includes("Tokyo") ? 9
      : city.timezone.includes("Seoul") ? 9
      : city.timezone.includes("Singapore") ? 8
      : city.timezone.includes("Kolkata") ? 5.5
      : city.timezone.includes("Bangkok") ? 7
      : city.timezone.includes("Jakarta") ? 7
      : city.timezone.includes("London") ? 0
      : city.timezone.includes("Paris") || city.timezone.includes("Berlin") ? 1
      : city.timezone.includes("Moscow") ? 3
      : city.timezone.includes("New_York") || city.timezone.includes("Toronto") ? -5
      : city.timezone.includes("Los_Angeles") ? -8
      : city.timezone.includes("Sydney") ? 10
      : city.timezone.includes("Taipei") ? 8
      : city.timezone.includes("Hong_Kong") ? 8
      : city.timezone.includes("Macau") ? 8
      : city.timezone.includes("Urumqi") ? 6
      : 8;
    hour = h + m / 60 - tzOffsetHours;
    if (hour < 0) hour += 24;
    if (hour >= 24) hour -= 24;
    hasTimeData = true;
  }

  // 计算儒略日
  const jd = calcJulianDay(year, month, day, hour);
  const T = jdToT(jd);

  // 计算各行星位置
  const planetLongitudes: Record<Planet, number> = {
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

  // 计算上升和宫位
  let ascendant = 0;
  let mc = 0;
  let houseCusps: number[] = Array.from<number>({ length: 13 }).fill(0);

  if (hasTimeData) {
    const lst = calcLocalSiderealTime(jd, city.lng);
    ascendant = calcAscendant(lst, city.lat);
    mc = calcMC(lst);
    houseCusps = calcPlacidusHouses(ascendant, mc);
  } else {
    // 无时间数据：均等宫位，太阳落入第1宫
    const sunLon = planetLongitudes.Sun;
    ascendant = sunLon; // 用太阳位置作为上升的近似
    for (let i = 1; i <= 12; i++) {
      houseCusps[i] = normalizeDeg(ascendant + (i - 1) * 30);
    }
    mc = normalizeDeg(ascendant + 270);
  }

  // 构建宫位数据
  const houses: HouseCusp[] = HOUSE_LIST.map((h) => {
    const lon = houseCusps[h.num] ?? 0;
    const { sign, degree } = getZodiacSign(lon);
    return { house: h.num, longitude: lon, sign, degree };
  });

  // 构建行星位置数据
  const planets: PlanetPosition[] = PLANET_LIST.map((p) => {
    const lon = planetLongitudes[p.id] ?? 0;
    const { sign, degree, minute } = getZodiacSign(lon);
    const house = getHouseForPlanet(lon, houseCusps);
    // 简单逆行判断（外行星在特定时期逆行，用T近似）
    const retrograde = false; // MVP 暂不计算逆行
    return { planet: p.id, longitude: lon, sign, degree, minute, house, retrograde };
  });

  // 计算相位
  const aspects: AspectResult[] = [];
  const planetOrder: Planet[] = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];

  for (let i = 0; i < planetOrder.length; i++) {
    for (let j = i + 1; j < planetOrder.length; j++) {
      const p1 = planetOrder[i]!;
      const p2 = planetOrder[j]!;
      const lon1 = planetLongitudes[p1] ?? 0;
      const lon2 = planetLongitudes[p2] ?? 0;
      const aspectResult = calcAspect(lon1, lon2);
      if (aspectResult) {
        // 查找解析文本
        const interpretation =
          getAspectInterpretation(p1, p2, aspectResult.type, lang)
          ?? `${getPlanetName(p1, lang)}与${getPlanetName(p2, lang)}形成${getAspectName(aspectResult.type, lang)}（容许度 ${aspectResult.orb.toFixed(1)}°）`;

        aspects.push({
          planet1: p1,
          planet2: p2,
          type: aspectResult.type,
          orb: aspectResult.orb,
          applying: false, // MVP 暂不计算是否入相位
          interpretation,
        });
      }
    }
  }

  // 按容许度排序相位
  aspects.sort((a, b) => a.orb - b.orb);

  // Big 3 解析
  const sunPos = planets.find((p) => p.planet === "Sun")!;
  const moonPos = planets.find((p) => p.planet === "Moon")!;
  const { sign: ascSign } = getZodiacSign(ascendant);

  const big3: Big3Interpretation = {
    sun: { sign: sunPos.sign, text: getSunSignText(sunPos.sign, lang) },
    moon: { sign: moonPos.sign, text: getMoonSignText(moonPos.sign, lang) },
    rising: hasTimeData ? { sign: ascSign, text: getRisingSignText(ascSign, lang) } : null,
  };

  // 行星解析列表
  const planetInterpretations = planets.map((p) => {
    const signKeyword = getPlanetInSignKeyword(p.planet, p.sign, lang);
    const houseText = getPlanetInHouseText(p.planet, p.house, lang);
    return {
      planet: p.planet,
      sign: p.sign,
      house: p.house,
      signKeyword,
      houseText,
    };
  });

  // 精选最重要的 5 个相位（容许度最小且涉及内行星）
  const importantPlanets: Planet[] = ["Sun", "Moon", "Mercury", "Venus", "Mars"];
  const topAspects = aspects
    .filter((a) => importantPlanets.includes(a.planet1) || importantPlanets.includes(a.planet2))
    .slice(0, 5);

  return {
    input,
    julianDay: jd,
    planets,
    houses,
    ascendant,
    mc,
    aspects,
    big3,
    planetInterpretations,
    topAspects,
    generatedAt: new Date().toISOString(),
    hasTimeData,
  };
}

// ===== 辅助：格式化行星位置为字符串 =====
export function formatPlanetPosition(pos: PlanetPosition, lang: Lang = "zh"): string {
  const zodiacData = ZODIAC_LIST.find((z) => z.id === pos.sign);
  if (!zodiacData) return "";
  return `${getZodiacName(pos.sign, lang)} ${pos.degree}°${pos.minute.toString().padStart(2, "0")}'`;
}

// ===== 辅助：获取元素组 =====
export function getElementBreakdown(planets: PlanetPosition[]): Record<string, number> {
  const counts: Record<string, number> = { fire: 0, earth: 0, air: 0, water: 0 };
  const zodiacMap = Object.fromEntries(ZODIAC_LIST.map((z) => [z.id, z]));
  for (const p of planets) {
    const element = zodiacMap[p.sign]?.element;
    if (element && element in counts) counts[element] = (counts[element] ?? 0) + 1;
  }
  return counts;
}

// ===== 辅助：获取模式分布 =====
export function getModalityBreakdown(planets: PlanetPosition[]): Record<string, number> {
  const counts: Record<string, number> = { cardinal: 0, fixed: 0, mutable: 0 };
  const zodiacMap = Object.fromEntries(ZODIAC_LIST.map((z) => [z.id, z]));
  for (const p of planets) {
    const modality = zodiacMap[p.sign]?.modality;
    if (modality && modality in counts) counts[modality] = (counts[modality] ?? 0) + 1;
  }
  return counts;
}

// 导出辅助类型
export type { ZodiacSign, Planet, AspectType, CityData };
export type { Lang };
