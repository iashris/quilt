import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Tooltip as ReactTooltip } from 'react-tooltip';

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
        <div className="w-[500px] p-4 text-sm bg-white border rounded-md shadow-sm">
            <button
                className="px-4 py-2 mb-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={() => setEdit(!isEdit)}
            >
                {isEdit ? 'Cancel' : 'Edit'}
            </button>

            {isEdit && (
                <button
                    className="px-4 py-2 ml-4 font-bold text-white bg-green-500 rounded hover:bg-green-700"
                    onClick={saveText}
                >
                    Save
                </button>
            )}

            <div>{editTextElement}</div>

            <div>
                {referenceLinks.map((link, index) => (
                    <ReactTooltip id={`tooltip-${index}`} key={index}>
                        <span>{link.description}</span>
                    </ReactTooltip>
                ))}
            </div>

            <div className="mt-4">
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
        </div>
    );
};

export default AIChatResponse;
