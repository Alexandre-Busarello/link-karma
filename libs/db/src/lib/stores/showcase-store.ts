import {
  LoadingState,
  PaginatedResponse,
  Showcase,
  ShowcaseCategory,
  ShowcaseCreationStep,
  ShowcaseFilters,
} from '@linkkarma/shared-types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { mockShowcaseService } from '../mock-showcase-service';

interface ShowcaseState {
  // Data
  showcases: PaginatedResponse<Showcase>;
  currentShowcase: Showcase | null;
  filters: ShowcaseFilters;

  // UI State
  viewMode: 'listing' | 'create' | 'edit' | 'display';
  creationStep: ShowcaseCreationStep;
  loading: LoadingState;

  // Actions
  setViewMode: (mode: 'listing' | 'create' | 'edit' | 'display') => void;
  setCurrentShowcase: (showcase: Showcase | null) => void;
  setCreationStep: (step: ShowcaseCreationStep) => void;
  setLoading: (loading: LoadingState) => void;
  setFilters: (filters: ShowcaseFilters) => void;

  // Async Actions
  loadShowcases: (filters?: ShowcaseFilters) => Promise<void>;
  createShowcase: (data: {
    referral_url: string;
    category: string;
  }) => Promise<void>;
  updateShowcase: (id: string, data: Partial<Showcase>) => Promise<void>;
  publishShowcase: (id: string, data: Partial<Showcase>) => Promise<void>;
  generateAIContent: (url: string) => Promise<void>;

  // Utility Actions
  resetState: () => void;
  backToListing: () => void;
}

const initialState = {
  showcases: {
    data: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  },
  currentShowcase: null,
  filters: {
    category: undefined,
    search: '',
    sort: 'newest' as const,
  },
  viewMode: 'listing' as const,
  creationStep: 'url-input' as const,
  loading: { isLoading: false, error: null },
};

export const useShowcaseStore = create<ShowcaseState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Sync Actions
      setViewMode: (mode) => set({ viewMode: mode }),
      setCurrentShowcase: (showcase) => set({ currentShowcase: showcase }),
      setCreationStep: (step) => set({ creationStep: step }),
      setLoading: (loading) => set({ loading }),
      setFilters: (filters) => set({ filters }),

      // Async Actions
      loadShowcases: async (filters) => {
        set({ loading: { isLoading: true, error: null } });
        try {
          const result = await mockShowcaseService.getShowcases(filters);
          set({
            showcases: result,
            loading: { isLoading: false, error: null },
          });
          if (filters) {
            set({ filters });
          }
        } catch (error) {
          set({
            loading: {
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Erro ao carregar vitrines',
            },
          });
        }
      },

      createShowcase: async (data) => {
        set({ loading: { isLoading: true, error: null } });
        try {
          // Step 1: Create showcase
          const newShowcase = await mockShowcaseService.createShowcase(data);
          set({
            currentShowcase: newShowcase,
            creationStep: 'ai-generation',
          });

          // Step 2: Generate AI content
          const aiContent = await mockShowcaseService.generateShowcaseContent(
            data.referral_url,
            data.category as ShowcaseCategory
          );

          // Step 3: Update showcase with AI content
          const updatedShowcase = await mockShowcaseService.updateShowcase(
            newShowcase.id,
            {
              title: `${aiContent.what_is.split(' ').slice(0, 6).join(' ')}...`,
              content: aiContent,
            }
          );

          set({
            currentShowcase: updatedShowcase,
            creationStep: 'content-editing',
            viewMode: 'edit',
            loading: { isLoading: false, error: null },
          });
        } catch (error) {
          set({
            loading: {
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Erro ao criar vitrine',
            },
          });
        }
      },

      updateShowcase: async (id, data) => {
        const { currentShowcase } = get();
        if (!currentShowcase) return;

        set({ loading: { isLoading: true, error: null } });
        try {
          const updatedShowcase = await mockShowcaseService.updateShowcase(
            id,
            data
          );
          set({
            currentShowcase: updatedShowcase,
            loading: { isLoading: false, error: null },
          });
          // Refresh the list
          await get().loadShowcases(get().filters);
        } catch (error) {
          set({
            loading: {
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Erro ao salvar vitrine',
            },
          });
        }
      },

      publishShowcase: async (id, data) => {
        const { currentShowcase } = get();
        if (!currentShowcase) return;

        set({ loading: { isLoading: true, error: null } });
        try {
          const updatedShowcase = await mockShowcaseService.updateShowcase(id, {
            ...data,
            status: 'published',
          });
          set({
            currentShowcase: updatedShowcase,
            creationStep: 'published',
            loading: { isLoading: false, error: null },
          });

          // Refresh the list
          await get().loadShowcases(get().filters);

          // Show success and redirect to display
          setTimeout(() => {
            set({ viewMode: 'display' });
          }, 1000);
        } catch (error) {
          set({
            loading: {
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Erro ao publicar vitrine',
            },
          });
        }
      },

      generateAIContent: async (url) => {
        set({ loading: { isLoading: true, error: null } });
        try {
          const { currentShowcase } = get();
          const category = currentShowcase?.category || 'other';

          const content = await mockShowcaseService.generateShowcaseContent(
            url,
            category
          );

          if (currentShowcase) {
            const updatedShowcase = await mockShowcaseService.updateShowcase(
              currentShowcase.id,
              {
                content,
                title: `${content.what_is.split(' ').slice(0, 6).join(' ')}...`,
              }
            );
            set({
              currentShowcase: updatedShowcase,
              loading: { isLoading: false, error: null },
            });
          }
        } catch (error) {
          set({
            loading: {
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Erro ao gerar conteúdo',
            },
          });
        }
      },

      // Utility Actions
      resetState: () => set(initialState),

      backToListing: () =>
        set({
          viewMode: 'listing',
          currentShowcase: null,
          creationStep: 'url-input',
          loading: { isLoading: false, error: null },
        }),
    }),
    {
      name: 'showcase-store',
    }
  )
);
