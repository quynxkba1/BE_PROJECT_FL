import { prisma } from "@src/shared/prisma";

export class UserRepository {
    getUserByEmail(email: string) {
        return prisma.user.findFirst({
            where: {
                email: email
            }, 
            select :{
                password: true
            }
        })
    }

    
}