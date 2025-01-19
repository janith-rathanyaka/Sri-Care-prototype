export default () => ({
    jwt: {
        secret :  process.env.JWT_SECRET ?? '32432543636',
        expireTimeout: process.env.JWT_EXPIRE ?? '1h',
    }
})