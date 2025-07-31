import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  // Theme and Appearance
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  
  // Notifications and Toasts
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
    timestamp: number;
  }>;
  
  // Modal and Dialog State
  modals: {
    upgradePrompt: boolean;
    deleteConfirm: boolean;
    imagePreview: boolean;
  };
  
  // Loading States for Global UI
  globalLoading: boolean;
  
  // Actions
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  // Notification Actions
  addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Modal Actions
  openModal: (modal: keyof UIState['modals']) => void;
  closeModal: (modal: keyof UIState['modals']) => void;
  closeAllModals: () => void;
  
  // Global Loading
  setGlobalLoading: (loading: boolean) => void;
  
  // Utility Actions
  showSuccess: (title: string, message: string) => void;
  showError: (title: string, message: string) => void;
  showWarning: (title: string, message: string) => void;
  showInfo: (title: string, message: string) => void;
}

let notificationId = 0;

export const useUIStore = create<UIState>()(
  devtools(
    (set, get) => ({
      // Initial State
      theme: 'light',
      sidebarOpen: false,
      notifications: [],
      modals: {
        upgradePrompt: false,
        deleteConfirm: false,
        imagePreview: false,
      },
      globalLoading: false,

      // Theme Actions
      setTheme: (theme) => set({ theme }),
      
      // Sidebar Actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Notification Actions
      addNotification: (notification) => {
        const id = `notification-${++notificationId}`;
        const newNotification = {
          ...notification,
          id,
          timestamp: Date.now(),
        };
        
        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));

        // Auto-remove notification after duration (default 5 seconds)
        const duration = notification.duration || 5000;
        setTimeout(() => {
          get().removeNotification(id);
        }, duration);
      },

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearNotifications: () => set({ notifications: [] }),

      // Modal Actions
      openModal: (modal) =>
        set((state) => ({
          modals: { ...state.modals, [modal]: true },
        })),

      closeModal: (modal) =>
        set((state) => ({
          modals: { ...state.modals, [modal]: false },
        })),

      closeAllModals: () =>
        set({
          modals: {
            upgradePrompt: false,
            deleteConfirm: false,
            imagePreview: false,
          },
        }),

      // Global Loading
      setGlobalLoading: (loading) => set({ globalLoading: loading }),

      // Utility Notification Methods
      showSuccess: (title, message) =>
        get().addNotification({ type: 'success', title, message }),

      showError: (title, message) =>
        get().addNotification({ type: 'error', title, message, duration: 8000 }),

      showWarning: (title, message) =>
        get().addNotification({ type: 'warning', title, message }),

      showInfo: (title, message) =>
        get().addNotification({ type: 'info', title, message }),
    }),
    {
      name: 'ui-store',
    }
  )
);
