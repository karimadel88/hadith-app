
interface MockUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

// Initial mock users list with default user
let mockUsers: MockUser[] = [
  {
    id: "1",
    email: "karim@gamil.com",
    name: "كريم",
    password: "123123123"
  }
];

export const mockLogin = (email: string, password: string): MockUser | null => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  return null;
};

export const mockRegister = (email: string, password: string, name: string): MockUser | null => {
  const exists = mockUsers.find(u => u.email === email);
  if (exists) return null;

  const newUser: MockUser = {
    id: (mockUsers.length + 1).toString(),
    email,
    password,
    name
  };
  
  mockUsers.push(newUser);
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  return newUser;
};

export const mockLogout = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = (): MockUser | null => {
  const stored = localStorage.getItem('currentUser');
  return stored ? JSON.parse(stored) : null;
};
