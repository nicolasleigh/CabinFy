enum colorEnum {
  blue = "blue",
  green = "green",
  yellow = "yellow",
  indigo = "indigo",
}

function Stat({ icon, title, value, color }: { color: colorEnum }) {
  const colorMap = {
    blue: "bg-cBlue-100 text-cBlue-700 ",
    green: "bg-cGreen-100 text-cGreen-700",
    yellow: "bg-cYellow-100 text-cYellow-700 ",
    indigo: "bg-cIndigo-100 text-cIndigo-700 ",
  };

  return (
    <div className='border rounded-md p-2 grid grid-cols-[64px_1fr] gap-x-2 max-lg:gap-x-0 gap-y-1 grid-rows-2 h-full '>
      <div
        className={`${colorMap[color]} rounded-full w-16 h-16 max-lg:w-12 max-lg:h-12 row-span-full flex items-center justify-center self-center`}
      >
        {icon}
      </div>
      <p className='font-semibold text-lg max-lg:text-base text-cGrey-500 uppercase tracking-tight self-end'>{title}</p>
      <p className='leading-6 font-semibold text-lg max-lg:text-sm'>{value}</p>
    </div>
  );
}

export default Stat;
