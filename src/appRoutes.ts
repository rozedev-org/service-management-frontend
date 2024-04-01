export const appRoutes = {
    home:{
        url:(_:number) => '/',
        requirements:{
            url: () => `/requirements`,
            getOne:{
                url: (id:number) => `/requirements/${id}`,
                delete:{
                    url:(id:number)=> `/requirements/delete/${id}`
                },
                update:{
                    url:(id:number)=> `/requirements/update/${id}`
                },
            },
            add:{
                url: () => `/requirements/add`,

            },
        },
        users:{
            url: () => `/users`,
            getOne:{
                url: (id:number) => `/users/${id}`,
                delete:{
                    url:(id:number)=> `/users/${id}/delete`
                },
                update:{
                    url:(id:number)=> `/users/${id}/update`
                },
            },
            add:{
                url: () => `/users/add`,

            },
        },
    },
}