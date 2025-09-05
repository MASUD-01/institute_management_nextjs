//"use server";
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

// Helper to refresh token
export const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    const response = await fetch(
      `${process.env.API_SERVER_BASE_URL}/auth/institute/refresh`,
      {
        headers: {
          Authorization: `Bearer ${token.refreshToken}`,
        },
      }
    );

    if (!response.ok) {
      signOut();
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();

    return {
      ...token,
      accessToken: data.accessToken ?? token.accessToken,
      refreshToken: data.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error("refreshAccessToken error:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

// Main NextAuth
export const { auth, signIn, signOut, handlers } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log("authorize called with credentials:", credentials);

        if (!credentials) return null;

        try {
          const res = await fetch(
            `${process.env.API_SERVER_BASE_URL}/auth/institute/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_or_email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          // console.log("login API status:", res.status);

          if (!res.ok) {
            const errorText = await res.text();
            console.error("login API failed:", errorText);
            return null;
          }

          const data: Session = await res.json();
          // console.log("authorize API data:", data);

          return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            email: data.data?.email,
            phone_number: data.data?.phone_number,
          };
        } catch (error) {
          console.error("authorize error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    jwt: async ({ token, account, user }) => {
      // user is only available the first time a user signs in authorized
      // console.log(`In jwt callback - Token is ${JSON.stringify(token)}`);

      if (token.accessToken) {
        const decodedToken = jwtDecode(token.accessToken);
        // console.log(decodedToken);
        token.accessTokenExpires = (decodedToken?.exp || 0) * 1000;
      }

      if (account && user) {
        // console.log(`In jwt callback - User is ${JSON.stringify(user)}`);
        // console.log(`In jwt callback - account is ${JSON.stringify(account)}`);

        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      // console.log(
      //   "**** Access token expires on *****",
      //   token.accessTokenExpires,
      //   token?.accessTokenExpires && new Date(token?.accessTokenExpires)
      // );
      if (token?.accessTokenExpires && Date.now() < token?.accessTokenExpires) {
        // console.log("**** returning previous token ******");
        return token;
      }

      // Access token has expired, try to update it
      // console.log("**** Update Refresh token ******");
      //return token;
      return refreshAccessToken(token);
    },

    session: async ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        // session.user = token.user;
      }
      return session;
    },
  },
});
