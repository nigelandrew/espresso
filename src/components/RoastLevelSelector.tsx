import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import { Icon } from "lucide-react";
import { coffeeBean } from "@lucide/lab";
import { RoastLevel } from "@/types/roast-level.ts";

const roastLevels: RoastLevel[] = [
    "dark",
    "medium-dark",
    "medium",
    "medium-light",
    "light",
];

const labels: Record<RoastLevel, string> = {
    dark: "Dark",
    "medium-dark": "Med-Dark",
    medium: "Medium",
    "medium-light": "Med-Light",
    light: "Light",
};

const roastLevelColors = [
    "text-malta-800",   // dark
    "text-malta-700",   // med-dark
    "text-malta-600",   // medium
    "text-malta-500",   // med-light
    "text-malta-400",   // light
];

type Props = {
    value: RoastLevel;
    onChange: (value: RoastLevel) => void;
};

export function RoastLevelSelector({ value, onChange }: Props) {
    return (
        <div className="w-full flex flex-col items-center">

            <RadioGroup
                value={value}
                onValueChange={(val) => onChange(val as RoastLevel)}
                className="flex gap-6 justify-center"
            >
                {roastLevels.map((level, i) => (
                    <div key={level} className="flex flex-col items-center gap-1">
                        <RadioGroupItem
                            value={level}
                            id={level}
                            className="peer opacity-0 absolute"
                        />
                        <label
                            htmlFor={level}
                            className={`
    cursor-pointer flex flex-col items-center transition
    hover:scale-105 peer-checked:scale-110
    ${roastLevelColors[i]}
    peer-checked:text-malta-400
    peer-checked:border-2 peer-checked:border-malta-400
    rounded-full p-2
  `}
                        >
                            <Icon iconNode={coffeeBean} className="h-6 w-6" />
                            <span className="text-xs mt-1 text-center">{labels[level]}</span>
                        </label>

                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}
