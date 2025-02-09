import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  MessageSquare,
  Phone,
  Map,
  CheckCircle,
} from "lucide-react";

const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      text: "+38970349220",
      href: "tel:+38970349220",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      text: "davcevs@gmail.com",
      href: "mailto:davcevs@gmail.com",
    },
    {
      icon: <Map className="h-5 w-5" />,
      text: "Skopje, Macedonia",
      href: "https://maps.google.com",
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="h-6 w-6" />,
      href: "https://github.com/davcevs",
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      href: "https://www.linkedin.com/in/stefan-davcev-b39145307/",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {contactInfo.map((info, index) => (
          <motion.a
            href={info.href}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 p-4 rounded-lg flex items-center gap-3 hover:bg-white/20 transition-colors"
          >
            <div className="p-2 bg-white/10 rounded-full">{info.icon}</div>
            <span>{info.text}</span>
          </motion.a>
        ))}
      </div>

      {/* Contact Form */}
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        className="bg-white/10 rounded-lg p-6 backdrop-blur-md relative overflow-hidden"
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Get in Touch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <input
          type="text"
          placeholder="Subject"
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full h-32 bg-white/5 border border-white/10 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          required
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
          type="submit"
        >
          <Send className="h-4 w-4" />
          Send Message
        </motion.button>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isSubmitted ? 1 : 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
          style={{ pointerEvents: isSubmitted ? "auto" : "none" }}
        >
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <p className="text-lg font-medium">Message Sent Successfully!</p>
          </div>
        </motion.div>
      </motion.form>

      {/* Social Links */}
      <div className="flex justify-center gap-4">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default ContactContent;
