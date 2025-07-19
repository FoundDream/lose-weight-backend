export interface UserResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    username: string;
    gender: string;
    age: number;
    height: number;
    weight: number;
    targetWeight: number;
    deadline: Date;
  } | null;
}
