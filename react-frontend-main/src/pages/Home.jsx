import React from "react";
import homeImage from "../resources/images/homeImage.jpg";

const Home = () => {
  return (
    <div className="min-h-screen text-gray-800">
      <header className="p-4 text-center">
        <h1 className="text-3xl font-bold">ATTIJARI OPCVM</h1>
      </header>
      <main className="p-4 md:p-8">
        <section className="relative bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-2xl shadow-xl mx-auto max-w-6xl">
          {/* Responsive image with proper sizing */}
          <div className="overflow-hidden rounded-md mb-6">
            <img
              src={homeImage}
              alt="Attijari OPCVM Services"
              className="w-full h-auto max-h-[60vh] object-cover object-center transition-all duration-300 hover:scale-105"
            />
          </div>

          {/* Professional OPCVM description */}
          <div className="text-center space-y-4">
            <p className="text-lg md:text-xl leading-relaxed font-semibold">
              OPCVM, filiale du Groupe Attijariwafa bank, est un acteur majeur
              dans la gestion d'organismes de placement collectif en valeurs
              mobilières en Maroc. Nous offrons à nos clients une gamme
              diversifiée de fonds d'investissement adaptés à tous les profils
              d'investisseurs.
            </p>
            <p className="text-lg md:text-xl leading-relaxed font-semibold">
              Notre expertise couvre la gestion de fonds actions, obligataires,
              monétaires et diversifiés, avec une approche rigoureuse de gestion
              des risques et une recherche constante de performance pour nos
              souscripteurs.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-orange-600 font-medium">
              Votre réussite financière est notre engagement quotidien.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
