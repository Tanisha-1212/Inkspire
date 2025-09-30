import React from 'react'

const Footer = () => {
  return (
    <footer className="py-6 bg-black border-t border-green-400 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Inkspire. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-6">
          <a href="#" className="hover:text-green-400">About</a>
          <a href="#" className="hover:text-green-400">Contact</a>
          <a href="#" className="hover:text-green-400">Privacy Policy</a>
        </div>
      </footer>
  )
}

export default Footer