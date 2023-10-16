import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import ResponsiveAppBar from '../../Components/NavBar';
import MenuList from '../Menu/pages/MenuList';
import Сategories from '../Menu/pages/Сategories';
import MenuListByCategories from '../Menu/components/MenuListByCategories';
import Tables from '../Tables/Tables';
import Personnel from '../Personnel/Personnel';
import Statistics from '../Statistics/Statistics';
import Error from '../../Components/Error';

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <ResponsiveAppBar/>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<Navigate to="/foods" />}></Route>
              <Route path=':item' element={<MenuList />}/>
              <Route index path='categories' element={<Сategories />}/>
                <Route path='categories/:item' element={<MenuListByCategories />} />
            </Route>
          <Route path='/tables' element={<Tables/>} />
          <Route path='/personnel' element={<Personnel/>} />
          <Route path='/statistics' element={<Statistics />} />
          <Route path='/error' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}