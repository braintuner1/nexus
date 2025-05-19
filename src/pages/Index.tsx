
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import DashboardCard from '@/components/Dashboard/DashboardCard';
import StatCard from '@/components/Dashboard/StatCard';
import { Users, BookOpen, FileText, GraduationCap, BookOpenCheck, Award, CheckSquare } from 'lucide-react';
import { generateMockStudents, generateMockTeachers, generateMockAssessments } from '@/types';

const Dashboard = () => {
  // Generate some mock data for the dashboard
  const totalStudents = 524;
  const totalTeachers = 42;
  const completedAssessments = 8;
  const pendingReports = 3;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back to Emerald School Nexus</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <CheckSquare className="mr-2 h-4 w-4" /> Generate Reports
              </Button>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Students"
              value={totalStudents}
              icon={Users}
              trend={{ value: 5.2, isPositive: true }}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
            />
            <StatCard 
              title="Total Teachers"
              value={totalTeachers}
              icon={GraduationCap}
              className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
            />
            <StatCard 
              title="Assessments Completed"
              value={completedAssessments}
              icon={BookOpenCheck}
              trend={{ value: 12.5, isPositive: true }}
              className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200"
            />
            <StatCard 
              title="Pending Reports"
              value={pendingReports}
              icon={FileText}
              className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
            />
          </div>
          
          {/* Quick Access Cards */}
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <DashboardCard
              title="Students"
              description="Manage student records, add new students, and view performance data."
              icon={Users}
              linkTo="/students"
              linkText="Manage Students"
              iconClassName="bg-emerald-100"
            />
            <DashboardCard
              title="Assessments"
              description="Create and manage assessments, input marks, and track performance."
              icon={BookOpen}
              linkTo="/assessments"
              linkText="Manage Assessments"
              iconClassName="bg-blue-100"
            />
            <DashboardCard
              title="Report Cards"
              description="Generate student report cards based on assessment results."
              icon={FileText}
              linkTo="/reports"
              linkText="Generate Reports"
              iconClassName="bg-amber-100"
            />
          </div>
          
          {/* Recent Activities */}
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Activities</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-medium">Mid-Term Assessments Created</p>
                    <p className="text-sm text-muted-foreground">Form 3 mid-term assessment has been added</p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-medium">New Students Added</p>
                    <p className="text-sm text-muted-foreground">5 new students have been added to Form 1C</p>
                    <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Award className="h-5 w-5 text-amber-700" />
                  </div>
                  <div>
                    <p className="font-medium">Reports Generated</p>
                    <p className="text-sm text-muted-foreground">End-term reports for Form 4 have been generated</p>
                    <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
