export default () => ({
    jwt: {
        secret :  process.env.JWT_SECRET ?? '32432543636',
        expireTimeOut: process.env.JWT_EXPIRE ?? '1h,
    }
})