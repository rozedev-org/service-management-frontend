export const appRoutes = {
    home:{
        url:(_:number) => '/',
        login:{
            url:(_:number) => `/auth/login`
        }     ,
        board:{
            url:(_:number)=> `/board`
        },
        requirements:{
            url: () => `/requirements`,
            getOne:{
                url: (id:number) => `/requirements/${id}`,
            },
            add:{
                url: (_:number) => `/requirements/add`,
            },
            update:{
                url: (id:number) => `/requirements/${id}/update`,
            },
            delete:{
                url: (id:number) => `/requirements/${id}/delete`,
            },
        },
        users:{
            url: () => '/users',
            getOne:{
                url: (id:number) => `/users/${id}`,
            },
            add:{
                url: (_:number) => `/users/add`,
            },
            update:{
                url: (id:number) => `/users/${id}/update`,
            },
            delete:{
                url: (id:number) => `/users/${id}/delete`,
            },
        },   
    }, 
}