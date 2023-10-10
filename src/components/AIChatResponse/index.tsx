import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Tooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";

type AIChatResponseProps = {
  textResponse: string;
};

const AIChatResponse: React.FC<AIChatResponseProps> = ({ textResponse }) => {
  const [isEdit, setEdit] = useState(false);
  const [editedText, setEditedText] = useState(textResponse);
  const [showMore, setShowMore] = useState(false);

  const urls = editedText.match(/https?:\/\/[^\s()<>]+(?=\))/g) || [];
  const saveText = () => {
    setEdit(false);
  };

  const editTextElement = isEdit ? (
    <textarea
      rows={8}
      className="w-full p-2 border resize bg-neutral-700 border-neutral-600 text-neutral-300"
      defaultValue={editedText}
      onChange={(e) => setEditedText(e.target.value)}></textarea>
  ) : (
    <ReactMarkdown
      className="font-sans text-sm break-words text-neutral-200"
      components={{
        a: ({ node, children, ...props }) => {
          const href = String(node?.properties?.href) || "";
          const index = 1 + urls.findIndex((v) => v === href);
          return (
            <a
              className="underline underline-offset-2 decoration-dotted"
              data-tooltip-id="my-tooltip"
              {...props}
              target="_blank"
              data-tooltip-html={`<a className="text-blue-500" href="${href}">${href}</a>`}
              rel="noreferrer">
              {children}
              {index ? <sup className="text-xs text-blue-500">[{index}]</sup> : null}
            </a>
          );
        },
      }}>
      {editedText}
    </ReactMarkdown>
  );

  const displayUrls = showMore ? urls : urls.slice(0, 3);

  return (
    <div className="text-sm border rounded-lg shadow-sm bg-neutral-800 border-neutral-600 text-neutral-400">
      <div className="p-4">
        <div>{editTextElement}</div>

        <button
          className="inline-block mt-4 text-blue-500 rounded hover:underline"
          onClick={() => setEdit(!isEdit)}>
          {isEdit ? "Cancel" : "Edit"}
        </button>

        {isEdit && (
          <button
            className="inline-block px-4 py-2 mt-4 ml-4 font-bold bg-green-500 rounded hover:bg-green-700"
            onClick={saveText}>
            Save
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center p-2 mt-4 border-t border-neutral-600">
        <span className="mr-2">Learn More: </span>
        {displayUrls.map((url, index) => (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="p-1 m-1 text-sm font-bold text-blue-100 rounded-sm hover:bg-slate-800 bg-slate-900"
            data-tip
            data-for={`tooltip-${index}`}>
            {index + 1}. {new URL(url).hostname}
          </a>
        ))}
        {urls.length > 3 && (
          <button className="m-1 text-blue-500" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
      <Tooltip id="my-tooltip" clickable />
    </div>
  );
};

export default AIChatResponse;
