
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FileText, PrinterIcon, DownloadIcon, Share2Icon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';
import { ReportCardParams, Assessment, Student, StudentMark, generateMockStudents, generateMockAssessments, calculateGrade } from '@/types';

const Reports = () => {
  const { toast } = useToast();
  const [reportParams, setReportParams] = useState<ReportCardParams>({
    year: new Date().getFullYear().toString(),
    term: '1',
    class: '',
    assessment: '',
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [generatedReport, setGeneratedReport] = useState<StudentMark | null>(null);
  
  // Mock data
  const students = generateMockStudents(15);
  const assessments = generateMockAssessments(6);
  
  const handleParamsChange = (field: keyof ReportCardParams, value: string) => {
    setReportParams((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // Reset assessment if class changes
    if (field === 'class') {
      setReportParams((prev) => ({
        ...prev,
        assessment: '',
      }));
    }
    
    // Reset selected student
    setSelectedStudentId('');
    setGeneratedReport(null);
  };
  
  const handleGenerateReport = () => {
    if (!reportParams.year || !reportParams.term || !reportParams.class || !reportParams.assessment || !selectedStudentId) {
      toast({
        title: "Missing Information",
        description: "Please select all required fields to generate a report.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const student = students.find((s) => s.id === selectedStudentId);
      
      if (!student) {
        toast({
          title: "Error",
          description: "Student not found.",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }
      
      const assessment = assessments.find(
        (a) => a.id === reportParams.assessment && a.class === reportParams.class
      );
      
      if (!assessment) {
        toast({
          title: "Error",
          description: "Assessment not found.",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }
      
      // Generate random marks for each subject
      const subjectMarks: Record<string, number> = {};
      let totalMarks = 0;
      
      assessment.subjects.forEach((subject) => {
        // Generate a random mark between 35 and 95
        const mark = Math.floor(Math.random() * 61) + 35;
        subjectMarks[subject] = mark;
        totalMarks += mark;
      });
      
      const averageMark = Math.round(totalMarks / assessment.subjects.length);
      const grade = calculateGrade(averageMark);
      
      const reportData: StudentMark = {
        studentId: student.id,
        admission_number: student.admission_number,
        studentName: `${student.first_name} ${student.last_name}`,
        marks: subjectMarks,
        totalMarks,
        averageMark,
        grade,
      };
      
      setGeneratedReport(reportData);
      setIsGenerating(false);
      
      toast({
        title: "Report Generated",
        description: `Report card for ${student.first_name} ${student.last_name} has been generated.`,
      });
    }, 1500);
  };
  
  // Filter students by selected class
  const filteredStudents = students.filter((student) => student.class === reportParams.class);
  
  // Filter assessments by selected class
  const filteredAssessments = assessments.filter(
    (assessment) => assessment.class === reportParams.class && assessment.term === reportParams.term
  );
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-emerald-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Report Cards</h1>
              <p className="text-gray-600">Generate and manage student report cards</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Report Parameters Panel */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Report Parameters</CardTitle>
                <CardDescription>
                  Select the criteria to generate a student report card
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Academic Year</Label>
                  <Select
                    value={reportParams.year}
                    onValueChange={(value) => handleParamsChange('year', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="term">Term</Label>
                  <Select
                    value={reportParams.term}
                    onValueChange={(value) => handleParamsChange('term', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Term 1</SelectItem>
                      <SelectItem value="2">Term 2</SelectItem>
                      <SelectItem value="3">Term 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select
                    value={reportParams.class}
                    onValueChange={(value) => handleParamsChange('class', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Form 1">Form 1</SelectItem>
                      <SelectItem value="Form 2">Form 2</SelectItem>
                      <SelectItem value="Form 3">Form 3</SelectItem>
                      <SelectItem value="Form 4">Form 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assessment">Assessment</Label>
                  <Select
                    value={reportParams.assessment}
                    onValueChange={(value) => handleParamsChange('assessment', value)}
                    disabled={!reportParams.class}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={reportParams.class ? "Select assessment" : "Select class first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredAssessments.length > 0 ? (
                        filteredAssessments.map((assessment) => (
                          <SelectItem key={assessment.id} value={assessment.id}>
                            {assessment.name} ({assessment.year})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" disabled>
                          No assessments available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="student">Student</Label>
                  <Select
                    value={selectedStudentId}
                    onValueChange={setSelectedStudentId}
                    disabled={!reportParams.class}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={reportParams.class ? "Select student" : "Select class first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.first_name} {student.last_name} ({student.admission_number})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" disabled>
                          No students available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleGenerateReport}
                  disabled={isGenerating || !reportParams.assessment || !selectedStudentId}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  {isGenerating ? "Generating..." : "Generate Report"}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Report Card Preview */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Report Card Preview</CardTitle>
                <CardDescription>
                  {generatedReport ? "Student report card ready for printing or download" : "Select parameters and generate a report to preview"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedReport ? (
                  <div className="bg-white border-2 border-emerald-100 rounded-lg p-6 print:border-0 print:shadow-none">
                    {/* Report Header */}
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-emerald-800">Emerald School</h2>
                      <p className="text-emerald-700 font-medium">Student Academic Report</p>
                      <div className="mt-2 text-sm">
                        <p>Academic Year: {reportParams.year}, Term {reportParams.term}</p>
                        <p>
                          Assessment: {filteredAssessments.find(a => a.id === reportParams.assessment)?.name}
                        </p>
                      </div>
                    </div>
                    
                    {/* Student Info */}
                    <div className="bg-emerald-50 rounded-md p-4 mb-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Student Name</p>
                          <p className="font-bold">{generatedReport.studentName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Admission Number</p>
                          <p>{generatedReport.admission_number}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Class</p>
                          <p>{reportParams.class}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Stream</p>
                          <p>{students.find(s => s.id === selectedStudentId)?.stream}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Subject Marks */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Subject Performance</h3>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-emerald-100">
                            <th className="p-2 border border-emerald-200 text-left">Subject</th>
                            <th className="p-2 border border-emerald-200 text-center">Marks</th>
                            <th className="p-2 border border-emerald-200 text-center">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(generatedReport.marks).map(([subject, mark]) => (
                            <tr key={subject} className="border-b border-gray-100">
                              <td className="p-2 border border-emerald-200">{subject}</td>
                              <td className="p-2 border border-emerald-200 text-center">{mark}</td>
                              <td className="p-2 border border-emerald-200 text-center">{calculateGrade(mark)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Overall Performance */}
                    <div className="bg-emerald-50 rounded-md p-4 mb-6">
                      <h3 className="font-medium mb-3">Overall Performance</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Total Marks</p>
                          <p className="text-xl font-bold">{generatedReport.totalMarks}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Average Mark</p>
                          <p className="text-xl font-bold">{generatedReport.averageMark}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Grade</p>
                          <p className="text-xl font-bold">{generatedReport.grade}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Comments and Signature */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Teacher's Comment</h3>
                      <p className="border p-3 rounded min-h-[60px] italic text-gray-600">
                        {generatedReport.averageMark >= 80
                          ? "Excellent performance! Keep up the good work."
                          : generatedReport.averageMark >= 60
                          ? "Good effort. Continue working hard to improve."
                          : "Needs to put in more effort to improve performance."}
                      </p>
                    </div>
                    
                    <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-500 flex justify-between">
                      <div>Date: {new Date().toLocaleDateString()}</div>
                      <div>Principal's Signature: _______________</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-12 text-center">
                    <FileText className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-1">No Report Generated</h3>
                    <p className="text-gray-500 mb-4">
                      Select the report parameters and generate a report to view the preview
                    </p>
                  </div>
                )}
              </CardContent>
              {generatedReport && (
                <CardFooter className="flex gap-3 justify-end">
                  <Button variant="outline" size="sm">
                    <Share2Icon className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    <PrinterIcon className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
