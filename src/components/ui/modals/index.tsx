import { useModal } from 'components/wrappers/modal-wrapper';
import { FaTimes } from 'react-icons/fa';

function Modal() {
  const { modal, closeModal } = useModal();

  if (!modal) {
    return null;
  }
  return (
    <dialog open={!!modal.id} className="modal items-start pt-20 px-20">
      <div
        className={`modal-box p-0 drop-shadow-2xl border-2 border-primary w-full ${
          modal?.size ? `max-w-[${modal.size}]` : 'max-w-6xl'
        } `}
      >
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-3"
            onClick={() => closeModal()}
          >
            <FaTimes />
          </button>
        </form>
        <h3 className="font-bold text-lg border-b-2 border-primary py-3 px-4 bg-primary/10">
          {modal.title}
        </h3>
        <div className="p-4">{modal.content}</div>
      </div>
    </dialog>
  );
}

export default Modal;
