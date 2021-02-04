import React from 'react'
import _Logo from '../assets/img/microsoft-to-do-app.png'
import _Add from '../assets/img/icons8-plus-128.png'
import _List from '../assets/img/icons8-add-list-96.png'

const Logo = () => {
  return (
    <img src={_Logo} alt={'Logo'} width={60} />
  )
}

const Add = () => {
  return (
    <img src={_Add} alt={'Logo'} width={60} />
  )
}

const List = () => {
  return (
    <img src={_List} alt={'Logo'} width={80} />
  )
}

export {
  Logo,
  Add,
  List
}
