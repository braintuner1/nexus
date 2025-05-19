
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  linkTo: string;
  linkText: string;
  className?: string;
  iconClassName?: string;
}

const DashboardCard = ({
  title,
  description,
  icon: Icon,
  linkTo,
  linkText,
  className,
  iconClassName,
}: DashboardCardProps) => {
  return (
    <Card className={cn("bg-white shadow-md hover:shadow-lg transition-shadow", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-emerald-700">{title}</CardTitle>
          <div className={cn("p-2 rounded-full bg-emerald-100", iconClassName)}>
            <Icon className="h-6 w-6 text-emerald-700" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Link to={linkTo} className="w-full">
          <Button variant="outline" className="w-full border-emerald-500 text-emerald-700 hover:bg-emerald-50">
            {linkText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
