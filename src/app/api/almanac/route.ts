import { NextRequest, NextResponse } from "next/server";
import { getDayInfo, findLuckyDays, getMonthCalendar } from "../../almanac/almanac-engine";
import type { AlmanacSearchParams } from "../../almanac/almanac-engine";
import type { ShengXiao } from "../../almanac/almanac-data";
import { SHENG_XIAO } from "../../almanac/almanac-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action") ?? "day";

    if (action === "day") {
      // 获取指定日的黄历
      const year  = parseInt(searchParams.get("year")  ?? String(new Date().getFullYear()));
      const month = parseInt(searchParams.get("month") ?? String(new Date().getMonth() + 1));
      const day   = parseInt(searchParams.get("day")   ?? String(new Date().getDate()));

      if (isNaN(year) || isNaN(month) || isNaN(day)
        || month < 1 || month > 12 || day < 1 || day > 31) {
        return NextResponse.json({ error: "日期参数无效" }, { status: 400 });
      }

      const info = getDayInfo(year, month, day);
      return NextResponse.json({ success: true, data: info });
    }

    if (action === "calendar") {
      // 获取月历视图
      const year  = parseInt(searchParams.get("year")  ?? String(new Date().getFullYear()));
      const month = parseInt(searchParams.get("month") ?? String(new Date().getMonth() + 1));

      const calendar = getMonthCalendar(year, month);
      return NextResponse.json({ success: true, data: calendar });
    }

    return NextResponse.json({ error: "未知的 action" }, { status: 400 });
  } catch (err) {
    console.error("Almanac GET 错误:", err);
    return NextResponse.json({ error: "获取黄历数据失败" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      event?: string;
      startYear?: number;
      startMonth?: number;
      endYear?: number;
      endMonth?: number;
      userShengxiao?: string;
      partnerShengxiao?: string;
      weekendOnly?: boolean;
    };

    if (!body.event) {
      return NextResponse.json({ error: "请选择择日事项" }, { status: 400 });
    }

    const now = new Date();
    const startDate = new Date(
      body.startYear  ?? now.getFullYear(),
      (body.startMonth ?? now.getMonth() + 1) - 1,
      1
    );
    const endDate = new Date(
      body.endYear  ?? now.getFullYear(),
      (body.endMonth  ?? now.getMonth() + 2) - 1,
      0 // 月末最后一天
    );

    // 限制查询范围不超过6个月
    const maxEnd = new Date(startDate);
    maxEnd.setMonth(maxEnd.getMonth() + 6);
    const effectiveEnd = endDate > maxEnd ? maxEnd : endDate;

    // 验证生肖
    function validateShengxiao(val: string | undefined): ShengXiao | undefined {
      if (!val) return undefined;
      return SHENG_XIAO.includes(val as ShengXiao) ? (val as ShengXiao) : undefined;
    }

    const params: AlmanacSearchParams = {
      event:             body.event,
      startDate,
      endDate:           effectiveEnd,
      userShengxiao:     validateShengxiao(body.userShengxiao),
      partnerShengxiao:  validateShengxiao(body.partnerShengxiao),
      weekendOnly:       body.weekendOnly ?? false,
    };

    const luckyDays = findLuckyDays(params);

    return NextResponse.json({
      success: true,
      count: luckyDays.length,
      data: luckyDays,
    });
  } catch (err) {
    console.error("Almanac POST 错误:", err);
    return NextResponse.json({ error: "择日计算失败，请稍后再试" }, { status: 500 });
  }
}
