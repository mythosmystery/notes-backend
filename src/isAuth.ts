import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { MyContext } from './types/MyContext';
import { __secret__ } from './consts';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
   const authorization = context.req.headers['authorization'];

   if (!authorization) {
      throw new Error('Not authenticated');
   }

   try {
      const token = authorization.split(' ')[1] || authorization;
      const payload = verify(token, __secret__);
      console.log(payload);
      context.payload = payload as any;
   } catch (err) {
      console.log(err);
      throw new Error('Not authenticated');
   }
   return next();
};
