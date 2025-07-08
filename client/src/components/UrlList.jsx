import { useState } from "react";
import copy from "copy-to-clipboard";
import axios from "axios";

const UrlList = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopied = () => {
    setIsCopied(!isCopied);
    copy(props.shortenedUrl);
  };
  const deleteUrl = async (id) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/urls/${id}`;
      await axios.delete(url);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  return (
    <div className="container mb-10">
      <p className="mb-1">
        Original URL:{" "}
        <a
          href={props.mainUrl}
          className="text-blue-600 underline hover:no-underline"
        >
          {props.mainUrl.substring(8)}
        </a>
      </p>
      <p className="mb-2 shortenedUrl">
        Shortened URL:{" "}
        <a
          href={props.shortenedUrl}
          className="text-blue-600 underline hover:no-underline"
        >
          {props.shortenedUrl.substring(7)}
        </a>
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={handleCopied}
          className={`bg-[#ad8769] text-white px-5 py-3 rounded-md ${
            isCopied ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isCopied}
        >
          {isCopied ? "Copied to Clipboard!" : "Copy"}
        </button>
        <button
          onClick={() => deleteUrl(props.id)}
          className={`bg-red-500 text-white px-5 py-3 rounded-md cursor-pointer`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UrlList;

