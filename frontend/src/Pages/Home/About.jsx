import React from "react";
import { motion } from "framer-motion";
import img from "../../assets/images/about.gif";
import img2 from "../../assets/gif/responsive.gif";
import userImg from "../../assets/gif/user.gif";

export default function About() {
  return (
    <div className="w-full px-4 md:px-8 lg:px-20 py-10 text-primary">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-16"
      >
        {/* Section 1 */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full lg:w-1/2"
          >
            <img
              className="w-full max-w-sm mx-auto lg:mx-0 rounded-3xl object-cover"
              src={img}
              alt="Team"
            />
          </motion.div>

          <div className="flex flex-col gap-4 w-full lg:w-1/2 text-center lg:text-left ">
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-serif text-base md:text-lg text-justify"
            >
              <span className="font-light text-xl ">Jaga Deal</span>{" "}
              <span>
                Real-Estate is a company that reflects the same values as its
                product—carefully crafted, not hastily assembled. We believe in
                delivering a seamless, delightful experience to every client,
                whether they’re buying, selling, or investing. Our culture
                thrives on creativity, collaboration, and a deep commitment to
                quality. Like our properties, our team is built with intention,
                combining expertise and passion to exceed expectations. Every
                interaction is designed to feel personal, professional, and
                polished. At Jaga Deal, we don’t just build real estate—we build
                trust, relationships, and lasting impressions that make every
                deal feel like the right one.
              </span>
            </motion.p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full lg:w-1/2"
          >
            {/* {aaa} */}
            <motion.h1
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-2xl md:text-3xl font-semibold text-center lg:text-left"
            >
              Our mission: In real estate is to turn dreams into tangible
              realities.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-base font-serif text-justify"
            >
              Our mission in real estate is to transform dreams into reality by
              providing exceptional service and building lasting relationships.
              We believe growth isn’t just about getting bigger — it’s about
              getting better. True success comes from aligning our goals with
              the goals of our clients, ensuring that when they win, we win too.
              By focusing on trust, transparency, and long-term value, we aim to
              create a positive impact in every transaction. Our commitment is
              to help clients achieve their dreams while growing together in a
              way that benefits everyone involved. That’s the heart of
              everything we do. Win-win!
            </motion.p>
          </motion.div>

          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <img
              className="w-full max-w-sm mx-auto lg:mx-0 rounded-3xl object-cover text-primary"
              src={img2}
              alt="Real Estate"
            />
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <img
              className="w-full max-w-sm mx-auto lg:mx-0 rounded-3xl object-cover text-primary"
              src={userImg}
              alt="Community"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="w-full lg:w-1/2"
          >
            {/* {as} */}
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-2xl md:text-3xl font-semibold text-center lg:text-left"
            >
              Our Story of Building Dreams and Transforming Communities
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-base font-serif text-justify"
            >
              Our story in real estate begins with a passion for creating spaces
              that inspire, nurture, and thrive. It's a tale woven with threads
              of dedication, innovation, and a deep understanding of the
              profound impact that properties have on people's lives. Like many
              great stories, ours started with a vision—a vision to redefine
              what real estate means to individuals and communities alike. From
              the outset, we set out on a mission to not just sell properties,
              but to craft experiences, fulfill dreams, and shape the very
              fabric of neighborhoods.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
