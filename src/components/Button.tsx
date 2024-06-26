import React, { FC } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    variant?: 'default' | 'rounded',
}

const classNames = {
    default: 'text-white rounded-tl-3xl rounded-br-3xl border-primary border-2 hover:bg-primary text-xl py-2 px-4 rounded',
    rounded: "rounded-3xl border-primary border-2 hover:text-primary text-white text-xl font-bold py-2 px-4"
}
const Button: FC<ButtonProps> = ({ children, variant = 'default', className, ...props}) => {
  return (
    <button className={`${classNames[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
