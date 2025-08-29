/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useState, useEffect } from 'react';

// Fake backend response (simulating API call)
const mockBackendResponse = {
  roles: [
    { id: 'anonymous', name: 'Anonymous user' },
    { id: 'authenticated', name: 'Authenticated user' },
    { id: 'client', name: 'Client' },
    { id: 'bosh_buxgalter', name: 'Bosh buxgalter' },
    { id: 'administrator', name: 'Administrator' },
  ],
  permissions: [
    { id: 'create_user', name: 'Create User' },
    { id: 'edit_user', name: 'Edit User' },
    { id: 'delete_user', name: 'Delete User' },
    { id: 'view_reports', name: 'View Reports' },
    { id: 'manage_system', name: 'Manage System' },
  ],
  assignments: {
    anonymous: ['view_reports'],
    authenticated: ['view_reports'],
    client: ['view_reports'],
    bosh_buxgalter: ['create_user', 'edit_user', 'view_reports'],
    administrator: ['create_user', 'edit_user', 'delete_user', 'view_reports', 'manage_system'],
  },
};

// Simulate API call
const fetchRolePermissions = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(mockBackendResponse), 500);
  });

// Simulate saving data
const saveRolePermissions = (assignments) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log('Saving to backend:', assignments);
      resolve({ success: true });
    }, 1000);
  });

export default function RolePermissionMatrix() {
  const [data, setData] = useState({ roles: [], permissions: [], assignments: {} });
  const [assignments, setAssignments] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Load data on component mount
  useEffect(() => {
    fetchRolePermissions()
      .then((response) => {
        setData(response);
        setAssignments(response.assignments);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, []);

  // Check if a role has a specific permission
  const isChecked = (roleId, permissionId) => assignments[roleId]?.includes(permissionId) || false;

  // Toggle permission for a role
  const togglePermission = (roleId, permissionId) => {
    const rolePermissions = [...(assignments[roleId] || [])];
    const index = rolePermissions.indexOf(permissionId);

    if (index > -1) {
      rolePermissions.splice(index, 1);
    } else {
      rolePermissions.push(permissionId);
    }

    setAssignments({
      ...assignments,
      [roleId]: rolePermissions,
    });
  };

  // Save changes to backend
  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      await saveRolePermissions({ assignments });
      setMessage('✅ Changes saved successfully!');
    } catch (error) {
      setMessage('❌ Error saving changes. Please try again.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Reset to original state
  const handleReset = () => {
    setAssignments(data.assignments);
    setMessage('↺ Changes reset to original state');
    setTimeout(() => setMessage(''), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading permissions...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Role Permission Matrix</h1>
        <p className="text-gray-600">Assign permissions to different user roles</p>
      </div>

      {/* Controls */}
      <div className="mb-4 flex gap-4 items-center">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          {saving ? '⏳ Saving...' : '💾 Save Changes'}
        </button>

        <button
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Reset
        </button>

        {message && <div className="text-sm font-medium">{message}</div>}
      </div>

      {/* Permission Matrix */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-4 font-medium text-gray-900 sticky left-0 bg-gray-50">
                Permissions
              </th>
              {data.roles.map((role) => (
                <th key={role.id} className="text-center p-4 font-medium text-gray-900 min-w-32">
                  <div className="transform -rotate-45 origin-center whitespace-nowrap">
                    {role.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.permissions.map((permission, index) => (
              <tr key={permission.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-4 font-medium text-gray-900 sticky left-0 bg-inherit">
                  {permission.name}
                </td>
                {data.roles.map((role) => (
                  <td key={`${role.id}-${permission.id}`} className="text-center p-4">
                    <input
                      type="checkbox"
                      checked={isChecked(role.id, permission.id)}
                      onChange={() => togglePermission(role.id, permission.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Debug Info */}
      <details className="mt-6">
        <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
          🔍 Debug: Current Assignments (Click to expand)
        </summary>
        <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-x-auto">
          {JSON.stringify(assignments, null, 2)}
        </pre>
      </details>

      {/* Summary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
          {data.roles.map((role) => (
            <div key={role.id} className="text-blue-800">
              <strong>{role.name}:</strong> {assignments[role.id]?.length || 0} permissions
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
