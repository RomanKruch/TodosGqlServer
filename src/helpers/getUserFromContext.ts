export const getUserFromContext = (context: any) => {
    const {
        req: { user },
    } = context;

    return user;
};
