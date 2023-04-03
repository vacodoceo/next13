"use client";

import { CharacterWithLevelRecords } from "@/app/api/update-characters/types/character";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/../tailwind.config.js";
import { useMemo } from "react";
import { formatClassName } from "@/helpers/format-character-name";
import { DateTime } from "luxon";
import { times } from "lodash-es";

const fullConfig = resolveConfig(tailwindConfig);

export const CharacterLevelChart = ({
  character,
}: {
  character: CharacterWithLevelRecords;
}) => {
  const formattedClass = useMemo(
    () => formatClassName(character.class),
    [character.class]
  );

  const data = character.LevelRecords.map((levelRecord) => ({
    level: levelRecord.level,
    timestamp: DateTime.fromISO(levelRecord.timestamp).valueOf(),
  }));

  const xAxisDomain = [
    DateTime.now().minus({ weeks: 1 }).valueOf(),
    DateTime.now().valueOf(),
  ];

  const xAxisTicks = times(8, (index) =>
    DateTime.now()
      .minus({ days: index * 2 })
      .valueOf()
  );

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
            left: -22,
          }}
        >
          <XAxis
            dataKey="timestamp"
            type="number"
            scale="time"
            domain={xAxisDomain}
            tickFormatter={(unixTime) =>
              DateTime.fromMillis(unixTime).toFormat("dd")
            }
            tick={{ fontSize: 12 }}
            ticks={xAxisTicks}
          />
          <YAxis dataKey="level" domain={[0, 60]} tick={{ fontSize: 12 }} />
          {/* @ts-ignore */}
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotoneX"
            dataKey="level"
            // @ts-ignore
            stroke={fullConfig.theme?.colors[formattedClass] as string}
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: {
    value: number;
  }[];
  label: number;
}) => {
  if (active && payload && payload.length) {
    const timestamp = DateTime.fromMillis(label);
    const formattedTimestamp = timestamp.toFormat("MMMM dd, HH:mm");

    return (
      <div className="rounded-md bg-white p-2 text-base text-gray-800">
        <p className="text-xs">{`${formattedTimestamp} - Level ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
