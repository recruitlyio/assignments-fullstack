"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Candidates", href: "/candidate/list" },
];

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 p-4">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          <div className="flex justify-items-center">
            <Image alt="logo" src={"/ai-logo.jpg"} height={50} width={50} />
            <p className="pt-3">AI Interview Generator</p>
          </div>
        </Link>

        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
