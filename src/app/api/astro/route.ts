import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { buildAstroChart } from "../../astro/astro-engine";
import type { AstroInput } from "../../astro/astro-engine";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AstroInput;

    // 基础验证
    if (!body.name || !body.birthDate || !body.city) {
      return NextResponse.json(
        { error: "缺少必要参数：姓名、出生日期或城市" },
        { status: 400 },
      );
    }

    // 计算星盘
    const chart = buildAstroChart(body);

    return NextResponse.json(chart);
  } catch (err) {
    console.error("星盘计算错误:", err);
    return NextResponse.json(
      { error: "星盘计算失败，请检查输入参数" },
      { status: 500 },
    );
  }
}
