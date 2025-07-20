export interface UserResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    username: string;
    gender: string;
    age: number;
    height: number;
    initialWeight: number;
    targetWeight: number;
    currentWeight: number;
    deadline: Date;
    bmi: number;
  } | null;
}
