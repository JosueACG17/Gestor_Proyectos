import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Proyects from './pages/Proyects';
import Members from './pages/Members';
import Tasks from './pages/Tasks';
import Equipos from "./pages/Equipos";
import Dashboard from './pages/Dashboard';
import TableDash from './pages/TableDash';
import TabProject from "./pages/TabProject";
import Tab_Team from './pages/Tab_Team';
import Carga from "./pages/Carga";
import ProtectedRoute from './components/utils/ProtectedRoute';
import TwoFactorAuthForm from './components/nodemailer/TwoFactorAuthForm'

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useLocalStorage('user');


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <Carga />
      ) : (
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/proyects' element={<Proyects />} />
          <Route path='/members' element={<Members />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/teams' element={<Equipos />} />
          <Route path='/TwoFactorAuthForm' element={<TwoFactorAuthForm />} />

          {user && user.nombre_del_rol === 'Miembro' && (
            <>
              <Route element={<ProtectedRoute canActivate={user} redirectPath='/home' />} >
                <Route path='/' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/dashboard/table' element={<TableDash />} />
                <Route path='/dashboard/tab_project' element={<TabProject />} />
                <Route path='dashboard/Tab_Team' element={<Tab_Team />} />
              </Route>
            </>
          )}

          <Route path='/dashboard' element={<Dashboard />} />

          {/* Permitir acceso al dashboard para usuarios Miembro y Administrador */}
          {user && user.nombre_del_rol === 'Administrador' && (
            <>
            
              <Route path='/dashboard/*' element={<Dashboard />} />
              <Route path='/dashboard/table' element={<TableDash />} />
              <Route path='/dashboard/tab_project' element={<TabProject />} />
              <Route path='dashboard/Tab_Team' element={<Tab_Team />} />
            </>
          )}

          <Route path='*' element={<Error />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;