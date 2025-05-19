
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Users, PlusCircle, SlidersHorizontal } from 'lucide-react';
import Navigation from '@/components/Navigation';
import StudentTable from '@/components/StudentTable';
import SearchFilter from '@/components/SearchFilter';
import { Student, generateMockStudents } from '@/types';

const Students = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [newStudent, setNewStudent] = useState({
    first_name: '',
    last_name: '',
    admission_number: '',
    class: '',
    stream: '',
    gender: '',
  });
  
  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const mockStudents = generateMockStudents(25);
    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
    setLoading(false);
  }, []);
  
  const handleDeleteStudent = (studentToDelete: Student) => {
    const updatedStudents = students.filter((student) => student.id !== studentToDelete.id);
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
  };
  
  const handleAddStudent = () => {
    // Validate form
    if (!newStudent.first_name || !newStudent.last_name || !newStudent.admission_number || !newStudent.class || !newStudent.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Create new student object
    const newStudentObj: Student = {
      id: `std-${Date.now()}`,
      admission_number: newStudent.admission_number,
      first_name: newStudent.first_name,
      last_name: newStudent.last_name,
      class: newStudent.class,
      stream: newStudent.stream || 'A',
      gender: newStudent.gender as 'Male' | 'Female',
      joinDate: new Date().toISOString(),
    };
    
    // Add to state
    const updatedStudents = [...students, newStudentObj];
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
    
    // Reset form
    setNewStudent({
      first_name: '',
      last_name: '',
      admission_number: '',
      class: '',
      stream: '',
      gender: '',
    });
    
    toast({
      title: "Student Added",
      description: `${newStudent.first_name} ${newStudent.last_name} has been added successfully.`,
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };
  
  const classOptions = [
    { value: 'Form 1', label: 'Form 1' },
    { value: 'Form 2', label: 'Form 2' },
    { value: 'Form 3', label: 'Form 3' },
    { value: 'Form 4', label: 'Form 4' },
  ];
  
  const streamOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
  ];
  
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-emerald-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Students</h1>
                <p className="text-gray-600">Manage student records</p>
              </div>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Student
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>
                    Enter student details below. Fields marked with * are required.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="first_name">First Name *</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        value={newStudent.first_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="last_name">Last Name *</Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        value={newStudent.last_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="admission_number">Admission Number *</Label>
                    <Input
                      id="admission_number"
                      name="admission_number"
                      value={newStudent.admission_number}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="class">Class *</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange('class', value)}
                        value={newStudent.class}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="stream">Stream</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange('stream', value)}
                        value={newStudent.stream}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select stream" />
                        </SelectTrigger>
                        <SelectContent>
                          {streamOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('gender', value)}
                      value={newStudent.gender}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {genderOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddStudent}>Save Student</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Search and Filters */}
          <Card className="mb-6 p-4">
            <SearchFilter
              placeholder="Search students..."
              data={students}
              searchFields={['first_name', 'last_name', 'admission_number']}
              filterOptions={[
                {
                  field: 'class',
                  options: classOptions,
                },
                {
                  field: 'gender',
                  options: genderOptions,
                },
                {
                  field: 'stream',
                  options: streamOptions,
                },
              ]}
              onFilterChange={setFilteredStudents}
            />
          </Card>
          
          {/* Students Table */}
          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Students</TabsTrigger>
              <TabsTrigger value="form1">Form 1</TabsTrigger>
              <TabsTrigger value="form2">Form 2</TabsTrigger>
              <TabsTrigger value="form3">Form 3</TabsTrigger>
              <TabsTrigger value="form4">Form 4</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <StudentTable students={filteredStudents} onDelete={handleDeleteStudent} />
            </TabsContent>
            <TabsContent value="form1" className="mt-6">
              <StudentTable 
                students={filteredStudents.filter((student) => student.class === 'Form 1')}
                onDelete={handleDeleteStudent}
              />
            </TabsContent>
            <TabsContent value="form2" className="mt-6">
              <StudentTable 
                students={filteredStudents.filter((student) => student.class === 'Form 2')}
                onDelete={handleDeleteStudent}
              />
            </TabsContent>
            <TabsContent value="form3" className="mt-6">
              <StudentTable 
                students={filteredStudents.filter((student) => student.class === 'Form 3')}
                onDelete={handleDeleteStudent}
              />
            </TabsContent>
            <TabsContent value="form4" className="mt-6">
              <StudentTable 
                students={filteredStudents.filter((student) => student.class === 'Form 4')}
                onDelete={handleDeleteStudent}
              />
            </TabsContent>
          </Tabs>
          
          {/* Summary Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Student Summary</h3>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" /> Export Data
              </Button>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-emerald-600 font-medium">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Form 1</p>
                <p className="text-2xl font-bold">
                  {students.filter((s) => s.class === 'Form 1').length}
                </p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-sm text-amber-600 font-medium">Form 2</p>
                <p className="text-2xl font-bold">
                  {students.filter((s) => s.class === 'Form 2').length}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600 font-medium">Form 3 & 4</p>
                <p className="text-2xl font-bold">
                  {students.filter((s) => s.class === 'Form 3' || s.class === 'Form 4').length}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Students;
