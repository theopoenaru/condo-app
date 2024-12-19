import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
  AlertCircle,
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  History,
  MessageSquare,
  Paperclip,
  Tag,
  Users,
} from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from '@/lib/utils';

interface TaskDetailsViewProps {
  taskId: string;
}

export function TaskDetailsView({ taskId }: TaskDetailsViewProps) {
  const navigate = useNavigate();
  const task = useSelector((state: RootState) => 
    state.inbox.tasks.find(t => t.id === parseInt(taskId))
  );

  if (!task) {
    return null;
  }

  const updates = [
    {
      id: 2,
      type: 'status',
      content: 'Mike Wilson is on the way - ETA 15 minutes',
      author: {
        name: 'System',
        role: 'Update',
      },
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      type: 'comment',
      content: 'Investigated the leak. Coming from a pipe connection in Unit 1304. Will need to coordinate access to both units.',
      author: {
        name: 'Mike Wilson',
        role: 'Maintenance',
      },
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    },
    {
      id: 4,
      type: 'comment',
      content: 'Will be home all day tomorrow if needed.',
      author: {
        name: task.sender.name,
        role: 'Resident',
      },
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/inbox')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">TASK-{task.id}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="border-2">
                Due in 24h
              </Badge>
              <Button variant="outline" size="sm">
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Main Thread */}
          <div className="col-span-2">
            <Card>
              <CardContent className="p-6">
                {/* Task Header */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="mt-1">
                      <AvatarFallback className="bg-amber-100 text-amber-600">
                        {task.sender.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">
                        {task.title}
                      </h2>
                      <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                        <span>{task.sender.name}</span>
                        <span>•</span>
                        <span>Unit {task.sender.unit}</span>
                        <span>•</span>
                        <time>{task.time}</time>
                      </div>
                    </div>
                    <Badge 
                      variant={task.priority === 'high' ? 'destructive' : 'secondary'}
                      className="uppercase"
                    >
                      {task.priority} Priority
                    </Badge>
                  </div>

                  {/* Smart Context */}
                  <Card className="bg-blue-50 border-blue-100">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-4 text-sm text-blue-700">
                        <AlertCircle className="h-4 w-4" />
                        <span>
                          <strong>Similar Issue:</strong> 2 {task.type.toLowerCase()} issues reported in the last month
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <p className="text-muted-foreground">
                    {task.description}
                  </p>

                  {/* Key Stats */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center p-3 bg-muted rounded-lg">
                      <Users className="h-4 w-4 text-muted-foreground mr-2" />
                      <div>
                        <div className="text-muted-foreground">Affected</div>
                        <div className="font-medium">2 Units</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-muted rounded-lg">
                      <Building2 className="h-4 w-4 text-muted-foreground mr-2" />
                      <div>
                        <div className="text-muted-foreground">Location</div>
                        <div className="font-medium">Unit {task.sender.unit}</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-muted rounded-lg">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <div>
                        <div className="text-muted-foreground">Due Date</div>
                        <div className="font-medium">{task.dueDate || 'Not set'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Updates Feed */}
                <div className="space-y-6">
                  {updates.map((update) => (
                    <div key={update.id} className="flex space-x-4">
                      <Avatar className="mt-1">
                        <AvatarFallback>
                          {update.author.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">
                              {update.author.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {update.author.role}
                            </span>
                          </div>
                          <time className="text-sm text-muted-foreground">
                            {new Date(update.timestamp).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </time>
                        </div>
                        {update.type === 'status' ? (
                          <div className="flex items-center space-x-2 text-sm bg-green-50 text-green-700 p-2 rounded">
                            <CheckCircle2 className="h-4 w-4" />
                            <p>{update.content}</p>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">{update.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Area */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex space-x-3">
                    <Avatar>
                      <AvatarFallback>PM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <textarea 
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                        placeholder="Add a comment..."
                        rows={1}
                      />
                      <div className="mt-2 flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          <Paperclip className="h-4 w-4 mr-2" />
                          Attach
                        </Button>
                        <Button size="sm">Send</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Context Sidebar */}
          <div className="col-span-1">
            <div className="space-y-4">
              {/* Status Progression */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4">Status</h3>
                  <div className="relative space-y-6">
                    <div className="absolute left-4 top-1 bottom-2 w-0.5 bg-muted" />
                    
                    {/* Reported */}
                    <div className="relative flex items-start">
                      <div className={cn(
                        "absolute left-0 w-8 h-8 rounded-full flex items-center justify-center",
                        task.status === 'pending' ? "bg-primary" : "bg-muted"
                      )}>
                        <CheckCircle2 className={cn(
                          "h-4 w-4",
                          task.status === 'pending' ? "text-primary-foreground" : "text-muted-foreground"
                        )} />
                      </div>
                      <div className="ml-12">
                        <div className="text-sm font-medium">Reported</div>
                        <div className="text-xs text-muted-foreground">{task.time}</div>
                      </div>
                    </div>

                    {/* In Progress */}
                    <div className="relative flex items-start">
                      <div className={cn(
                        "absolute left-0 w-8 h-8 rounded-full flex items-center justify-center",
                        task.status === 'in_progress' ? "bg-primary ring-4 ring-primary/10" : "bg-muted"
                      )}>
                        <Clock className={cn(
                          "h-4 w-4",
                          task.status === 'in_progress' ? "text-primary-foreground" : "text-muted-foreground"
                        )} />
                      </div>
                      <div className="ml-12">
                        <div className="text-sm font-medium">In Progress</div>
                        <div className="text-xs text-muted-foreground">
                          {task.status === 'in_progress' ? 'Currently working' : 'Pending'}
                        </div>
                      </div>
                    </div>

                    {/* Completed */}
                    <div className="relative flex items-start">
                      <div className={cn(
                        "absolute left-0 w-8 h-8 rounded-full flex items-center justify-center",
                        task.status === 'completed' ? "bg-primary" : "bg-muted"
                      )}>
                        <CheckCircle2 className={cn(
                          "h-4 w-4",
                          task.status === 'completed' ? "text-primary-foreground" : "text-muted-foreground"
                        )} />
                      </div>
                      <div className="ml-12">
                        <div className="text-sm font-medium">Completed</div>
                        <div className="text-xs text-muted-foreground">Pending verification</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Issues */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <h3 className="font-medium">Similar Issues</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded-lg text-sm">
                      <div className="font-medium">Unit 1304 - Water Leak</div>
                      <div className="text-muted-foreground mt-1">Resolved 3 months ago</div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-sm">
                      <div className="font-medium">Unit 1304 - Pipe Maintenance</div>
                      <div className="text-muted-foreground mt-1">Resolved 6 months ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}