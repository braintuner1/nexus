
export interface Student {
  id: string;
  admission_number: string;
  first_name: string;
  last_name: string;
  class: string;
  stream: string;
  gender: 'Male' | 'Female';
  dateOfBirth?: string;
  parentContact?: string;
  address?: string;
  joinDate?: string;
}

export interface Teacher {
  id: string;
  staffId: string;
  first_name: string;
  last_name: string;
  gender: 'Male' | 'Female';
  email: string;
  phone?: string;
  subjectsTaught: string[];
  classAssigned?: string;
  joinDate?: string;
}

export interface Assessment {
  id: string;
  name: string;
  term: '1' | '2' | '3';
  year: string;
  class: string;
  createdAt: string;
  subjects: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  classes: string[];
}

export interface ClassInfo {
  id: string;
  name: string;
  streams: string[];
}

export interface StudentMark {
  studentId: string;
  admission_number: string;
  studentName: string;
  marks: {
    [subjectId: string]: number;
  };
  totalMarks: number;
  averageMark: number;
  grade: string;
}

export interface ReportCardParams {
  year: string;
  term: string;
  class: string;
  assessment: string;
}

// Mock data factory functions
export const generateMockStudents = (count: number = 10): Student[] => {
  const classes = ['Form 1', 'Form 2', 'Form 3', 'Form 4'];
  const streams = ['A', 'B', 'C', 'D'];
  const genders = ['Male', 'Female'] as const;

  return Array.from({ length: count }, (_, i) => ({
    id: `std-${i + 1}`,
    admission_number: `ADM${1000 + i}`,
    first_name: `Student${i + 1}`,
    last_name: `last_name${i + 1}`,
    class: classes[Math.floor(Math.random() * classes.length)],
    stream: streams[Math.floor(Math.random() * streams.length)],
    gender: genders[Math.floor(Math.random() * genders.length)],
    dateOfBirth: `${2000 + Math.floor(Math.random() * 10)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    parentContact: `+254 7${Math.floor(Math.random() * 10000000)}`,
    joinDate: `${2020 + Math.floor(Math.random() * 5)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
  }));
};

export const generateMockTeachers = (count: number = 5): Teacher[] => {
  const subjects = ['Mathematics', 'English', 'Kiswahili', 'Science', 'Social Studies', 'Physics', 'Chemistry', 'Biology', 'Geography', 'History'];
  const genders = ['Male', 'Female'] as const;

  return Array.from({ length: count }, (_, i) => ({
    id: `tch-${i + 1}`,
    staffId: `TCH${100 + i}`,
    first_name: `Teacher${i + 1}`,
    last_name: `Surname${i + 1}`,
    gender: genders[Math.floor(Math.random() * genders.length)],
    email: `teacher${i + 1}@school.com`,
    phone: `+254 7${Math.floor(Math.random() * 10000000)}`,
    subjectsTaught: Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () => 
      subjects[Math.floor(Math.random() * subjects.length)]
    ),
    classAssigned: Math.random() > 0.5 ? `Form ${Math.floor(Math.random() * 4) + 1}` : undefined,
    joinDate: `${2018 + Math.floor(Math.random() * 5)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
  }));
};

export const generateMockAssessments = (count: number = 3): Assessment[] => {
  const terms = ['1', '2', '3'] as const;
  const classes = ['Form 1', 'Form 2', 'Form 3', 'Form 4'];
  const subjects = ['Mathematics', 'English', 'Kiswahili', 'Science', 'Social Studies', 'Physics', 'Chemistry', 'Biology', 'Geography', 'History'];
  const years = ['2023', '2024', '2025'];
  const assessmentTypes = ['Mid-Term', 'End-Term', 'Mock', 'CAT'];

  return Array.from({ length: count }, (_, i) => ({
    id: `ass-${i + 1}`,
    name: `${assessmentTypes[Math.floor(Math.random() * assessmentTypes.length)]} Exam`,
    term: terms[Math.floor(Math.random() * terms.length)],
    year: years[Math.floor(Math.random() * years.length)],
    class: classes[Math.floor(Math.random() * classes.length)],
    createdAt: new Date().toISOString(),
    subjects: Array.from({ length: 4 + Math.floor(Math.random() * 7) }, () => 
      subjects[Math.floor(Math.random() * subjects.length)]
    ).filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
  }));
};

export const calculateGrade = (marks: number): string => {
  if (marks >= 80) return 'A';
  if (marks >= 75) return 'A-';
  if (marks >= 70) return 'B+';
  if (marks >= 65) return 'B';
  if (marks >= 60) return 'B-';
  if (marks >= 55) return 'C+';
  if (marks >= 50) return 'C';
  if (marks >= 45) return 'C-';
  if (marks >= 40) return 'D+';
  if (marks >= 35) return 'D';
  if (marks >= 30) return 'D-';
  return 'E';
};
