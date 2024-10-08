"use client"; // Ensure this is a client-side component

import { KBarProvider, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch, KBarResults, useMatches } from 'kbar';

const actions = [
  {
    id: "home",
    name: "Home",
    shortcut: ["h"],
    keywords: "home homepage",
    perform: () => window.location.pathname = "/",
  },
  {
    id: "profile",
    name: "Profile",
    shortcut: ["p"],
    keywords: "profile",
    perform: () => window.location.pathname = "/profile",
  },
  {
    id: "devices",
    name: "Devices",
    shortcut: ["d"],
    keywords: "devices",
    perform: () => window.location.pathname = "/devices",
  },
  {
    id: "teams",
    name: "Teams",
    shortcut: ["t"],
    keywords: "teams",
    perform: () => window.location.pathname = "/teams",
  },
];

// Custom component to render the results inside the command bar
function RenderResults() {
    const { results } = useMatches();
    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === "string" ? (
            <div className="text-gray-500 px-4 py-2">{item}</div>
          ) : (
            <div className={`px-4 flex justify-between items-center py-2 rounded-md cursor-pointer ${
                active ? "bg-gray-300 " : "bg-white text-black"
            }`}>
                <div>
                    {item.name}
                </div>

                <div className="px-2 py-1 rounded-md bg-slate-400">{item?.shortcut}</div>
            </div>
          )
        }
      />
    );
  }

export default function KbarWrapper() {
  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <KBarAnimator className="w-full max-w-lg bg-white rounded-lg shadow-xl p-6 space-y-4">
            <KBarSearch
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-8 overflow-y-auto"
              placeholder="Type a command..."
            />
            {/* Render all actions */}
            <div className="h-60">
              <RenderResults />
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
    </KBarProvider>
  );
}
