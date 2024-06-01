// src/types.ts
export interface Bike {
  id: number;
  title: string;
  description: string;
  date_stolen: number;
  date_reported: number;
  stolen_location: string;
  thumb?: string;
}
