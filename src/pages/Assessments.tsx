
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Plus, Filter, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';
import AssessmentForm from '@/components/AssessmentForm';
import { Assessment, generateMockAssessments } from '@/types';

const Assessments = () => {
  const { toast } = useToast();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'list' | 'new'>('list');
  
  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const mockAssessments = generateMockAssessments(6);
    setAssessments(mockAssessments);
    setLoading(false);
  }, []);

  const handleAddAssessment = (newAssessment: Partial<Assessment>) => {
    setAssessments((prev) => [
      {
        ...newAssessment,
        id: newAssessment.id || `ass-${Date.now()}`,
        createdAt: newAssessment.createdAt || new Date().toISOString(),
      } as Assessment,
      ...prev,
    ]);
    setActiveView('list');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-emerald-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Assessments</h1>
                <p className="text-gray-600">Create and manage student assessments</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0">
              {activeView === 'list' ? (
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setActiveView('new')}>
                  <Plus className="mr-2 h-4 w-4" /> New Assessment
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setActiveView('list')}>
                  Back to List
                </Button>
              )}
            </div>
          </div>
          
          {activeView === 'new' ? (
            <AssessmentForm onSubmit={handleAddAssessment} />
          ) : (
            <>
              {/* Filters and Actions */}
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Assessments</CardTitle>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                  </div>
                  <CardDescription>
                    Create and manage assessments for different classes and terms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="recent">Recent</TabsTrigger>
                      <TabsTrigger value="term1">Term 1</TabsTrigger>
                      <TabsTrigger value="term2">Term 2</TabsTrigger>
                      <TabsTrigger value="term3">Term 3</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="mt-4">
                      <div className="grid gap-6">
                        {assessments.length === 0 ? (
                          <div className="text-center py-10 bg-gray-50 rounded-lg">
                            <p className="text-muted-foreground">No assessments found</p>
                            <Button 
                              variant="outline" 
                              className="mt-4"
                              onClick={() => setActiveView('new')}
                            >
                              <Plus className="mr-2 h-4 w-4" /> Create Your First Assessment
                            </Button>
                          </div>
                        ) : (
                          assessments.map((assessment) => (
                            <Card key={assessment.id} className="overflow-hidden">
                              <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row md:items-center">
                                  <div className="p-6 md:flex-grow">
                                    <div className="flex items-center gap-4 mb-2">
                                      <h3 className="text-lg font-semibold">{assessment.name}</h3>
                                      <div className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        Term {assessment.term}
                                      </div>
                                      <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {assessment.year}
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      Class: {assessment.class}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {assessment.subjects.slice(0, 3).map((subject, i) => (
                                        <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                          {subject}
                                        </span>
                                      ))}
                                      {assessment.subjects.length > 3 && (
                                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                          +{assessment.subjects.length - 3} more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="border-t md:border-t-0 md:border-l border-border p-4 md:p-6 flex flex-row md:flex-col gap-3 justify-between">
                                    <div className="text-sm text-muted-foreground">
                                      Created {new Date(assessment.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex gap-2">
                                      <Button size="sm">View Details</Button>
                                      <Button size="sm" variant="outline">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="recent" className="mt-4">
                      <div className="grid gap-6">
                        {assessments.slice(0, 3).map((assessment) => (
                          <Card key={assessment.id} className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="flex flex-col md:flex-row md:items-center">
                                <div className="p-6 md:flex-grow">
                                  <div className="flex items-center gap-4 mb-2">
                                    <h3 className="text-lg font-semibold">{assessment.name}</h3>
                                    <div className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                      Term {assessment.term}
                                    </div>
                                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                      {assessment.year}
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Class: {assessment.class}
                                  </p>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {assessment.subjects.slice(0, 3).map((subject, i) => (
                                      <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                        {subject}
                                      </span>
                                    ))}
                                    {assessment.subjects.length > 3 && (
                                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                        +{assessment.subjects.length - 3} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="border-t md:border-t-0 md:border-l border-border p-4 md:p-6 flex flex-row md:flex-col gap-3 justify-between">
                                  <div className="text-sm text-muted-foreground">
                                    Created {new Date(assessment.createdAt).toLocaleDateString()}
                                  </div>
                                  <div className="flex gap-2">
                                    <Button size="sm">View Details</Button>
                                    <Button size="sm" variant="outline">
                                      <Download className="h-4 w-4 mr-2" />
                                      Export
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="term1" className="mt-4">
                      <div className="grid gap-6">
                        {assessments
                          .filter((ass) => ass.term === '1')
                          .map((assessment) => (
                            <Card key={assessment.id} className="overflow-hidden">
                              <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row md:items-center">
                                  <div className="p-6 md:flex-grow">
                                    <div className="flex items-center gap-4 mb-2">
                                      <h3 className="text-lg font-semibold">{assessment.name}</h3>
                                      <div className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        Term {assessment.term}
                                      </div>
                                      <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {assessment.year}
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      Class: {assessment.class}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {assessment.subjects.slice(0, 3).map((subject, i) => (
                                        <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                          {subject}
                                        </span>
                                      ))}
                                      {assessment.subjects.length > 3 && (
                                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                          +{assessment.subjects.length - 3} more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="border-t md:border-t-0 md:border-l border-border p-4 md:p-6 flex flex-row md:flex-col gap-3 justify-between">
                                    <div className="text-sm text-muted-foreground">
                                      Created {new Date(assessment.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex gap-2">
                                      <Button size="sm">View Details</Button>
                                      <Button size="sm" variant="outline">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        {assessments.filter((ass) => ass.term === '1').length === 0 && (
                          <div className="text-center py-10 bg-gray-50 rounded-lg">
                            <p className="text-muted-foreground">No Term 1 assessments found</p>
                            <Button 
                              variant="outline" 
                              className="mt-4"
                              onClick={() => setActiveView('new')}
                            >
                              <Plus className="mr-2 h-4 w-4" /> Create Assessment
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="term2" className="mt-4">
                      <div className="grid gap-6">
                        {assessments
                          .filter((ass) => ass.term === '2')
                          .map((assessment) => (
                            <Card key={assessment.id} className="overflow-hidden">
                              <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row md:items-center">
                                  <div className="p-6 md:flex-grow">
                                    <div className="flex items-center gap-4 mb-2">
                                      <h3 className="text-lg font-semibold">{assessment.name}</h3>
                                      <div className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        Term {assessment.term}
                                      </div>
                                      <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {assessment.year}
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      Class: {assessment.class}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {assessment.subjects.slice(0, 3).map((subject, i) => (
                                        <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                          {subject}
                                        </span>
                                      ))}
                                      {assessment.subjects.length > 3 && (
                                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                          +{assessment.subjects.length - 3} more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="border-t md:border-t-0 md:border-l border-border p-4 md:p-6 flex flex-row md:flex-col gap-3 justify-between">
                                    <div className="text-sm text-muted-foreground">
                                      Created {new Date(assessment.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex gap-2">
                                      <Button size="sm">View Details</Button>
                                      <Button size="sm" variant="outline">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        {assessments.filter((ass) => ass.term === '2').length === 0 && (
                          <div className="text-center py-10 bg-gray-50 rounded-lg">
                            <p className="text-muted-foreground">No Term 2 assessments found</p>
                            <Button 
                              variant="outline" 
                              className="mt-4"
                              onClick={() => setActiveView('new')}
                            >
                              <Plus className="mr-2 h-4 w-4" /> Create Assessment
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="term3" className="mt-4">
                      <div className="grid gap-6">
                        {assessments
                          .filter((ass) => ass.term === '3')
                          .map((assessment) => (
                            <Card key={assessment.id} className="overflow-hidden">
                              <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row md:items-center">
                                  <div className="p-6 md:flex-grow">
                                    <div className="flex items-center gap-4 mb-2">
                                      <h3 className="text-lg font-semibold">{assessment.name}</h3>
                                      <div className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        Term {assessment.term}
                                      </div>
                                      <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {assessment.year}
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      Class: {assessment.class}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {assessment.subjects.slice(0, 3).map((subject, i) => (
                                        <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                          {subject}
                                        </span>
                                      ))}
                                      {assessment.subjects.length > 3 && (
                                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                          +{assessment.subjects.length - 3} more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="border-t md:border-t-0 md:border-l border-border p-4 md:p-6 flex flex-row md:flex-col gap-3 justify-between">
                                    <div className="text-sm text-muted-foreground">
                                      Created {new Date(assessment.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex gap-2">
                                      <Button size="sm">View Details</Button>
                                      <Button size="sm" variant="outline">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        {assessments.filter((ass) => ass.term === '3').length === 0 && (
                          <div className="text-center py-10 bg-gray-50 rounded-lg">
                            <p className="text-muted-foreground">No Term 3 assessments found</p>
                            <Button 
                              variant="outline" 
                              className="mt-4"
                              onClick={() => setActiveView('new')}
                            >
                              <Plus className="mr-2 h-4 w-4" /> Create Assessment
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessments;
