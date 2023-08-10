import React from 'react';

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white p-6 min-h-screen flex flex-col justify-between w-1/6">
      <div>
        <h1 className="text-4xl font-semibold mb-6">NoxTree</h1>
        <ul className="space-y-2">
          <li className="hover:bg-gray-700 p-2 rounded">
            <a href="#" className="block">My Account</a>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded">
            <a href="#" className="block">My Links</a>
          </li>
        </ul>
      </div>
      <div className="mb-4">
        <p className="text-sm">Logged in as John Doe</p>
      </div>
    </aside>
  );
}
