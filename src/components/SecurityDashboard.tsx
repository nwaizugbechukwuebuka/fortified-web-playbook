import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SecurityBadge } from "@/components/ui/security-badge";
import { SecureInput } from "@/components/ui/secure-input";
import { Button } from "@/components/ui/button";
import { BackendIntegrationNotice } from "@/components/BackendIntegrationNotice";
import { 
  Shield, 
  Lock, 
  Users, 
  Activity, 
  Plus, 
  Trash2, 
  Edit3,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Server,
  Database
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "completed";
  createdAt: Date;
}

export const SecurityDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Implement SQL Injection Protection",
      description: "Add parameterized queries to all database interactions",
      priority: "high",
      status: "completed",
      createdAt: new Date("2024-01-15")
    },
    {
      id: "2", 
      title: "Enable CSRF Token Validation",
      description: "Implement CSRF tokens on all forms and state-changing operations",
      priority: "high",
      status: "pending",
      createdAt: new Date("2024-01-16")
    },
    {
      id: "3",
      title: "Add Input Sanitization",
      description: "Implement comprehensive input validation and sanitization",
      priority: "medium",
      status: "pending",
      createdAt: new Date("2024-01-16")
    }
  ]);

  const [newTask, setNewTask] = useState<{ title: string; description: string; priority: "low" | "medium" | "high" }>({ 
    title: "", 
    description: "", 
    priority: "medium" 
  });
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const addTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        status: "pending",
        createdAt: new Date()
      };
      setTasks([task, ...tasks]);
      setNewTask({ title: "", description: "", priority: "medium" });
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === "pending" ? "completed" : "pending" }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => 
    filter === "all" ? true : task.status === filter
  );

  const securityStats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === "completed").length,
    highPriorityTasks: tasks.filter(t => t.priority === "high" && t.status === "pending").length,
    securityScore: Math.round((tasks.filter(t => t.status === "completed").length / Math.max(tasks.length, 1)) * 100)
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Secure Task Manager</h1>
              <p className="text-muted-foreground">OWASP Security Implementation Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SecurityBadge variant="secure">
              Security Score: {securityStats.securityScore}%
            </SecurityBadge>
          </div>
        </div>

        {/* Backend Integration Notice */}
        <BackendIntegrationNotice />

        {/* Security Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 elevation">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">{securityStats.totalTasks}</p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-6 elevation">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-secure">{securityStats.completedTasks}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-secure" />
            </div>
          </Card>
          
          <Card className="p-6 elevation">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-warning">{securityStats.highPriorityTasks}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </Card>
          
          <Card className="p-6 elevation">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Security Score</p>
                <p className="text-2xl font-bold text-primary">{securityStats.securityScore}%</p>
              </div>
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </Card>
        </div>

        {/* Add New Task Section */}
        <Card className="p-6 elevation">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Plus className="h-5 w-5" />
            Add Security Task
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <SecureInput
              label="Task Title"
              placeholder="e.g., Implement XSS Protection"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              success={newTask.title.length > 0}
            />
            <SecureInput
              label="Description"
              placeholder="Detailed task description..."
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <select
              className="rounded-md border border-input bg-background px-3 py-2 text-sm security-transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as "low" | "medium" | "high" })}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <Button onClick={addTask} variant="secure" disabled={!newTask.title.trim()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </Card>

        {/* Task Filters */}
        <div className="flex gap-2">
          {(["all", "pending", "completed"] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "default" : "outline"}
              onClick={() => setFilter(filterType)}
              className="capitalize"
            >
              {filterType} ({filterType === "all" ? tasks.length : tasks.filter(t => t.status === filterType).length})
            </Button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="p-6 elevation security-transition hover:primary-glow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-semibold ${task.status === "completed" ? "text-muted-foreground line-through" : ""}`}>
                      {task.title}
                    </h3>
                    <SecurityBadge 
                      variant={task.priority === "high" ? "danger" : task.priority === "medium" ? "warning" : "info"}
                    >
                      {task.priority}
                    </SecurityBadge>
                    {task.status === "completed" && (
                      <SecurityBadge variant="secure">Completed</SecurityBadge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-2">{task.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Created: {task.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleTask(task.id)}
                    className="text-secure hover:bg-secure/10"
                  >
                    {task.status === "completed" ? <Eye className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="text-danger hover:bg-danger/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Security Status Footer */}
        <Card className="p-6 elevation">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-secure" />
                <span className="text-sm font-medium">HTTPS Enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-secure" />
                <span className="text-sm font-medium">Secure Headers</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-secure" />
                <span className="text-sm font-medium">Encrypted Storage</span>
              </div>
            </div>
            <SecurityBadge variant="secure">
              System Secure
            </SecurityBadge>
          </div>
        </Card>
      </div>
    </div>
  );
};