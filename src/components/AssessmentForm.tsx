
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Assessment } from '@/types';

interface AssessmentFormProps {
  onSubmit: (data: Partial<Assessment>) => void;
}

const subjects = [
  { id: 'math', label: 'Mathematics' },
  { id: 'eng', label: 'English' },
  { id: 'kisw', label: 'Kiswahili' },
  { id: 'sci', label: 'Science' },
  { id: 'ss', label: 'Social Studies' },
  { id: 'phy', label: 'Physics' },
  { id: 'chem', label: 'Chemistry' },
  { id: 'bio', label: 'Biology' },
  { id: 'geo', label: 'Geography' },
  { id: 'hist', label: 'History' },
];

const formSchema = z.object({
  name: z.string().min(2, { message: 'Assessment name is required' }),
  term: z.enum(['1', '2', '3']),
  year: z.string().min(4, { message: 'Year is required' }),
  class: z.string().min(1, { message: 'Class is required' }),
  subjects: z.array(z.string()).min(1, { message: 'Select at least one subject' }),
});

const AssessmentForm = ({ onSubmit }: AssessmentFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      term: '1',
      year: new Date().getFullYear().toString(),
      class: '',
      subjects: [],
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would connect to your backend
      // For now, we'll simulate a successful submission
      onSubmit({
        ...values,
        id: `ass-${Date.now()}`,
        createdAt: new Date().toISOString(),
      });
      
      toast({
        title: "Assessment Created",
        description: "Your assessment has been created successfully.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating the assessment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Assessment</CardTitle>
        <CardDescription>
          Add a new assessment for students. This will create a new assessment table in the database.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assessment Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Mid-Term Exam" {...field} />
                    </FormControl>
                    <FormDescription>
                      Name of the assessment or exam
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Term</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select term" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Term 1</SelectItem>
                        <SelectItem value="2">Term 2</SelectItem>
                        <SelectItem value="3">Term 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Form 1">Form 1</SelectItem>
                        <SelectItem value="Form 2">Form 2</SelectItem>
                        <SelectItem value="Form 3">Form 3</SelectItem>
                        <SelectItem value="Form 4">Form 4</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="subjects"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Subjects</FormLabel>
                    <FormDescription>
                      Select the subjects included in this assessment
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {subjects.map((subject) => (
                      <FormField
                        key={subject.id}
                        control={form.control}
                        name="subjects"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={subject.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(subject.label)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, subject.label])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== subject.label
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {subject.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <CardFooter className="px-0 pt-6">
              <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Assessment"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AssessmentForm;
