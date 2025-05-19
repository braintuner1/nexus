
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon: Icon, trend, className }: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            
            {trend && (
              <div className="flex items-center mt-2">
                <span className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-emerald-600" : "text-rose-600"
                )}>
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">from last term</span>
              </div>
            )}
          </div>
          
          <div className="p-2 rounded-full bg-emerald-100/80">
            <Icon className="h-8 w-8 text-emerald-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
