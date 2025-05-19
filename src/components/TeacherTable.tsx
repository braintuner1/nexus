
import React, { useState } from 'react';
import { Teacher } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface TeacherTableProps {
  teachers: Teacher[];
  onDelete?: (teacher: Teacher) => void;
}

const TeacherTable = ({ teachers, onDelete }: TeacherTableProps) => {
  const { toast } = useToast();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  
  const handleDelete = (teacher: Teacher) => {
    if (onDelete) {
      onDelete(teacher);
      toast({
        title: "Teacher Deleted",
        description: `${teacher.first_name} ${teacher.last_name} has been removed.`,
      });
    }
  };
  
  return (
    <Card className="overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-medium">Staff ID</TableHead>
            <TableHead className="font-medium">Name</TableHead>
            <TableHead className="font-medium">Subject(s)</TableHead>
            <TableHead className="font-medium">Class</TableHead>
            <TableHead className="font-medium">Email</TableHead>
            <TableHead className="font-medium text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No teachers found
              </TableCell>
            </TableRow>
          ) : (
            teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.staffId}</TableCell>
                <TableCell>{teacher.first_name} {teacher.last_name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjectsTaught.slice(0, 2).map((subject, i) => (
                      <Badge key={i} variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        {subject}
                      </Badge>
                    ))}
                    {teacher.subjectsTaught.length > 2 && (
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        +{teacher.subjectsTaught.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{teacher.classAssigned || '-'}</TableCell>
                <TableCell className="max-w-[180px] truncate">{teacher.email}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedTeacher(teacher)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Teacher Details</DialogTitle>
                      </DialogHeader>
                      {selectedTeacher && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground">Staff ID</h4>
                              <p>{selectedTeacher.staffId}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground">Full Name</h4>
                              <p>{selectedTeacher.first_name} {selectedTeacher.last_name}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground">Gender</h4>
                              <p>{selectedTeacher.gender}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground">Class Assigned</h4>
                              <p>{selectedTeacher.classAssigned || 'None'}</p>
                            </div>
                            <div className="col-span-2">
                              <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                              <p>{selectedTeacher.email}</p>
                            </div>
                            {selectedTeacher.phone && (
                              <div className="col-span-2">
                                <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                                <p>{selectedTeacher.phone}</p>
                              </div>
                            )}
                            <div className="col-span-2">
                              <h4 className="text-sm font-medium text-muted-foreground">Subjects Taught</h4>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {selectedTeacher.subjectsTaught.map((subject, i) => (
                                  <Badge key={i} variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                    {subject}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            {selectedTeacher.joinDate && (
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Join Date</h4>
                                <p>{new Date(selectedTeacher.joinDate).toLocaleDateString()}</p>
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
                        <AlertDialogTitle>Delete Teacher</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {teacher.first_name} {teacher.last_name}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => handleDelete(teacher)}
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

export default TeacherTable;
