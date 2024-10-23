"use client"; // Ensure this is a client-side component
import { KBarProvider, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch, KBarResults, useMatches } from 'kbar';

const EmpActions = [
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

const adminActions = [
  {
    id: "dashboard",
    name: "Dashboard",
    shortcut: ["h"],
    keywords: "home homepage dashboard",
    perform: () => window.location.pathname = "/",
  },
  {
    id: "org-chart",
    name: "Org Chart",
    shortcut: ["q"],
    keywords: "org-chart",
    perform: () => window.location.pathname = "/org-chart",
  },
  {
    id: "people",
    name: "People",
    shortcut: ["p"],
    keywords: "people",
    perform: () => window.location.pathname = "/people",
  },
  {
    id: "onboarding",
    name: "Onboarding",
    shortcut: ["o"],
    keywords: "profile",
    perform: () => window.location.pathname = "/onboarding",
  },
  {
    id: "assets",
    name: "Assets",
    shortcut: ["a"],
    keywords: "assets",
    perform: () => window.location.pathname = "/assets",
  },
  {
    id: "teams",
    name: "Teams",
    shortcut: ["t"],
    keywords: "teams",
    perform: () => window.location.pathname = "/teams",
  },
  {
    id: "store",
    name: "Store",
    shortcut: ["s"],
    keywords: "store",
    perform: () => window.location.pathname = "/store",
  },
  {
    id: "issues",
    name: "Issues",
    shortcut: ["i"],
    keywords: "issues",
    perform: () => window.location.pathname = "/issues",
  },
  {
    id: "settings",
    name: "Settings",
    shortcut: ["x"],
    keywords: "settings",
    perform: () => window.location.pathname = "/settings",
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

export default function KbarWrapper({userRole}:{userRole : number | undefined}) {
  return (
    <KBarProvider actions={userRole===1 ? EmpActions : adminActions}>
      <KBarPortal>
        <KBarPositioner className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <KBarAnimator className="w-full max-w-lg min-h-max bg-white rounded-lg shadow-xl p-6 space-y-4">
            <KBarSearch
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-8"
              placeholder="Type a command..."
            />
            {/* Rendering all actions */}

            <RenderResults />
            
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
    </KBarProvider>
  );
}
