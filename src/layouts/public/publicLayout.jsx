import { Outlet } from 'react-router-dom';
import { HeaderPub } from './HeaderPub';

export const PublicLayout = () => {
  return (
    <>
      {/* Menu de Navegacion Principal */}
      <HeaderPub />

      {/* Contenido Principal */}
      <section className='layout__content'>
        <Outlet />
      </section>
    </>
  )
}