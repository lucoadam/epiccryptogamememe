import React from 'react'

const Footer = () => {
  return (
    <div className="text-primary py-8 flex justify-center border-primary border-t-2">
      Copyright &copy; {(new Date()).getFullYear()} vali::Meme.
    </div>
  )
}

export default Footer
