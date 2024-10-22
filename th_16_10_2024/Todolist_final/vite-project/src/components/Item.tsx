import { CalendarHeart } from "lucide-react";
import { ItemProps } from "../types/Todo";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "./ui/badge";

const Item = ({ title, date, color, state, onToggle }: ItemProps) => {
  const getColorClass = (color: string) => {
    switch (color) {
      case "orange":
        return "bg-orange-500 hover:bg-orange-500/75";
      case "lavender":
        return "bg-purple-400 hover:bg-purple-400/75";
      case "green":
        return "bg-green-500 hover:bg-green-500/75";
      default:
        return "bg-white hover:bg-white/75";
    }
  };

  return (
    <div className="flex items-center gap-4 bg-[#18181b] rounded-xl p-4 border border-gray-border">
      <Checkbox
        checked={state}
        onCheckedChange={onToggle}
        className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black "
      />
      <div className="flex flex-col gap-2">
        <h1
          className={`font-semibold text-white ${
            state ? "line-through opacity-50" : ""
          }`}
        >
          {title}
        </h1>
        <Badge className={`w-fit px-3 py-1 gap-2 ${getColorClass(color)}`}>
          <CalendarHeart className="h-4 w-4" />
          <p>{date}</p>
        </Badge>
      </div>
    </div>
  );
};

export default Item;
