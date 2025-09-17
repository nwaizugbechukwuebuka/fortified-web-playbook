import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Shield, AlertCircle, CheckCircle } from "lucide-react";

export interface SecureInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  showPasswordToggle?: boolean;
  securityLevel?: "low" | "medium" | "high";
}

const SecureInput = React.forwardRef<HTMLInputElement, SecureInputProps>(
  ({ 
    className, 
    type, 
    label, 
    error, 
    success, 
    showPasswordToggle = false,
    securityLevel,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    
    const inputType = showPasswordToggle && showPassword ? "text" : type;
    
    const getSecurityColor = () => {
      if (error) return "border-danger bg-danger/5";
      if (success) return "border-secure bg-secure/5 security-glow";
      if (securityLevel === "high") return "border-secure bg-secure/5";
      if (securityLevel === "medium") return "border-warning bg-warning/5";
      if (securityLevel === "low") return "border-danger bg-danger/5";
      return "border-input";
    };
    
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-primary" />
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={inputType}
            className={cn(
              "flex h-10 w-full rounded-md px-3 py-2 text-sm security-transition",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "disabled:cursor-not-allowed disabled:opacity-50",
              getSecurityColor(),
              isFocused && "primary-glow",
              className
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground security-transition"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
          
          {(error || success) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {error && <AlertCircle className="h-4 w-4 text-danger" />}
              {success && <CheckCircle className="h-4 w-4 text-secure" />}
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-danger flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5" />
            {error}
          </p>
        )}
        
        {securityLevel && !error && (
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Shield className="h-3 w-3" />
            Security level: <span className={cn(
              "font-medium",
              securityLevel === "high" && "text-secure",
              securityLevel === "medium" && "text-warning", 
              securityLevel === "low" && "text-danger"
            )}>{securityLevel}</span>
          </p>
        )}
      </div>
    );
  }
);

SecureInput.displayName = "SecureInput";

export { SecureInput };