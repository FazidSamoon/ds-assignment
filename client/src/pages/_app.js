import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }) {
    const client = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    });
    return (
        <QueryClientProvider client={client}>
            <Component {...pageProps} />
        </QueryClientProvider>
    );
}
