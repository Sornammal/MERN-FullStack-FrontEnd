function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
