import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useContext } from 'react'
import UserContext from '~/lib/UserContext'
import { addChannel } from '~/lib/Store'

export default function MyModal({isOpen, setIsOpen}) {
    let [inputValue, setInputValue] = useState('')
    const { user } = useContext(UserContext)

  function handleSubmit() {
    setIsOpen(false)
    newChannel()
  }

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  const newChannel = async () => {
    if (inputValue !== null && inputValue !== '') {
      addChannel(slugify(inputValue), user.id)
    }
  }


  return (
    <>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Veuillez saisir le nom du nouveau chanel
                  </Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <input 
                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2" 
                        placeholder="Chanel" 
                        onChange={event => setInputValue(event.target.value)}
                        type='text'
                        value={inputValue}
                        />    
                    </div>

                    <div className="mt-4">
                        <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                        Valider 
                        </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}