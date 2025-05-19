
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for the charts
const performanceData = [
  { class: 'Form 1', averageScore: 67, passRate: 78 },
  { class: 'Form 2', averageScore: 72, passRate: 82 },
  { class: 'Form 3', averageScore: 65, passRate: 75 },
  { class: 'Form 4', averageScore: 70, passRate: 80 },
];

const subjectPerformanceData = [
  { subject: 'Mathematics', averageScore: 62 },
  { subject: 'English', averageScore: 75 },
  { subject: 'Science', averageScore: 68 },
  { subject: 'Social Studies', averageScore: 71 },
  { subject: 'Kiswahili', averageScore: 73 },
];

const termTrendData = [
  { term: 'Term 1', averageScore: 65 },
  { term: 'Term 2', averageScore: 68 },
  { term: 'Term 3', averageScore: 71 },
];

const Analytics = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-1">View performance metrics and trends</p>
            </div>
          </div>
          
          {/* Analytics Tabs */}
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="performance">Performance Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
              <TabsTrigger value="trends">Performance Trends</TabsTrigger>
            </TabsList>
            
            {/* Performance Overview Tab */}
            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Class Performance Overview</h3>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="class" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="averageScore" name="Average Score" fill="#10b981" />
                        <Bar dataKey="passRate" name="Pass Rate (%)" fill="#60a5fa" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Subject Analysis Tab */}
            <TabsContent value="subjects" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Subject Performance Analysis</h3>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={subjectPerformanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="subject" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="averageScore" name="Average Score" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Performance Trends Tab */}
            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Performance Trends Over Terms</h3>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={termTrendData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="term" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="averageScore" name="Average Score" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Additional Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Top Performing Students</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Student Name</th>
                      <th className="text-left py-2">Class</th>
                      <th className="text-left py-2">Average Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Jane Doe</td>
                      <td className="py-2">Form 4A</td>
                      <td className="py-2">92%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">John Smith</td>
                      <td className="py-2">Form 3B</td>
                      <td className="py-2">89%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Mary Johnson</td>
                      <td className="py-2">Form 4A</td>
                      <td className="py-2">87%</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Attendance Overview</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { class: 'Form 1', attendance: 92 },
                        { class: 'Form 2', attendance: 94 },
                        { class: 'Form 3', attendance: 90 },
                        { class: 'Form 4', attendance: 91 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="class" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="attendance" name="Attendance Rate (%)" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
