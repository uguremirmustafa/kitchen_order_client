import { Route, Routes } from 'react-router-dom';
import AuthLayout from 'components/ui/layout/auth-layout';
import MainLayout from 'components/ui/layout/main-layout';
import { AuthWrapper, RequireAuth } from 'components/wrappers/auth-wrapper';
import { QueryWrapper } from 'components/wrappers/query-wrapper';
import { ThemeProvider } from 'components/wrappers/theme-wrapper';
import LoginPage from 'pages/auth/login-page';
import ProfilePage from 'pages/auth/profile-page';
import RegisterPage from 'pages/auth/register-page';
import FallbackPage from 'pages/fallback/fallback-page';
import HomePage from 'pages/home/home-page';
import BrandsPage from 'pages/ingredients/brands-page';
import IngredientsPage from 'pages/ingredients/ingredients-page';
import RecipesPage from 'pages/recipes/recipes-page';
import { Page } from 'lib/types';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <QueryWrapper>
      <AuthWrapper>
        <ThemeProvider defaultTheme="dark">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {PAGES.map((p) => (
                <Route
                  key={p.path}
                  path={p.path}
                  element={<RequireAuth>{p.component}</RequireAuth>}
                />
              ))}
              <Route path="*" element={<FallbackPage />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryWrapper>
  );
}

export default App;

const PAGES: Page[] = [
  { path: '/', component: <HomePage /> },
  { path: 'ingredients', component: <IngredientsPage /> },
  { path: 'recipes', component: <RecipesPage /> },
  { path: 'brands', component: <BrandsPage /> },
  { path: 'profile', component: <ProfilePage /> },
];
