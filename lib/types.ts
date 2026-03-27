export interface Author {
  name: string;
  portrait: string;
  bio: string;
}

export interface StudentInfo {
  name: string;
  className: string;
  school: string;
  greeting: string;
}

export interface Resource {
  label: string;
  url: string;
  type: "drive" | "video" | "document" | "book" | "doc" | "diary" | "padlet" | "other";
}

export interface BookReview {
  title: string;
  precontent: string;
  content: string;
}

export interface DiaryImage {
  url: string;
  caption: string;
}

export interface Book {
  id: string;
  title: string;
  coverImage: string;
  summary: string;
  author: Author;
  student: StudentInfo;
  videoUrl: string;
  review: BookReview;
  diary: DiaryImage[];
  resources: Resource[];
  genre: string;
  publishYear: number;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  className: string;
  school: string;
  hobbies: string;
  achievements: string;
}

export interface AboutImage {
  url: string;
  caption: string;
}

export interface AboutData {
  title: string;
  description: string;
  mission: string;
  team: TeamMember[];
  images: AboutImage[];
}
