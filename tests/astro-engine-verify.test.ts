// 引擎行星位置回归测试：2026-07-19 12:00 UT vs Swiss Ephemeris 参考值（容差 ±1°）
// 参考值由 pyswisseph（tropical, geocentric）生成，见 PR 讨论。
import { buildAstroChart } from "../src/app/astro/astro-engine";

const city: any = {
  name: "London", nameEn: "London", country: "UK", countryEn: "UK",
  lat: 51.5074, lng: -0.1278, timezone: "Europe/London",
};

const REFERENCE: Record<string, number> = {
  Sun: 116.85, Moon: 183.85, Mercury: 107.19, Venus: 160.76, Mars: 74.53,
  Jupiter: 124.20, Saturn: 14.70, Uranus: 64.55, Neptune: 4.38, Pluto: 304.47,
};

test("geocentric planet longitudes match Swiss Ephemeris within 1°", () => {
  const chart = buildAstroChart({
    name: "t", birthDate: "2026-07-19", birthTime: "12:00", unknownTime: false, city,
  });
  for (const p of chart.planets) {
    const ref = REFERENCE[p.planet];
    if (ref === undefined) throw new Error(`no reference for ${p.planet}`);
    const diff = Math.abs(((p.longitude - ref + 540) % 360) - 180);
    expect(diff).toBeLessThan(1);
  }
});

test("venus moves with date (not frozen at J2000)", () => {
  const at = (d: string) =>
    buildAstroChart({ name: "t", birthDate: d, birthTime: "12:00", unknownTime: false, city })
      .planets.find((p) => p.planet === "Venus")!.longitude;
  const v1 = at("1990-06-15"), v2 = at("1990-09-15"), v3 = at("2000-03-01");
  expect(Math.abs(v1 - v2)).toBeGreaterThan(10);
  expect(Math.abs(v2 - v3)).toBeGreaterThan(10);
});
