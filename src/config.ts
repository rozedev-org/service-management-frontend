interface Config {
    bff:{
        url: string
    }
}
export const config: Config ={
    bff: {
        url: `${process.env.NEXT_PUBLIC_API_BFF}` || '',
    }
}