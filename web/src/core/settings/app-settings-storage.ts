const STORAGE_KEY = 'taskflow.settings'

export type TaskWorkspaceView = 'kanban' | 'list'

export type AppSettings = {
  taskWorkspace: {
    view: TaskWorkspaceView
  }
}

function createDefaultSettings(): AppSettings {
  return {
    taskWorkspace: {
      view: 'kanban',
    },
  }
}

function isTaskWorkspaceView(value: unknown): value is TaskWorkspaceView {
  return value === 'kanban' || value === 'list'
}

export function getAppSettings(): AppSettings {
  const rawSettings = localStorage.getItem(STORAGE_KEY)

  if (!rawSettings) {
    return createDefaultSettings()
  }

  try {
    const parsed = JSON.parse(rawSettings)

    return {
      taskWorkspace: {
        view: isTaskWorkspaceView(parsed?.taskWorkspace?.view)
          ? parsed.taskWorkspace.view
          : 'kanban',
      },
    }
  } catch {
    return createDefaultSettings()
  }
}

export function setTaskWorkspaceView(view: TaskWorkspaceView) {
  const currentSettings = getAppSettings()

  const nextSettings: AppSettings = {
    ...currentSettings,
    taskWorkspace: {
      ...currentSettings.taskWorkspace,
      view,
    },
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSettings))
}
