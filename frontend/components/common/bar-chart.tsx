"use client";

import { useState, useEffect } from "react";

type Props = {
  LOW_STOCK_THRESHOLD: number;
  data: {
    category: string;
    count: number;
  }[];
};

const MAX_BAR_HEIGHT = 200; // Max height for the tallest bar in pixels

{
  /* {isHighlighted && (
                  <div
                    className={`absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap ${
                      tooltipPosition === "right" ? "left-full ml-2" : (
                        "right-full mr-2"
                      )
                    }`}
                    style={{
                      transform:
                        tooltipPosition === "right" ? "translateX(0)" : (
                          "translateX(0)"
                        ),
                    }}
                  >
                    <div className="font-semibold">{item.category}</div>
                    <div>Count: {item.count}</div>
                    {/* Tooltip arrow */
}
{
  /* <div
                      className="absolute w-0 h-0 border-4"
                      style={{
                        bottom: "-8px",
                        left: tooltipPosition === "right" ? "-8px" : "auto",
                        right: tooltipPosition === "left" ? "-8px" : "auto",
                        borderColor:
                          tooltipPosition === "right" ?
                            "gray-800 gray-800 transparent gray-800"
                          : "gray-800 gray-800 gray-800 transparent",
                      }}
                    ></div>
                  </div>
                )}  */
}

export default function BarChart({ data }: Props) {
  const [unitHeight, setUnitHeight] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      let maxCount = 0;
      let maxCountIndex = 0;

      data.forEach((item, index) => {
        if (item.count > maxCount) {
          maxCount = item.count;
          maxCountIndex = index;
        }
      });

      setUnitHeight(MAX_BAR_HEIGHT / maxCount);
      setHighlightedIndex(maxCountIndex);
    }
  }, [data]);

  //   const effectiveHighlightedIndex =
  //     hoveredIndex !== null ? hoveredIndex : highlightedIndex;
  //   const tooltipPosition =
  //     (
  //       effectiveHighlightedIndex !== null &&
  //       effectiveHighlightedIndex < Math.ceil(data.length / 2)
  //     ) ?
  //       "right"
  //     : "left";

  const renderTooltip = (item: Props["data"][number], index: number) => {
    const barHeight = item.count * (unitHeight ?? 0);
    const tooltipHorizontalPosition =
      index < Math.ceil(data.length / 2) ? "right" : "left";

    const dot = <div className="w-1 h-1 rounded-lg bg-black"></div>;
    const line = <div className="bg-black h-[1px] w-[20px] border-black"></div>;
    const tooltipData = (
      <div className="bg-black w-20 text-white text-xs rounded-md p-2">
        <div className="font-semibold">{item.category}</div>
        <div>Count: {item.count}</div>
      </div>
    );

    const handleToolTipPosition = () => {
      if (tooltipHorizontalPosition === "right") {
        return (
          <>
            {dot} {line} {tooltipData}
          </>
        );
      } else {
        return (
          <>
            {tooltipData} {line} {dot}
          </>
        );
      }
    };

    return (
      <div
        className={`absolute z-10 flex items-center ${tooltipHorizontalPosition === "right" ? "left-1/2" : "right-[10px]"} top-[-12px] `}
      >
        {/* <div className="bg-gray-800 text-white text-xs rounded-md px-2 py-1">
          <div className="font-semibold">{item.category}</div>
          <div>Count: {item.count}</div>
        </div> */}
        {handleToolTipPosition()}
      </div>
    );
  };

  if (unitHeight == null) {
    return (
      <div
        className={`h-[${MAX_BAR_HEIGHT}px] flex items-center justify-center`}
      >
        <p className="text-center text-gray-300">No data available</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={`h-[${MAX_BAR_HEIGHT}px] flex items-end gap-4 px-4 relative`}
      >
        {/* render bars of bar chart */}
        {unitHeight != null &&
          data.map((item, index) => {
            const isHighlighted = highlightedIndex === index;
            const barHeight = item.count * unitHeight;
            console.log(
              `Category: ${item.category}, Bar Height: ${item.count}*${unitHeight} = ${barHeight}px`,
            );

            return (
              <div
                key={item.category}
                className="relative flex flex-col items-center"
              >
                {/* Tooltip */}
                {isHighlighted && renderTooltip(item, index)}

                {/* Bar */}
                <div
                  id={item.category}
                  className="cursor-pointer transition-colors duration-200"
                  style={{
                    width: 20,
                    height: barHeight,
                    position: "relative",
                    borderRadius: 12,
                    backgroundColor: isHighlighted ? "#3b82f6" : "#e5e7eb",
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                ></div>
              </div>
            );
          })}
      </div>
      <hr className="border-gray-200 mt-1" />
    </>
  );
}
