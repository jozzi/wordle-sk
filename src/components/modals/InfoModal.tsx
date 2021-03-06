import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Cell } from '../grid/Cell';
import { XCircleIcon } from '@heroicons/react/outline';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const InfoModal = ({ isOpen, handleClose }: Props) => {
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
                    className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                  >
                    Ako hra???
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-white ">
                      Hrajte hru Wordle slovensky! Slovo d??a je hra in??pirovan??
                      anglick??m origin??lom, prisp??soben?? pre Slovensko,
                      slovensk?? jazyk a slovensk?? kl??vesnicu.
                    </p>
                    <br />
                    <p className="text-sm text-gray-500 dark:text-white ">
                      Ka??d?? de?? hra pon??ka nov?? slovo na h??danie. Ak ho
                      neuh??dnete m????ete pokus opakova??.
                    </p>
                    <br />
                    <p className="text-sm text-gray-500 dark:text-white">
                      Uh??dnite slovo na 6 pokusov. Po ka??dom pokuse, sa h??dan??
                      p??smen?? zafarbia, aby ste vedeli ??i ste sa trafili.
                      <br />
                      <br />
                      Pod??a farby p??smen viete, ??i sa nach??dza aj v h??danom
                      slove.
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="S" status="correct" border="default" />
                      <Cell value="M" border="default" />
                      <Cell value="R" border="default" />
                      <Cell value="E" border="default" />
                      <Cell value="K" border="default" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-white">
                      P??smeno S je zafarben?? zeleno, ke????e je na spr??vnom mieste
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="K" border="default" />
                      <Cell value="U" border="default" />
                      <Cell value="L" status="present" border="default" />
                      <Cell value="M" border="default" />
                      <Cell value="A" border="default" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-white">
                      P??smeno L je zafarben?? ??lto, ke????e je v slove na inom
                      mieste.
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="C" border="default" />
                      <Cell value="H" border="default" />
                      <Cell value="A" border="default" />
                      <Cell value="O" status="absent" border="default" />
                      <Cell value="S" border="default" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-white">
                      P??smeno O sa v h??adanom slove nenach??dza.
                    </p>
                    <br />
                    <p className="text-sm text-gray-500 dark:text-white">
                      Slovensk?? mut??cia je n??ro??n??, ke????e m??me ove??a viac
                      p??smen. Dr????me palce :)
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
