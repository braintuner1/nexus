
import React, { useState } from 'react';
import { Student } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card } from '@/components/ui/card';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface StudentTableProps {
  students: Student[];
  onDelete?: (student: Student) => void;
}

const StudentTable = ({ students, onDelete }: StudentTableProps) => {
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  const handleDelete = (student: Student) => {
    if (onDelete) {
      onDelete(student);
      toast({
        title: "Student Deleted",
        description: `${student.first_name} ${student.last_name} has been removed.`,
      });
    }
  };
  
  return (
    <Card className="overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-medium">Adm No.</TableHead>
            <TableHead className="font-medium">Name</TableHead>
            <TableHead className="font-medium">Class</TableHead>
            <TableHead className="font-medium">Stream</TableHead>
            <TableHead className="font-medium">Gender</TableHead>
            <TableHead className="font-medium text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No students found
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.admission_number}</TableCell>
                <TableCell>{student.first_name} {student.last_name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.stream}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Student Details</DialogTitle>
                      </DialogHeader>
                      {selectedStudent && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground">Admission Number</h4>
                              <p>{selectedStudent.admission_number}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground">Full Name</h4>
                              <p>{selectedStudent.first_name} {selectedStudent.last_name}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground">Class</h4>
                              <p>{selectedStudent.class} {selectedStudent.stream}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground">Gender</h4>
                              <p>{selectedStudent.gender}</p>
                            </div>
                            {selectedStudent.dateOfBirth && (
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Date of Birth</h4>
                                <p>{new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</p>
                              </div>
                            )}
                            {selectedStudent.joinDate && (
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Join Date</h4>
                                <p>{new Date(selectedStudent.joinDate).toLocaleDateString()}</p>
                              </div>
                            )}
                            {selectedStudent.parentContact && (
                              <div className="col-span-2">
                                <h4 className="text-sm font-medium text-muted-foreground">Parent Contact</h4>
                                <p>{selectedStudent.parentContact}</p>
                              </div>
                            )}
                            {selectedStudent.address && (
                              <div className="col-span-2">
                                <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                                <p>{selectedStudent.address}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Student</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {student.first_name} {student.last_name}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => handleDelete(student)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default StudentTable;
