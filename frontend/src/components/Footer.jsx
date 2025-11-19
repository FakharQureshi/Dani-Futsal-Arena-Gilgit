export default function Footer() {
  return (
    <footer className="bg-black text-gray-200 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© {new Date().getFullYear()} Dani Sports Arena. All Rights Reserved. Website developed and designed by Fakhar Uddin. Contact via WhatsApp: 0315-1971062</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-green-400">Facebook</a>
          <a href="#" className="hover:text-green-400">Instagram</a>
          <a href="#" className="hover:text-green-400">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
