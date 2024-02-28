// src/lib/client.tsx
"use client";
import { HttpLink, ApolloLink } from "@apollo/client";
import {
    NextSSRApolloClient,
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

const STRAPI_URL = process.env.STRAPI_URL || "https://eloquent-compassion-29bd09997d.strapiapp.com";

function makeClient() {
    const httpLink = new HttpLink({
        uri: `${STRAPI_URL}/graphql`,
    });
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === "undefined"
                ? ApolloLink.from([
                    new SSRMultipartLink({
                        stripDefer: true,
                    }),
                    httpLink,
                ])
                : httpLink,
    });
}
/* function makeSuspenseCache() {
  return new SuspenseCache();
} */
export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider
            makeClient={makeClient}
        /*  makeSuspenseCache={makeSuspenseCache} */
        >
            {children}
        </ApolloNextAppProvider>
    );
}