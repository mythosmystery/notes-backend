import { __cookie__ } from 'src/consts';
import { MyContext } from 'src/types/MyContext';
import { Ctx, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class LogoutResolver {
   @Mutation(() => Boolean)
   logout(@Ctx() { req, res }: MyContext) {
      return new Promise(resolve => {
         req.session.destroy(err => {
            res.clearCookie(__cookie__ ? __cookie__ : 'qid');
            if (err) {
               console.log(err);
               resolve(false);
               return;
            }
            resolve(true);
         });
      });
   }
}
