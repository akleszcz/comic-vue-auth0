import { UserCategory } from "@/enums";

interface Chapter {
  title: string,
  availableFor: UserCategory
}

export interface RootState {
  chapters: Chapter[];
}