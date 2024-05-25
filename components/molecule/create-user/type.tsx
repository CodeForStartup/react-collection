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

export type UserForm = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  gender: GenderEnum;
  // profileImage?: File;
  // bio?: string;
  // country: Countries;
  // overtime?: boolean;
  experiences: Array<{
    position: string;
    company: string;
    from?: Date;
    to?: Date;
    is_working?: boolean;
  }>;
  // skills: Array<string>;
  // projects: Array<{
  //   title: string;
  //   description: string;
  //   url?: string;
  // }>;
};
