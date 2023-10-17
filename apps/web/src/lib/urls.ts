import { baseUrl } from "@acme/shared";

export const urls = {
  home: () => `/`,
  features: () => `/features`,
  pricing: () => `/pricing`,
  contact: () => `/contact`,
  about: () => `/about`,
  faqs: () => `/faqs`,

  signIn: () => `${baseUrl}/sign-in`,
  signUp: () => `${baseUrl}/sign-up`,

  dashboard: {
    root: () => `/dashboard`,
    projects: {
      list: () => `/dashboard/projects`,
      view: (projectId: string) => `/dashboard/projects/${projectId}`,
      edit: (projectId: string) => `/dashboard/projects/${projectId}/edit`,
      create: () => `/dashboard/projects/create`,
    },
  },

  onboard: {
    createProject: () => `/onboard/create-project`,
    success: () => `/onboard/success`,
  },

  admin: {
    root: () => `/admin`,

    projects: {
      root: () => `/admin/projects`,
      project: (projectId: string) => `/admin/projects/${projectId}`,
    },

    users: {
      root: () => `/admin/users`,
      user: (userId: string) => `/admin/users/${userId}`,
    },
  },
};
