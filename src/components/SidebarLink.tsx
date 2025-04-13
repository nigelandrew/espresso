import {NavLink} from "react-router-dom";
import {cn} from "@/lib/utils"; // optional utility for conditional classnames if you're using it

type SidebarLinkProps = {
    to: string;
    icon: React.ReactNode;
    label: string;
    sidebarOpen: boolean;
};

export function SidebarLink({to, icon, label, sidebarOpen}: SidebarLinkProps) {
    return (
        <NavLink
            to={to}
            className={({isActive}) =>
                cn(
                    "flex items-center justify-start gap-3 text-sm font-medium hover:text-malta-300 transition-all duration-300",
                    isActive ? "text-malta-200" : "text-malta-100"
                )
            }
        >
            <div className="h-5 w-5 shrink-0">{icon}</div>

            <span
                className={cn(
                    "overflow-hidden whitespace-nowrap transition-all duration-300",
                    sidebarOpen ? "w-auto opacity-100 ml-2" : "w-0 opacity-0 ml-0"
                )}
            >
        {label}
      </span>
        </NavLink>
    );
}
