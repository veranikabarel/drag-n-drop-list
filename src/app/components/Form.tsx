import { FormEvent } from "react";

interface FormProps {
  newName: string;
  newUrl: string;
  setNewName: (name: string) => void;
  setNewUrl: (url: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export const Form = ({
  newName,
  newUrl,
  setNewName,
  setNewUrl,
  onSubmit,
  onCancel,
}: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex content-between gap-4 rounded-md border border-border-primary bg-bg-primary p-3 py-6"
    >
      <div className="flex w-11/12 flex-col gap-5 px-6 py-5">
        <div className="flex flex-col gap-[6px]">
          <label
            htmlFor="nazwa"
            className="text-sm font-medium text-text-secondary"
          >
            Nazwa
          </label>
          <input
            name="nazwa"
            placeholder="np. Promocje"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="text-md placeholder:text-md mb-2 rounded-md border border-border-primary px-3 py-2 shadow-sm shadow-shadow placeholder:font-normal placeholder:text-text-placeholder"
          />
          <label htmlFor="url">Link</label>
          <div className="relative">
            <input
              name="url"
              placeholder="Wklej lub wyszukaj"
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="text-md placeholder:text-md mb-2 w-full rounded-md border border-border-primary py-2 pl-10 pr-3 shadow-sm shadow-shadow placeholder:font-normal placeholder:text-text-placeholder"
            />
            <svg
              className="absolute left-3 top-5 -translate-y-1/2"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                stroke="#667085"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-border-primary bg-button-secondary px-[14px] py-[10px] text-sm font-semibold shadow-sm shadow-shadow"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="rounded-md border border-border-primary bg-button-secondary px-[14px] py-[10px] text-sm font-semibold text-button-secondary-fg shadow-sm shadow-shadow"
            >
              Dodaj
            </button>
          </div>
        </div>
      </div>
      <div className="px-6 py-5" onClick={onCancel}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.5 1.5H11.5M1.5 4H16.5M14.8333 4L14.2489 12.7661C14.1612 14.0813 14.1174 14.7389 13.8333 15.2375C13.5833 15.6765 13.206 16.0294 12.7514 16.2497C12.235 16.5 11.5759 16.5 10.2578 16.5H7.74221C6.42409 16.5 5.76503 16.5 5.24861 16.2497C4.79396 16.0294 4.41674 15.6765 4.16665 15.2375C3.88259 14.7389 3.83875 14.0813 3.75107 12.7661L3.16667 4M7.33333 7.75V11.9167M10.6667 7.75V11.9167"
            stroke="#475467"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </form>
  );
};
