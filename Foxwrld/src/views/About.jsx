import React from "react";
import HamburgerMenu from "../components/Navigation/Hamburger";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";

export default function () {
  return (

    <div className="p-8">
        <Header  color={"black"} />
        <HamburgerMenu color="black"  />
      <div className="about-u__wrapper justify-center">
        <section className="mb-8 mt-32">
          <h1 className="text-6xl font-bold mb-4 text-center">About Foxwrld</h1>
          <p className="fontThin mt-20">
            Welcome to Foxwrld, where enchantment meets elegance in the realm of
            fashion. At Foxwrld, we believe that clothing is an art form, and
            each piece we curate is a masterpiece crafted with passion and
            creativity.
          </p>
        </section>
      </div>

    <div className="mt-10">
    <section className="mb-8">
        <h1 className="text-xl font-bold mb-4">Our Enchanting Vision</h1>
        <p className="fontThin">
          Our vision is to inspire and empower individuals to embrace their unique allure and inner radiance through the enchantment of our designs. At Foxwrld, we strive to create timeless pieces that transcend trends, making every wearer feel captivating and confident.
        </p>
      </section>

      <section className="mb-8">
        <h1 className="text-xl font-bold mb-4">The Art of Elegance</h1>
        <p className="fontThin">
          Elegance is at the heart of everything we do. Our designs are carefully curated to embody the essence of sophistication, combining exquisite craftsmanship and attention to detail. With every stitch and every fabric, we weave stories of elegance that resonate with the discerning fashion connoisseur.
        </p>
      </section>

      <section className="mb-8">
        <h1 className="text-xl font-bold mb-4">A World of Enchantment</h1>
        <p className="fontThin">
          Foxwrld is more than just a fashion brand; it is a world of enchantment. Each collection is meticulously curated to transport you to a realm where elegance reigns supreme, and dreams are woven into reality. Our designs speak a language of charm, leaving an indelible mark on every heart they grace.
        </p>
      </section>

      <section className="mb-8">
        <h1 className="text-xl font-bold mb-4">Craftsmanship and Quality</h1>
        <p className="fontThin">
          We are dedicated to upholding the highest standards of craftsmanship and quality. Every garment that carries the Foxwrld name is an exquisite work of art, created with love and dedication. From the initial sketch to the final stitch, each piece embodies our commitment to perfection.
        </p>
      </section>

      <section className="mb-8">
        <h1 className="text-xl font-bold mb-4">A Magical Journey</h1>
        <p className="fontThin">
          Embark on a magical journey with us as we unveil enchanting collections that celebrate the essence of individuality and allure. Foxwrld is more than just clothing; it is an enchanting experience, a celebration of the beauty that lies within each of us.
        </p>
      </section>

      <section>
        <h1 className="text-xl font-bold mb-4">Enchant the World with Us</h1>
        <p className="fontThin">
          Foxwrld is not just a brand; it is a collective of enchanting souls who believe in the magic of fashion. Together, we invite you to embrace the allure of elegance and embark on an enchanting adventure through the world of Foxwrld.
        </p>
      </section>
    </div>
      <Footer/>
    </div>
  );
}
