
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { GraduationCap, PlusCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import TeacherTable from '@/components/TeacherTable';
import SearchFilter from '@/components/SearchFilter';
import { Teacher, generateMockTeachers } from '@/types';

const Teachers = () => {
  const { toast } = useToast();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [newTeacher, setNewTeacher] = useState({
    first_name: '',
    last_name: '',
    staffId: '',
    email: '',
    gender: '',
    subjectsTaught: [''],
    classAssigned: '',
  });
  
  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const mockTeachers = generateMockTeachers(15);
    setTeachers(mockTeachers);
    setFilteredTeachers(mockTeachers);
    setLoading(false);
  }, []);
  
  const handleDeleteTeacher = (teacherToDelete: Teacher) => {
    const updatedTeachers = teachers.filter((teacher) => teacher.id !== teacherToDelete.id);
    setTeachers(updatedTeachers);
    setFilteredTeachers(updatedTeachers);
  };
  
  const handleAddTeacher = () => {
    // Validate form
    if (!newTeacher.first_name || !newTeacher.last_name || !newTeacher.staffId || !newTeacher.email || !newTeacher.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Create new teacher object
    const newTeacherObj: Teacher = {
      id: `tch-${Date.now()}`,
      staffId: newTeacher.staffId,
      first_name: newTeacher.first_name,
      last_name: newTeacher.last_name,
      gender: newTeacher.gender as 'Male' | 'Female',
      email: newTeacher.email,
      subjectsTaught: newTeacher.subjectsTaught.filter((subject) => subject !== ''),
      classAssigned: newTeacher.classAssigned || undefined,
      joinDate: new Date().toISOString(),
    };
    
    // Add to state
    const updatedTeachers = [...teachers, newTeacherObj];
    setTeachers(updatedTeachers);
    setFilteredTeachers(updatedTeachers);
    
    // Reset form
    setNewTeacher({
      first_name: '',
      last_name: '',
      staffId: '',
      email: '',
      gender: '',
      subjectsTaught: [''],
      classAssigned: '',
    });
    
    toast({
      title: "Teacher Added",
      description: `${newTeacher.first_name} ${newTeacher.last_name} has been added successfully.`,
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTeacher({
      ...newTeacher,
      [name]: value,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setNewTeacher({
      ...newTeacher,
      [name]: value,
    });
  };

  const handleSubjectChange = (index: number, value: string) => {
    const newSubjects = [...newTeacher.subjectsTaught];
    newSubjects[index] = value;
    
    // Add a new empty subject field if this is the last one and it's not empty
    if (index === newSubjects.length - 1 && value !== '') {
      newSubjects.push('');
    }
    
    setNewTeacher({
      ...newTeacher,
      subjectsTaught: newSubjects,
    });
  };
  
  const classOptions = [
    { value: 'Form 1', label: 'Form 1' },
    { value: 'Form 2', label: 'Form 2' },
    { value: 'Form 3', label: 'Form 3' },
    { value: 'Form 4', label: 'Form 4' },
  ];
  
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];
  
  const subjectOptions = [
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'English', label: 'English' },
    { value: 'Kiswahili', label: 'Kiswahili' },
    { value: 'Science', label: 'Science' },
    { value: 'Social Studies', label: 'Social Studies' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Biology', label: 'Biology' },
    { value: 'Geography', label: 'Geography' },
    { value: 'History', label: 'History' },
  ];
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-emerald-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>
                <p className="text-gray-600">Manage teacher records</p>
              </div>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Teacher
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Teacher</DialogTitle>
                  <DialogDescription>
                    Enter teacher details below. Fields marked with * are required.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="first_name">First Name *</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        value={newTeacher.first_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="last_name">Last Name *</Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        value={newTeacher.last_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="staffId">Staff ID *</Label>
                      <Input
                        id="staffId"
                        name="staffId"
                        value={newTeacher.staffId}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange('gender', value)}
                        value={newTeacher.gender}
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
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newTeacher.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label>Subjects Taught *</Label>
                    {newTeacher.subjectsTaught.map((subject, index) => (
                      <Select
                        key={index}
                        onValueChange={(value) => handleSubjectChange(index, value)}
                        value={subject}
                      >
                        <SelectTrigger className="mb-2">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjectOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ))}
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="classAssigned">Class Assigned</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('classAssigned', value)}
                      value={newTeacher.classAssigned}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {classOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddTeacher}>Save Teacher</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Search and Filters */}
          <Card className="mb-6 p-4">
            <SearchFilter
              placeholder="Search teachers..."
              data={teachers}
              searchFields={['first_name', 'last_name', 'staffId', 'email']}
              filterOptions={[
                {
                  field: 'gender',
                  options: genderOptions,
                },
                {
                  field: 'classAssigned',
                  options: [
                    { value: '', label: 'None' },
                    ...classOptions,
                  ],
                },
              ]}
              onFilterChange={setFilteredTeachers}
            />
          </Card>
          
          {/* Teachers Table */}
          <TeacherTable teachers={filteredTeachers} onDelete={handleDeleteTeacher} />
          
          {/* Summary Card */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Teacher Summary</CardTitle>
              <CardDescription>Overview of teaching staff</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-sm text-emerald-600 font-medium">Total Staff</p>
                  <p className="text-2xl font-bold">{teachers.length}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Form Teachers</p>
                  <p className="text-2xl font-bold">
                    {teachers.filter((t) => t.classAssigned).length}
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-amber-600 font-medium">Male</p>
                  <p className="text-2xl font-bold">
                    {teachers.filter((t) => t.gender === 'Male').length}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">Female</p>
                  <p className="text-2xl font-bold">
                    {teachers.filter((t) => t.gender === 'Female').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
