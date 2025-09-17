import { Card } from "@/components/ui/card";
import { SecurityBadge } from "@/components/ui/security-badge";
import { Button } from "@/components/ui/button";
import { Server, Database, Shield, ArrowRight } from "lucide-react";

export const BackendIntegrationNotice = () => {
  return (
    <Card className="p-6 elevation border-warning/20 bg-warning/5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10 border border-warning/20">
          <Server className="h-6 w-6 text-warning" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold">Backend Integration Required</h3>
            <SecurityBadge variant="warning">Setup Needed</SecurityBadge>
          </div>
          <p className="text-muted-foreground mb-4">
            This secure frontend demonstrates OWASP security practices but requires backend integration 
            for full authentication, database operations, and complete security implementations.
          </p>
          
          <div className="grid gap-3 md:grid-cols-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Database className="h-4 w-4 text-primary" />
              <span>Secure Database</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span>Authentication API</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Server className="h-4 w-4 text-primary" />
              <span>Security Headers</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="text-primary border-primary hover:bg-primary/5">
              View Documentation
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="accent">
              Connect Backend
              <Server className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};