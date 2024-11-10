import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewCompany, updateCompany } from '../../Actions/Admin';

const CompanyTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewCompany());
  }, [dispatch]);
  const company = useSelector((state) => state.admin.company);


  console.log(company, "company");

  // Filter companies based on search term
  const filteredCompanies = company?.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdate = (id, status) => {
    dispatch(updateCompany(id, { status }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Company Table</h2>
      <input
        type="text"
        placeholder="Search by name..."
        className="mb-4 p-2 border rounded w-full"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-pink-900">
          <thead>
            <tr className="bg-emerald-500">
              <th className="border border-blue-300 p-2">Photo</th>
              <th className="border border-blue-300 p-2">Name</th>
              <th className="border border-blue-300 p-2">Email</th>
              <th className="border border-blue-300 p-2">Mobile</th>
              <th className="border border-blue-300 p-2">Address</th>
              <th className="border border-blue-300 p-2">Website</th>
              <th className="border border-blue-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies?.length > 0 ? (
              filteredCompanies && filteredCompanies.map((company, index) => (
                <tr key={index} className="border-b hover:bg-yellow-200">
                  <td className="border border-pink-900 p-2">
                    <img src={`http://localhost:4000/uploads/company/${company.photo}`} alt={company.name} className="w-24 h-24 object-cover rounded-full" />
                  </td>
                  <td className="border border-pink-900 p-2">{company.name}</td>
                  <td className="border border-pink-900 p-2">{company.email}</td>
                  <td className="border border-pink-900 p-2">{company.phone}</td>
                  <td className="border border-pink-900 p-2">{company.address}</td>
                  <td className="border border-pink-900 p-2">
                    <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                      {company.website}
                    </a>
                  </td>
                  <td className="border border-pink-900 p-2">
                    {company.status === "Approved" ? (
                      <p className="text-xl font-serif">Approved</p>
                    ) : (
                      <select
                        className="p-2 border border-pink-900 rounded"
                        value={company.status || ""}
                        onChange={e => handleUpdate(company._id, e.target.value)}
                      >
                        <option value="">Select Action</option>
                        <option value="Approved">Approve</option>
                        <option value="Reject">Reject</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border border-gray-300 p-2 text-center">
                  No companies found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyTable;
