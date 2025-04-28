import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import opcvmService from '../api/opcvm/opcvmService';

const Select = () => {
  // State to manage the selected OPCVM, dropdown state, search term, OPCVM list, loading state, and error
  const [selectedOPCVM, setSelectedOPCVM] = useState(null);
  const [isOpen, setIsOpen] = useState(false);  
  const [searchTerm, setSearchTerm] = useState('');
  const [opcvmList, setOpcvmList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Effect to fetch OPCVMs when the component mounts
  useEffect(() => {
    const fetchOPCVMs = async () => {
      try {
        // Fetch the list of OPCVMs
        const data = await opcvmService.getNamesAndCodes();
        setOpcvmList(data.slice(0,100)); // Set the first 100 OPCVMs to the state
      } catch (err) {
        setError(err.message); // Set the error state if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchOPCVMs();
  }, []);

  // Filter OPCVMs based on the search term
  const filteredOptions = opcvmList.filter(opcvm =>
    opcvm.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle selecting an OPCVM
  const handleSelect = (opcvm) => {
    setSelectedOPCVM(opcvm); // Set the selected OPCVM
    setIsOpen(false); // Close the dropdown
    navigate(`/chart/${opcvm.code}`); // Navigate to the chart page for the selected OPCVM
  };

  // Render a loading message if data is still loading
  if (loading) return (
    <div className="text-center mt-20">
      <ScaleLoader className='text-orange-500' />
      {/*<p>loading data...</p>*/}
    </div>
    
  );
  // Render an error message if there was an error fetching data
  if (error) return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-20 mb-10">
      <div 
        className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-shadow bg-white"
        onClick={() => setIsOpen(!isOpen)} // Toggle the dropdown when clicked
      >
        <span className={selectedOPCVM ? 'text-gray-800' : 'text-gray-400'}>
          {selectedOPCVM?.nom || 'Sélectionnez un OPCVM'} // Display the selected OPCVM or a placeholder
        </span>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`text-orange-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 border border-gray-200 rounded-lg shadow-lg bg-white">
          <div className="p-2 border-b">
            <div className="relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Rechercher un OPCVM..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on input change
              />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opcvm, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
                  onClick={() => handleSelect(opcvm)} // Handle selecting an OPCVM
                >
                  <div className="font-medium text-gray-800">{opcvm.nom}</div>
                  <div className="text-sm text-gray-500">Code: {opcvm.code}</div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                Aucun OPCVM trouvé
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;