import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Discord],
})