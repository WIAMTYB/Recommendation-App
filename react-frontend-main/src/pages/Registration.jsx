// src/pages/Registration.jsx
import { useState } from "react"; // Importing useState hook from React
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importing FontAwesomeIcon for icons
import {
  faUser,
  faLock,
  faEnvelope,
  faUserPlus,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons"; // Importing icons
import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate for routing
import clientService from "../api/clients/clientService"; // Importing clientService for API calls

const Registration = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: "",
    nom: "",
    password: "",
    confirmPassword: "",
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
    setError(""); // Clear any previous error messages

    // Validate that passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas"); // Set error if passwords do not match
      return; // Exit the function
    }

    setLoading(true); // Set loading state to true

    try {
      // Prepare the registration data according to your backend expectations
      const registrationData = {
        email: formData.email,
        nom: formData.nom,
        password: formData.password,
      };

      // Call the register function from clientService
      const response = await clientService.register(registrationData);

      
      try {
        await clientService.login(formData.email, formData.password); 
        navigate("/select");
      } catch (loginError) {
        console.err(loginError);
        // Registration succeeded but auto-login failed
        navigate("/login"); // Navigate to the login page if auto-login fails
      }
    } catch (err) {
      console.error("Registration failed:", err); // Log the error to the console
      setError(
        err || "Échec de l'inscription. Veuillez vérifier les données saisies."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 to-orange-200">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-orange-900 py-4 px-6">
          <h2 className="text-2xl font-bold text-white text-center">
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Créer un compte
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
                icon={faEnvelope}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Adresse email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Nom d'utilisateur"
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
                type={isChecked ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <FontAwesomeIcon
                icon={isChecked ? faEye : faEyeSlash}
                //onClick={handlePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
              />
            </div>

            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type={isChecked ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmer le mot de passe"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <FontAwesomeIcon
                icon={isChecked ? faEye : faEyeSlash}
                //onClick={handlePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
              />
            </div>
          </div>
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

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              J'accepte les{" "}
              <Link
                to="/terms"
                className="text-orange-600 hover:text-orange-500"
              >
                conditions d'utilisation
              </Link>
            </label>
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
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                S'inscrire
              </>
            )}
          </button>
        </form>

        <div className="px-6 py-4 bg-gray-50 text-center">
          <p className="text-sm text-gray-600">
            Déjà un compte?{" "}
            <Link
              to="/login"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
