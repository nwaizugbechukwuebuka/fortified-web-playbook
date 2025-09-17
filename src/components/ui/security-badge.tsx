import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Shield, ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";

const securityBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium security-transition",
  {
    variants: {
      variant: {
        secure: "bg-secure/10 text-secure border border-secure/20 security-glow",
        warning: "bg-warning/10 text-warning border border-warning/20",
        danger: "bg-danger/10 text-danger border border-danger/20",
        info: "bg-primary/10 text-primary border border-primary/20",
      },
    },
    defaultVariants: {
      variant: "secure",
    },
  }
);

const iconMap = {
  secure: ShieldCheck,
  warning: AlertTriangle,
  danger: ShieldAlert,
  info: Shield,
};

export interface SecurityBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof securityBadgeVariants> {
  children: React.ReactNode;
}

const SecurityBadge = React.forwardRef<HTMLDivElement, SecurityBadgeProps>(
  ({ className, variant = "secure", children, ...props }, ref) => {
    const Icon = iconMap[variant || "secure"];
    
    return (
      <div
        className={cn(securityBadgeVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        <Icon className="h-3.5 w-3.5" />
        {children}
      </div>
    );
  }
);

SecurityBadge.displayName = "SecurityBadge";

export { SecurityBadge, securityBadgeVariants };