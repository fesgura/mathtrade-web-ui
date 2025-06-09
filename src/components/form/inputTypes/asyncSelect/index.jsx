import useAsyncSelect from './useAsyncSelect';
import clsx from 'clsx';

const AsyncSelect = ({ options, value, onChange, disabled = false }) => {
  const {
    isOpen,
    displayedText,
    wrapperRef,
    toggleDropdown,
    handleOptionClick,
  } = useAsyncSelect(options, value, onChange);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <button
        type="button"
        className={clsx(
          'w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
          { 'bg-gray-100 text-gray-500 cursor-not-allowed': disabled }
        )}
        onClick={toggleDropdown}
        disabled={disabled}
      >
        <span className="block truncate">{displayedText}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </button>

      {isOpen && !disabled && (
        <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {options.map((option) => (
            <li
              key={option.value}
              className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
              onClick={() => handleOptionClick(option.value)}
            >
              <span className={clsx('block truncate', { 'font-semibold': option.value == value })}>
                {option.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AsyncSelect;