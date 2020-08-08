import { UserCategory } from "@/enums";

export interface Chapter {
  title: string;
  availableFor: UserCategory;
}
