/**
 * Task interface representing a single task item
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Task status type for filtering
 */
export type TaskStatus = 'all' | 'active' | 'completed';

/**
 * Task statistics interface
 */
export interface TaskStats {
  total: number;
  active: number;
  completed: number;
}
