import { NextRequest, NextResponse } from "next/server";
import { buildQimenChart } from "../../qimen/qimen-engine";
import type { QimenInput } from "../../qimen/qimen-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as QimenInput;

    // 基础参数校验
    const { year, month, day, hour, minute, city, panType, juType, event } = body;
    if (!year || !month || !day || hour === undefined || minute === undefined) {
      return NextResponse.json({ error: "缺少必要参数" }, { status: 400 });
    }

    const input: QimenInput = {
      year: Number(year),
      month: Number(month),
      day: Number(day),
      hour: Number(hour),
      minute: Number(minute),
      city: city ?? "北京",
      lng: body.lng,
      lat: body.lat,
      panType: panType ?? "zhuan",
      juType: juType ?? "zhe",
      event: event ?? "general",
    };

    const chart = buildQimenChart(input);

    return NextResponse.json({ success: true, chart });
  } catch (e) {
    console.error("[qimen/route] Error:", e);
    return NextResponse.json({ error: "排盘计算失败，请检查输入参数" }, { status: 500 });
  }
}
