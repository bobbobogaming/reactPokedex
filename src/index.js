import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createHashRouter, useOutletContext} from 'react-router-dom'
import ErrorPage from './errorPage';
import { PokePreview } from './pokePreview';
import { PokeList } from './pokeList';
import { infoPageLoader, PokeInfoPageWithRouter } from './pokeInfoPage';

function FontPage(){
  const previewRef = useRef(null);
  const [switchAnimationDirection] = useOutletContext();
  return(
    <>
      <PokePreview ref={previewRef} animatePageChange={switchAnimationDirection}/>
      <PokeList handleSection={(name)=>previewRef.current.changeSelectedItem(name)}/>
    </>
  )
}

const router = createHashRouter([
  {
    path:"/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <FontPage />
      },
      {
        path: "pokemon/:pokemonName",
        element: <PokeInfoPageWithRouter />,
        loader: infoPageLoader
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
