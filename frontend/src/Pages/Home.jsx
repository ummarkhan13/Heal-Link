import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
  const handleBookAppointment = () => {
    navigate('/doctors');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-96 w-full">
          <div
            className="absolute top-0 left-0 h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("https://picsum.photos/2000/1000")', opacity: 0.5 }}
          />
          <button className="absolute bottom-8 left-12 bg-transparent border-2 border-indigo-600 text-indigo-600 py-3 px-10 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-1xl" onClick={handleBookAppointment}>
            {/*here i need to handle navigation */}
            <b>Book Appointment</b>
          </button>
        </div>

        <div className="p-6">
          <h1 className="text-4xl font-semibold text-center text-gray-800">Your Health, Our Priority</h1>
          <p className="mt-4 text-center text-lg text-gray-600">
            Our team of experts are dedicated to providing you with the best medical care.
          </p>

          <div className="mt-10 space-y-8">
            {/* Our Services Section */}
            <section className="relative bg-cover bg-center bg-no-repeat rounded-lg h-80" style={{ backgroundImage: 'url("https://picsum.photos/2000/1200")' }}>
              <div className="absolute inset-0 bg-black opacity-40"></div> {/* Overlay for blur effect */}
              <div className="relative z-10 text-center text-white p-6">
                <h2 className="text-3xl font-semibold">Our Services</h2>
                <p className="mt-2 text-lg">We provide a variety of medical services aimed at promoting health and well-being:</p>
                <p className="mt-4">Our general health checkups are designed to help you stay on top of your overall health.</p>
                <p className="mt-4">Our pediatric care ensures that children receive the best care at every stage of their development.</p>
                <p className="mt-4">Women’s health is a key focus, with specialized services in gynecology and prenatal care.</p>
                <p className="mt-4">We offer a wide range of dental services, from routine checkups to advanced procedures.</p>
              </div>
            </section>

            {/* Meet Our Doctors Section */}
            <section className="relative bg-cover bg-center bg-no-repeat rounded-lg h-80" style={{ backgroundImage: 'url("https://picsum.photos/2000/800")' }}>
              <div className="absolute inset-0 bg-black opacity-40"></div> {/* Overlay for blur effect */}
              <div className="relative z-10 text-center text-white p-6">
                <h2 className="text-3xl font-semibold">Meet Our Doctors</h2>
                <p className="mt-2 text-lg">Our doctors are experts in their fields, committed to providing you with the highest quality care:</p>
                <p className="mt-4">Dr. John Doe specializes in cardiology, helping patients manage heart conditions with personalized care.</p>
                <p className="mt-4">Dr. Jane Smith is a pediatrician who focuses on the health and well-being of children, from infants to teenagers.</p>
                <p className="mt-4">Dr. Emily Brown offers comprehensive gynecological services, supporting women through every stage of life.</p>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="relative bg-cover bg-center bg-no-repeat rounded-lg h-80" style={{ backgroundImage: 'url("https://picsum.photos/2000/1100")' }}>
              <div className="absolute inset-0 bg-black opacity-40"></div> {/* Overlay for blur effect */}
              <div className="relative z-10 text-center text-white p-6">
                <h2 className="text-3xl font-semibold">Testimonials</h2>
                <p className="mt-2 text-lg">Hear from our satisfied patients who trust us with their health:</p>
                <p className="mt-4">"The team here made my health checkup process easy and stress-free. I feel great knowing I’m in good hands!" - Sarah J.</p>
                <p className="mt-4">"My child has been a patient of Dr. Smith for years. She’s the best pediatrician we've ever had." - Mark R.</p>
                <p className="mt-4">"Dr. Brown was wonderful during my pregnancy. She answered all my questions and made me feel comfortable." - Jessica T.</p>
              </div>
            </section>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Home;
