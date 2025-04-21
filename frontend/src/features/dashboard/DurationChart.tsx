import { useTheme } from "@/components/theme-provider";
import i18n from "@/i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const startDataLight = [
  {
    duration: i18n.t("stayNightOne"),
    value: 0,
    color: "#ef4444",
  },
  {
    duration: i18n.t("stayNights", { num: "2" }),
    value: 0,
    color: "#f97316",
  },
  {
    duration: i18n.t("stayNights", { num: "3" }),
    value: 0,
    color: "#eab308",
  },
  {
    duration: i18n.t("stayNights", { num: "4-5" }),
    value: 0,
    color: "#84cc16",
  },
  {
    duration: i18n.t("stayNights", { num: "6-7" }),
    value: 0,
    color: "#22c55e",
  },
  {
    duration: i18n.t("stayNights", { num: "8-14" }),
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: i18n.t("stayNights", { num: "15-21" }),
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: i18n.t("stayNights", { num: "21+" }),
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: i18n.t("stayNightOne"),
    value: 0,
    color: "#d04444",
  },
  {
    duration: i18n.t("stayNights", { num: "2" }),
    value: 0,
    color: "#d86132",
  },
  {
    duration: i18n.t("stayNights", { num: "3" }),
    value: 0,
    color: "#ae7627",
  },
  {
    duration: i18n.t("stayNights", { num: "4-5" }),
    value: 0,
    color: "#7cbe25",
  },
  {
    duration: i18n.t("stayNights", { num: "6-7" }),
    value: 0,
    color: "#16b852",
  },
  {
    duration: i18n.t("stayNights", { num: "8-14" }),
    value: 0,
    color: "#13afa2",
  },
  {
    duration: i18n.t("stayNights", { num: "15-21" }),
    value: 0,
    color: "#2c5de4",
  },
  {
    duration: i18n.t("stayNights", { num: "21+" }),
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) => (obj.duration === field ? { ...obj, value: obj.value + 1 } : obj));
  }
  const { t } = useTranslation();

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, t("stayNightOne"));
      if (num === 2) return incArrayValue(arr, t("stayNights", { num: "2" }));
      if (num === 3) return incArrayValue(arr, t("stayNights", { num: "3" }));
      if ([4, 5].includes(num)) return incArrayValue(arr, t("stayNights", { num: "4-5" }));
      if ([6, 7].includes(num)) return incArrayValue(arr, t("stayNights", { num: "6-7" }));
      if (num >= 8 && num <= 14) return incArrayValue(arr, t("stayNights", { num: "8-14" }));
      if (num >= 15 && num <= 21) return incArrayValue(arr, t("stayNights", { num: "15-21" }));
      if (num >= 21) return incArrayValue(arr, t("stayNights", { num: "21+" }));
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays }) {
  const mediaMatch = window.matchMedia("(max-width: 800px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const startData = theme === "dark" ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addEventListener("change", handler);
    return () => mediaMatch.removeEventListener("change", handler);
  });

  return (
    <div className='col-span-2 border rounded-md p-2 '>
      <h2 className='text-lg font-semibold'>{t("stayDurationSummary")}</h2>
      <ResponsiveContainer width={"100%"} height={matches ? 260 : 240}>
        <PieChart>
          <Pie
            data={data}
            nameKey='duration'
            dataKey='value'
            // innerRadius={85}
            // outerRadius={110}
            innerRadius={matches ? 70 : 85}
            outerRadius={matches ? 90 : 110}
            cx='50%'
            cy='50%'
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.duration} />
            ))}
          </Pie>
          <Tooltip
            offset={10}
            contentStyle={{
              backgroundColor: "var(--color-grey-100)",
              border: "1px solid var(--color-grey-200)",
              borderRadius: "var(--border-radius-md)",
            }}
            itemStyle={{
              color: "var(--color-grey-900)",
              fontSize: "1rem",
              fontFamily: "serif",
            }}
          />
          <Legend
            // verticalAlign='middle'
            verticalAlign={matches ? "top" : "middle"}
            // height={23}
            // align='right'
            align={matches ? "center" : "right"}
            width='30%'
            layout='horizontal'
            iconSize={8}
            iconType='circle'
            wrapperStyle={
              matches && {
                width: "100%",
                height: "20%",
              }
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
export default DurationChart;
