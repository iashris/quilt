import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Tooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css'

type ReferenceLink = {
    url: string;
    description: string;
}

type AIChatResponseProps = {
    textResponse: string;
    referenceLinks: ReferenceLink[];
}


const AIChatResponse: React.FC<AIChatResponseProps> = ({ textResponse, referenceLinks }) => {
    const [isEdit, setEdit] = useState(false);
    const [editedText, setEditedText] = useState(textResponse);

    const saveText = () => {
        setEdit(false);
    };

    const editTextElement = isEdit ? (
        <textarea
            className="w-full h-24 p-2 border"
            defaultValue={editedText}
            onChange={(e) => setEditedText(e.target.value)}
        ></textarea>
    ) : (
        <ReactMarkdown>{editedText}</ReactMarkdown>
    );

    return (
        <div className="text-sm border rounded-lg shadow-sm bg-neutral-800 border-neutral-600 text-neutral-400">
            <div className='p-4'>
                <button
                    className="px-4 py-2 mb-4 font-bold bg-blue-500 rounded hover:bg-blue-700"
                    onClick={() => setEdit(!isEdit)}
                >
                    {isEdit ? 'Cancel' : 'Edit'}
                </button>

                {isEdit && (
                    <button
                        className="px-4 py-2 ml-4 font-bold bg-green-500 rounded hover:bg-green-700"
                        onClick={saveText}
                    >
                        Save
                    </button>
                )}

                <div>{editTextElement}</div>

                <div>
                    {referenceLinks.map((link, index) => (
                        <a
                            data-tooltip-id="my-tooltip"
                            data-tooltip-html={`<span>${link.description}</span>`}
                            data-tooltip-place="top"
                            key={index}
                        >
                            {link.url}
                        </a>

                    ))}
                </div>
            </div>
            <div className="p-4 mt-4 border-t border-neutral-600">
                <strong>Learn More:</strong>
                <ul className="list-disc list-inside">
                    {referenceLinks.map((link, index) => (
                        <li key={index}>
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 hover:underline"
                                data-tip
                                data-for={`tooltip-${index}`}
                            >
                                {link.description}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <Tooltip id="my-tooltip" clickable />
        </div>
    );
};

export default AIChatResponse;
