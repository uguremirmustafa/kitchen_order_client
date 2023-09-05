import { useModal } from 'components/wrappers/modal-wrapper';

function Modal() {
  const { modal, closeModal } = useModal();

  if (!modal) {
    return null;
  }
  return (
    <dialog open={!!modal.id} className="modal">
      <div className="modal-box modal-top w-full md:min-w-[600px]">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => closeModal()}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg pb-2 mb-2 border-b border-primary">{modal.title}</h3>
        {modal.content}
      </div>
    </dialog>
  );
}

export default Modal;
