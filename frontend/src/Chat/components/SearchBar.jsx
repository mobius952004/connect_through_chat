import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar({onSearch}) {

    const [input, setInput] = useState("");

    const handleInput = (event) => {
      setInput(event.target.value);
      onSearch(event.target.value);
    }

  return (
    <form className="flex  items-center max-w-sm mx-2 my-3 bg-blend-saturation ">
      {/* <label htmlFor="simple-search" className="sr-only">
        Search
      </label> */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 dark:text-white pointer-events-none">
          <Search />
        </div>
        <input
          type="text"
          id="simple-search"
          value={input}
          onChange={handleInput}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-800 dark:border-gray-400 dark:hover:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          placeholder="Search User..."
          required
        />
      </div>
      <button
        type="submit"
        className="p-2 ms-2 text-sm font-medium text-white bg-green-700 rounded-full border border-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-600 dark:focus:ring-green-800"
      >
        <Search />
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}