import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// NOTE: In production, replace this with Prisma DB lookups.
// This is a demo-ready setup that works without a running PostgreSQL instance.
const DEMO_USERS = [
    {
        id: "1",
        name: "Демо Пользователь",
        email: "demo@snkrs.ru",
        passwordHash: bcrypt.hashSync("demo123", 10),
        role: "USER" as const,
    },
    {
        id: "admin",
        name: "Администратор",
        email: "admin@snkrs.ru",
        passwordHash: bcrypt.hashSync("admin123", 10),
        role: "ADMIN" as const,
    },
];

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Пароль", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const email = credentials.email as string;
                const password = credentials.password as string;

                // Demo: find user in memory
                const user = DEMO_USERS.find((u) => u.email === email);
                if (!user) return null;

                const isValid = await bcrypt.compare(password, user.passwordHash);
                if (!isValid) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as { role?: string }).role ?? "USER";
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub as string;
                (session.user as { role?: string }).role = token.role as string;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
});
