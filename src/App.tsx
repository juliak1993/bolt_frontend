import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { SurveyDashboard } from "./pages/SurveyDashboard";
import { ServiceDashboard } from "./pages/ServiceDashboard";
import { GenericPage } from "./pages/GenericPage";
import { RunListPage } from "./pages/survey/runs/RunListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/survey/dashboard" replace />} />
          <Route
            path="survey/dashboard"
            element={<SurveyDashboard />}
          />
          <Route
            path="service/dashboard"
            element={<ServiceDashboard />}
          />
          <Route
            path="jobs"
            element={<GenericPage title="Jobs" description="Manage and monitor all survey jobs" />}
          />
          <Route
            path="runs"
            element={<RunListPage />}
          />
          <Route
            path="wells"
            element={<GenericPage title="Wells" description="Well management and tracking" />}
          />
          <Route
            path="service/sros"
            element={<GenericPage title="Service Requests" description="Service request orders and management" />}
          />
          <Route
            path="configuration"
            element={<GenericPage title="Configuration" description="System configuration and preferences" />}
          />
          <Route
            path="settings"
            element={<GenericPage title="Settings" description="Application settings and preferences" />}
          />
          <Route
            path="login"
            element={<GenericPage title="Login" description="Sign in to your account" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
