import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/outline';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const HelpModal = ({ isOpen, handleClose }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 dark:bg-slate-500 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className="absolute right-4 top-4">
                <XCircleIcon
                  className="h-6 w-6 cursor-pointer dark:text-white"
                  onClick={() => handleClose()}
                />
              </div>
              <div>
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 dark:text-white "
                  >
                    Pomôžme Ukrajine
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-white">
                      V aktuálnej vypätej situácii potrebuje Ukrajina aj našu
                      pomoc.
                      <br />
                      Rozhodli sme sa pridať do hry reklamy a celý výťažok z nej
                      venujeme na pomoc ľuďom na Ukrajine prostredníctvom
                      platformy "Kto pomôže Ukrajine".
                      <br />
                      <br />
                      <span className="font-bold text-lg">
                        Vy môžete pomôcť tiež!
                      </span>
                      <br />
                      <br />
                      Už len tým, že nevypnete reklamy v našej hre.
                      <br />
                      <br />
                      Ak chcete pomôcť viac navštívte stránku projektu
                      <br />
                      <a
                        href="https://ktopomozeukrajine.sk/"
                        className="underline font-bold"
                      >
                        {' '}
                        Kto pomôže Ukrajine
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
