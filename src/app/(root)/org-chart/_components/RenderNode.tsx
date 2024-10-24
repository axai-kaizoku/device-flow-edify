import React from 'react';
import { countTotalEmployees } from './utils';

export const renderCustomNodeElement = ({
    nodeDatum,
    toggleNode,
    orgData,
}: any) => {
    const isCEO = nodeDatum.name === orgData.name;
    const totalEmployees = isCEO ? countTotalEmployees(orgData) : 0;
    const isExpanded = !!nodeDatum.children;
    const childrenCount = nodeDatum.attributes?.childrenCount;

    return (
        <g
            transform="translate(-50, -30)"
            style={{ cursor: 'pointer' }}
            onClick={toggleNode}>
            <foreignObject
                width="120"
                height="80"
                style={{
                    overflow: 'visible',
                    borderTop: '2px solid #000',
                    borderRadius: '5px',
                }}>
                <div className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-md p-1 flex flex-col items-center justify-center border border-gray-300 dark:border-gray-600 hover:shadow-zinc-400 transition-shadow duration-300 ">
                    <img
                        src={nodeDatum.profile || '/media/sidebar/profile.svg'}
                        alt={nodeDatum.name}
                        className="w-6 h-6 rounded-full"
                    />
                    <div className="flex justify-center items-center flex-col">
                        <p className="text-xs font-semibold">{nodeDatum.name}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-300">
                            {nodeDatum.attributes?.designation}
                        </p>
                        {isCEO ? (
                            <p className="flex justify-center items-center text-[9px] text-gray-400 dark:text-white border dark:border-gray-400 rounded-full w-4 h-4">
                                {childrenCount}
                            </p>
                        ) : (
                            childrenCount > 0 && (
                                <p className="flex justify-center items-center text-[9px] text-gray-400 dark:border-gray-400 dark:text-white border rounded-full w-4 h-4">
                                    {isExpanded ? '-' : childrenCount}
                                </p>
                            )
                        )}
                    </div>
                </div>
            </foreignObject>
        </g>
    );
};
