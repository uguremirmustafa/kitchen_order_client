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
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <QueryWrapper>
      <AuthWrapper>
        <ThemeProvider defaultTheme="dark">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route
                index
                element={
                  <RequireAuth>
                    <HomePage />
                  </RequireAuth>
                }
              />
              <Route
                path="brands"
                element={
                  <RequireAuth>
                    <BrandsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="ingredients"
                element={
                  <RequireAuth>
                    <IngredientsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="profile"
                element={
                  <RequireAuth>
                    <ProfilePage />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<FallbackPage />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthWrapper>
    </QueryWrapper>
  );
}

export default App;
