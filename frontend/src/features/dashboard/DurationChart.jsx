import { useEffect, useState } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import styled from 'styled-components';
import { useDarkMode } from '../../context/DarkModeContext';
import Heading from '../../ui/Heading';

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  font-size: 1.3rem;

  /* padding: 2.4rem 3.2rem; */
  padding: 2.2rem;
  grid-column: 3 / span 2;

  @media (max-width: 650px) {
    grid-column: 1 / -1;
  }

  @media (max-width: 500px) {
    margin-top: 2rem;
  }

  & > *:first-child {
    margin-bottom: 1.6rem;

    @media (max-width: 800px) {
      margin-bottom: 0.6rem;
    }
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: '1 night',
    value: 0,
    color: '#ef4444',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#f97316',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#eab308',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#84cc16',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#22c55e',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#14b8a6',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#3b82f6',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#a855f7',
  },
];

const startDataDark = [
  {
    duration: '1 night',
    value: 0,
    color: '#d04444',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#d86132',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#ae7627',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#7cbe25',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#16b852',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#13afa2',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#2c5de4',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#7e22ce',
  },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, '1 night');
      if (num === 2) return incArrayValue(arr, '2 nights');
      if (num === 3) return incArrayValue(arr, '3 nights');
      if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights');
      if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights');
      if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights');
      if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights');
      if (num >= 21) return incArrayValue(arr, '21+ nights');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays }) {
  const mediaMatch = window.matchMedia('(max-width: 800px)');
  const [matches, setMatches] = useState(mediaMatch.matches);
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addEventListener('change', handler);
    return () => mediaMatch.removeEventListener('change', handler);
  });

  return (
    <ChartBox>
      <Heading as='h2'>Stay duration summary</Heading>
      <ResponsiveContainer width={'100%'} height={matches ? 260 : 240}>
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
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip
            offset={10}
            contentStyle={{
              backgroundColor: 'var(--color-grey-100)',
              border: '1px solid var(--color-grey-200)',
              borderRadius: 'var(--border-radius-md)',
            }}
            itemStyle={{
              color: 'var(--color-grey-900)',
              fontSize: '1.3rem',
              fontFamily: 'serif',
            }}
          />
          <Legend
            // verticalAlign='middle'
            verticalAlign={matches ? 'top' : 'middle'}
            // height={23}
            // align='right'
            align={matches ? 'center' : 'right'}
            width='30%'
            layout='horizontal'
            iconSize={8}
            iconType='circle'
            wrapperStyle={
              matches && {
                width: '100%',
                height: '20%',
              }
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}
export default DurationChart;
