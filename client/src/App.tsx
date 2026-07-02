import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CarrinhoProvider } from "./contexts/CarrinhoContext";
import Home from "./pages/Home";
import DetalheProduto from "./pages/DetalheProduto";
import Carrinho from "./pages/Carrinho";
import CadastroProduto from "./pages/CadastroProduto";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/produto/:id"} component={DetalheProduto} />
      <Route path={"/carrinho"} component={Carrinho} />
      <Route path={"/cadastro"} component={CadastroProduto} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CarrinhoProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CarrinhoProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
