export const __prod__ = process.env.NODE_ENV === 'production';
export const __cookie__ = process.env.COOKIE_NAME;
export const __secret__ = process.env.JWT_SECRET || 'asdfasdfasdfasdf';
