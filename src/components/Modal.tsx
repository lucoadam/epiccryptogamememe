import React from "react"
import CloseIcon from "../icons/closeIcon.svg"

interface ModalProps {
  children?: React.ReactNode
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  showCloseIcon?: boolean
  showModal: boolean
}

const Modal: React.FC<ModalProps> = (props) => {
  const { children, setShowModal, showModal, showCloseIcon = true } = props

  return (
    showModal ? <div
      className={`w-screen top-0 left-0 h-screen fixed bg-background-backdrop z-50`}
      id="dialogBox"
    >
      <div className="rounded-2xl border-separate bg-background-secondary w-[310px] sm:w-[456px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative py-16 px-10 ">
          {children}
          {showCloseIcon && (
            <CloseIcon
              className="absolute right-1 top-1 w-8 h-8 text-white cursor-pointer"
              onClick={() => setShowModal(false)}
            />
          )}
        </div>
      </div>
    </div> : <></>
  )
}

export default Modal
