

const Footer = () => {
  return (
    <footer className="bg-gray-600 bg-opacity-75 text-white text-center p-2 mt-auto lg:sticky lg:bottom-0">
      <p className="text-sm sm:text-base">
        © {new Date().getFullYear()} All rights reserved to Garen | This project is for DCI Institute
      </p>
    </footer>
  );
};

export default Footer;
