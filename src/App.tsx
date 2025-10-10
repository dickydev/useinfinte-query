import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PhotoLists from "./components/PhotoLists";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PhotoLists />
    </QueryClientProvider>
  );
};

export default App;
