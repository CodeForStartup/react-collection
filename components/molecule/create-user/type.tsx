export enum GenderEnum {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export enum Countries {
  US = "United States",
  CA = "Canada",
  UK = "United Kingdom",
  AU = "Australia",
  DE = "Germany",
  FR = "France",
  JP = "Japan",
  CN = "China",
  KR = "South Korea",
  IN = "India",
  BR = "Brazil",
  MX = "Mexico",
  RU = "Russia",
  ZA = "South Africa",
  NG = "Nigeria",
  EG = "Egypt",
  KE = "Kenya",
  SA = "Saudi Arabia",
  AE = "United Arab",
  VI = "Vietnam",
}

export enum Skill {
  Frontend = "Frontend",
  Backend = "Backend",
  Fullstack = "Fullstack",
  DevOps = "DevOps",
  DataScience = "Data Science",
  MachineLearning = "Machine Learning",
  Mobile = "Mobile",
  Game = "Game",
}

export enum WorkingType {
  FullTime = "full_time",
  PartTime = "part_time",
  Freelancer = "freelancer",
}

export type UserForm = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  gender: GenderEnum;
  url?: string;
  phone?: string;
  skills?: Array<Skill>;
  working_types?: WorkingType; // "full_time" | "part_time" | "freelancer";

  experiences: Array<{
    position: string;
    company: string;
    from?: Date;
    to?: Date;
    is_working?: boolean;
  }>;
};
