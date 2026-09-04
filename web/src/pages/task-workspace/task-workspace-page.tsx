import { TaskWorkspaceContent } from '@/features/task-workspace/components/task-workspace-content'
import { TaskWorkspaceHeader } from '@/features/task-workspace/components/task-workspace-header'
import { useTaskWorkspace } from '@/features/task-workspace/hooks/use-task-workspace'

export function TaskWorkspacePage() {
  const taskWorkspaceData = useTaskWorkspace()

  return (
    <div className="mx-auto w-full max-w-[1600px] p-6 pb-10 lg:p-8 lg:pb-16">
      <TaskWorkspaceHeader />
      <TaskWorkspaceContent taskWorkspaceData={taskWorkspaceData} />
    </div>
  )
}
