
export interface User {
    username: string;
    password:string
  }
  
  export interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
  }

export interface PrivateRouteProps {
    element: React.ReactElement;
  }