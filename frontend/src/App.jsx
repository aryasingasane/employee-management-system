import { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

//components
import NavBar from "./Components/NavBar";
import Sidebar from "./Components/Sidebar";

//context
import { ThemeProvider } from "./context/ThemeContext";

//routes
import PrivateRoute from "./routes/PrivateRoute";

//pages
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import EmployeesList from "./pages/EmployeesList";
import Settings from "./pages/Settings";
import EmployeeProfile from "./pages/EmployeeProfile";
import MyProfile from "./pages/MyProfile";
import UpdateEmployee from "./pages/UpdateEmployee";
import UpdateSelf from "./pages/UpdateSelf";
import AddEmployee from "./pages/AddEmployee";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
                <NavBar />
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar />

                  <main className="flex-1 p-6 overflow-auto bg-slate-50 dark:bg-slate-900">
                    <Routes>
                      {/* Protected HR Routes */}
                      <Route
                        element={
                          <PrivateRoute
                            roles={["ROLE_HR_MANAGER", "HR_MANAGER"]}
                          />
                        }
                      >
                        <Route
                          path="/hr-dashboard"
                          element={<EmployeesList />}
                        />
                        <Route
                          path="/hr/employee/add"
                          element={<AddEmployee />}
                        />
                      </Route>

                      <Route
                        path="/employee/:id"
                        element={<EmployeeProfile />}
                      />

                      <Route path="/profile" element={<EmployeeProfile />} />

                      <Route path="/settings" element={<Settings />} />

                      <Route
                        path="/hr/employee/edit/:id"
                        element={<UpdateEmployee />}
                      />

                      {/* Protected Employee Routes */}
                      <Route
                        element={
                          <PrivateRoute roles={["ROLE_EMPLOYEE", "EMPLOYEE"]} />
                        }
                      >
                        <Route
                          path="/my-profile"
                          element={<MyProfile />}
                        />
                        <Route
                          path="/my-profile/edit"
                          element={<UpdateSelf />}
                        />
                      </Route>

                      {/* Protected 404 */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
