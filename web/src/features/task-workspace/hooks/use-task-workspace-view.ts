import { useState } from 'react'

import {
  getAppSettings,
  setTaskWorkspaceView,
  type TaskWorkspaceView,
} from '@/core/settings/app-settings-storage'

export function useTaskWorkspaceView() {
  const [view, setViewState] = useState<TaskWorkspaceView>(
    () => getAppSettings().taskWorkspace.view,
  )

  function setView(view: TaskWorkspaceView) {
    setViewState(view)
    setTaskWorkspaceView(view)
  }

  return {
    view,
    setView,
  }
}
