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
    "text-malta-800",
    "text-malta-700",
    "text-malta-600",
    "text-malta-500",
    "text-malta-400",
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
                        {/* Make sure input is a peer of label */}
                        <RadioGroupItem
                            value={level}
                            id={level}
                            className="peer hidden"
                        />
                        <label
                            htmlFor={level}
                            className={`
    cursor-pointer flex flex-col items-center justify-center transition-all duration-150
    hover:scale-105
    ${value === level ? 'scale-110 bg-malta-950 ring-1 ring-malta-400' : ''}
    ${roastLevelColors[i]}
    rounded-full p-3
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
