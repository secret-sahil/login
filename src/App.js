import logo from './logo.svg';
import './App.css';
import Child from './Child';
import { createContext, useState } from 'react';
import Lifecycle from './lifecycle';
import Forget from './Forget';
import Ref from './ref';
import Searchparams from './Searchparams';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import First from './Firstpage';
import Second from './second';
import Protected from './Protected';
import Login from './login';
import Parent from './Parent';
import Charts from './charts';
import Loginpage from './Loginpage';
import Registeration from './Registeration';

export const globaldata=createContext()

function App() {
  const name="davinder"

  return (<>
<BrowserRouter>
<Routes>
<Route path='/' element={<Child/>}/>
<Route path='/search' element={<Searchparams/>}/>
<Route  path='/first' element={<Protected component={<First/>}/>}/>
<Route path='/second' element={<Second/>}/>
<Route path='/login' element={<Loginpage/>}/>
<Route path='/p' element={<Parent/>}/>
<Route path='/charts' element={<Charts/>}/>
<Route path='/registeration' element={<Registeration/>}/>

</Routes>
</BrowserRouter>
    </>
  );
}

export default App;
