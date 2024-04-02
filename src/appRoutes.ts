export const appRoutes = {
    home:{
        url:(_:number) => '/',     
        requirements:{
            url: () => `/requirements`,
            getOne:{
                url: (id:number) => `/requirements/${id}`,
            },
            add:{
                url: (_:number) => `/requirements/add}`,
            },
            update:{
                url: (id:number) => `/requirements/update/${id}`,
            },
            delete:{
                url: (id:number) => `/requirements/delete/${id}`,
            },
        },
        users:{
            url: () => '/users',
            getOne:{
                url: (id:number) => `/users/${id}`,
            },
            add:{
                url: (_:number) => `/users/add}`,
            },
            update:{
                url: (id:number) => `/users/update/${id}`,
            },
            delete:{
                url: (id:number) => `/users/delete/${id}`,
            },
        },   
    }, 
}