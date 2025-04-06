export interface Agent {
    id: string;
    name: string;
    status: 'online' | 'offline' | 'busy';
    tasks: string[];
  }
  
  export interface Task {
    id: string;
    title: string;
    status: 'todo' | 'in-progress' | 'done';
    assignedTo: string;
  }
  