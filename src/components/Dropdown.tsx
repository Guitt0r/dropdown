import { Children, ReactElement, ReactNode, useState } from "react";
import { cn } from "../lib/utils";
import chevron from "../assets/chevron.svg";

export const Dropdown = ({
  children,
  placeholder = "Select an option",
  searchFn,
}: {
  children: ReactNode;
  placeholder?: string;
  searchFn: (data: string[], searchTerm: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  function handleSelect(option: string) {
    setSelectedOption(option);
    setIsOpen(false);
  }

  return (
    <div className="relative min-w-[300px]">
      <div
        id="dropdown"
        tabIndex={0}
        className={cn(
          "text-[#999999] border-2 border-[#D1D5DB] rounded-[8px] px-[16px] py-[12px] flex items-center justify-between w-full transition",
          selectedOption && "text-[#333333]",
          isOpen && "rounded-b-none border-b-0"
        )}
        onMouseDown={() => setIsOpen(!isOpen)}
        onBlur={(e) => {
          !e.relatedTarget?.getAttribute("data-keep-focus") && setIsOpen(false);
        }}
        onFocus={() => setIsOpen(true)}
      >
        {selectedOption ? selectedOption : placeholder}
        <img
          className={cn("transition", isOpen && "rotate-180")}
          src={chevron}
          width={10}
          height={10}
        />
      </div>
      <ul
        data-keep-focus={true}
        className={cn(
          "absolute inset-x-0 hidden border-2 border-[#D1D5DB] rounded-b-[8px] transition text-[#6B7280]  py-[10px]",
          isOpen && "block"
        )}
      >
        <li>
          <input
            data-keep-focus={true}
            onChange={(e) =>
              searchFn(Children.toArray(children) as string[], e.target.value)
            }
            className="w-[calc(100%_-_16px)] mx-[8px] py-[4px]  px-[8px] rounded-[6px] border border-[#D1D5DB99]"
            type="search"
            placeholder="Пошук..."
          />
        </li>
        {Children.map(children, (child, index) => (
          <li
            className={cn(
              "cursor-pointer px-[16px] py-[8px] hover:bg-[#f1f1f1] transition",
              (child as ReactElement).props.className
            )}
            key={index}
            onMouseDown={() => handleSelect(child as string)}
          >
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
};
