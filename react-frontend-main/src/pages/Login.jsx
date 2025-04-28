// src/pages/Login.jsx
import { useState } from "react"; // Importing useState hook from React
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importing FontAwesomeIcon for icons
import {
  faUser,
  faLock,
  faSignInAlt,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons"; // Importing icons
import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate for routing
import clientService from "../api/clients/clientService"; // Importing clientService for API calls

const Login = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: "", // Email input field
    password: "", // Password input field
  });
  const [error, setError] = useState(""); // State to hold error messages
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate(); // Hook to programmatically navigate

  const [isChecked, setIsChecked] = useState(false); // State to manage password visibility

  // Function to toggle password visibility
  const handlePasswordVisibility = () => {
    setIsChecked(!isChecked); // Toggle the isChecked state
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Update the specific field in formData
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state to true
    setError(""); // Clear anyn previous error messages

    try {
      // Call the login function from clientService with email and password
      await clientService.login(formData.email, formData.password);
      navigate("/select"); // Navigate to the select page on successful login
    } catch (err) {
      // Set error message if login fails
      setError(err || "Échec de la connexion. Veuillez vérifier vos identifiants.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-orange-900 py-4 px-6">
          <h2 className="text-2xl font-bold text-white text-center">
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Connexion
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error} {/* Display error message if exists */}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type={isChecked ? "text" : "password"} // Toggle input type based on visibility
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <FontAwesomeIcon
                icon={isChecked ? faEye : faEyeSlash}
                //onClick={handlePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="show-password"
                name="show-password"
                type="checkbox"
                onChange={handlePasswordVisibility}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label
                htmlFor="show-password"
                className="ml-2 block text-sm text-gray-700"
              >
                Afficher le mot de pass
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Mot de passe oublié?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-orange-400" : "bg-orange-600 hover:bg-orange-700"
            } text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center`}
          >
            {loading ? (
              "Chargement..."
            ) : (
              <>
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Se connecter
              </>
            )}
          </button>
        </form>

        <div className="px-6 py-4 bg-gray-50 text-center">
          <p className="text-sm text-gray-600">
            Pas encore de compte?{" "}
            <Link
              to="/registration"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;