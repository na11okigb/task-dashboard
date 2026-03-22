import type { UserId } from "./UserId";

type TaskStatus = "todo" | "in_progress" | "in_review" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "urgent";
type UserRole = "admin" | "member" | "viewer";
type UserStatus = "active" | "inactive";
type ProjectStatus = "active" | "archived";
type ProjectRole = "owner" | "editor" | "viewer";
type NotificationType =
  | "task_assigned"
  | "task_status_changed"
  | "task_commented"
  | "project_member_added"
  | "task_due_soon";

type User = {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

type Project = {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  status: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

type ProjectMember = {
  projectId: string;
  userId: string;
  role: ProjectRole;
  joinedAt: string;
};

type Task = {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  assigneeId: string;
  creatorId: string;
  dueDate: string | null;
  tags: string[] | null;
  position: number;
  version: number;
  createdAt: string;
  updatedAt: string;
};

type Comment = {
  id: string;
  taskId: string;
  authorId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

type Notification = {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  referenceId: string | null;
  referenceType: string | null;
  isRead: boolean;
  createdAt: string;
};

type ApiResponse<T> = {
  data: T;
  status: string;
  message: string | null;
};

type PaginatedResponse<T> = ApiResponse<T> & {
  totalCount: number;
  hasMore: boolean;
};

type Result<T> = {
  success: boolean;
  data: T | undefined;
  error: string | undefined;
};
