export const appRoutes = {
  home: {
    url: (_: number) => '/',
    login: {
      url: (_: number) => `/auth/login`,
    },
    board: {
      url: (_: number) => `/board`,
    },
    requirements: {
      url: () => `/requirements`,
      reqTypes: {
        url: (_: number) => `/requirements/req-types`,
        getOne: {
          url: (id: number) => `/requirements/req-types/${id}`,
        },
        add: {
          url: (_: number) => `/requirements/req-types/add`,
        },
        update: {
          url: (id: number) => `/requirements/req-types/${id}/update`,
        },
        delete: {
          url: (id: number) => `/requirements/req-types/${id}/delete`,
        },
      },
      getOne: {
        url: (id: number) => `/requirements/${id}`,
      },
      add: {
        url: (_: number) => `/requirements/add`,
      },
      update: {
        url: (id: number) => `/requirements/${id}/update`,
      },
      delete: {
        url: (id: number) => `/requirements/${id}/delete`,
      },
    },
    users: {
      url: () => '/users',
      getOne: {
        url: (id: number) => `/users/${id}`,
      },
      add: {
        url: (_: number) => `/users/add`,
      },
      update: {
        url: (id: number) => `/users/${id}/update`,
      },
      delete: {
        url: (id: number) => `/users/${id}/delete`,
      },
    },
    settings: {
      url: (_: number) => `/settings`,
      reqState: {
        url: (_: number) => `/settings/req-state`,
        getOne: {
          url: (id: number) => `/settings/req-state/${id}`,
        },
        add: {
          url: (id: number) => `/settings/req-state/add`,
        },
        update: {
          url: (id: number) => `/settings/req-state/${id}/update`,
        },
        delete: {
          url: (id: number) => `/settings/req-state/${id}/delete`,
        },
      },
    },
  },
}
