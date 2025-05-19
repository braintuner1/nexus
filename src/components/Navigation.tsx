
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Users, BookOpen, FileText, GraduationCap, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Students', path: '/students', icon: <Users className="h-5 w-5" /> },
    { name: 'Assessments', path: '/assessments', icon: <BookOpen className="h-5 w-5" /> },
    { name: 'Reports', path: '/reports', icon: <FileText className="h-5 w-5" /> },
    { name: 'Teachers', path: '/teachers', icon: <GraduationCap className="h-5 w-5" /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart className="h-5 w-5" /> },
  ];

  return (
    <aside className="min-h-screen w-64 bg-sidebar text-sidebar-foreground p-4 shadow-md">
      <div className="flex items-center justify-center mb-8 pt-4">
        <h1 className="text-2xl font-bold text-sidebar-primary tracking-tight">
          Emerald School
        </h1>
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 font-medium text-base rounded-md mb-1 hover:bg-sidebar-accent",
                location.pathname === item.path
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground"
              )}
            >
              {item.icon}
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-8 left-4 right-4">
        <div className="bg-sidebar-accent rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-sidebar-primary mb-2">Emerald School Nexus</h3>
          <p className="text-sm text-sidebar-foreground/80">
            Version 1.0
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Navigation;
