export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncWithEllipsis = (str: string, chars = 50): string => {
    return str.length > chars ? `${str.slice(0, chars)}...` : str;
};
