import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes, X, Download, Eye, Video, Network, Brush, Camera } from "lucide-react";

const projectCategories = [
  {
    key: "video",
    label: "Video Production",
    icon: Video,
    items: [
      {
        id: 1,
        Img: "https://img.youtube.com/vi/vgJq6qONv-4/hqdefault.jpg",
        Title: "Sejarah Penculikan di Rengasdengklok",
        Description: "Project sejarah tentang peristiwa penculikan di Rengasdengklok.",
        Link: "https://youtu.be/vgJq6qONv-4?si=0N6hB5yP1FBlekd0",
        Github: "Private",
      },
      {
        id: 2,
        Img: "https://img.youtube.com/vi/6hqtq05A9Ac/hqdefault.jpg",
        Title: "Matematika Peluang Kombinasi",
        Description: "Project matematika tentang peluang kombinasi.",
        Link: "https://youtu.be/6hqtq05A9Ac?si=LO4uJ331D9NZvGRp",
        Github: "Private",
      },
      {
        id: 3,
        Img: "https://img.youtube.com/vi/ZnRdT0wYIoI/hqdefault.jpg",
        Title: "Hak dan Kewajiban Sebagai Warga Sekolah",
        Description: "Project Pendidikan Pancasila tentang hak dan kewajiban sebagai warga sekolah.",
        Link: "https://youtu.be/ZnRdT0wYIoI?si=Qupzbke3JfE1mMVl",
        Github: "Private",
      },
      {
        id: 4,
        Img: "https://img.youtube.com/vi/f7uKq_xRda4/hqdefault.jpg",
        Title: "Last Result Sejarah Nyanyi",
        Description: "Project sejarah dengan format lagu.",
        Link: "https://youtu.be/f7uKq_xRda4?si=QW5yfcotohyyFrDr",
        Github: "Private",
      },
      {
        id: 5,
        Img: "https://img.youtube.com/vi/-lQmptVMiIQ/hqdefault.jpg",
        Title: "Drama BK Tentang Bullying",
        Description: "Tugas drama Bimbingan Konseling tentang isu bullying.",
        Link: "https://youtu.be/-lQmptVMiIQ?si=6iKmlLNdfK_qCWiS",
        Github: "Private",
      },
    ],
  },
  {
    key: "network",
    label: "Network Design",
    icon: Network,
    items: [
       {
id: 101,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-images/Cisco%20ASA%20Firewall%20Basic%20Configuration%20.png",
        Title: "Cisco ASA Firewall Basic Configuration",
        Description: "Konfigurasi dasar firewall menggunakan Cisco ASA untuk mengamankan jaringan dari akses tidak sah.",
        FileUrl: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-files/Cisco%20ASA%20Firewall%20Basic%20Configuration.pkt",
        Github: "",
        TechStack: ["Cisco Packet Tracer"],
        Features: ["Konfigurasi Firewall ASA", "Access Control List (ACL)", "Keamanan Jaringan Dasar"],
      },
      {
        id: 102,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-images/KONFIGURASI%20DINAMIS%20RIP%20CISCO%20.png",
        Title: "Konfigurasi Dinamis RIP Cisco",
        Description: "Implementasi routing dinamis menggunakan protokol RIP (Routing Information Protocol) pada beberapa router Cisco.",
        FileUrl: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-files/KONFIGURASI%20DINAMIS%20RIP%20CISCO%20.pkt",
        Github: "",
        TechStack: ["Cisco Packet Tracer"],
        Features: ["Routing Information Protocol (RIP)", "Dynamic Routing", "Multi-Router Topology"],
      },
      {
        id: 103,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-images/KONFIGURASI%20FIREWALL.png",
        Title: "Konfigurasi Firewall",
        Description: "Pengaturan firewall pada perangkat jaringan untuk mengontrol akses traffic masuk dan keluar.",
        FileUrl: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-files/KONFIGURASI%20FIREWALL.pkt",
        Github: "",
        TechStack: ["Cisco Packet Tracer"],
        Features: ["Firewall Rules", "Traffic Filtering", "Network Security"],
      },
      {
        id: 104,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-images/KONFIGURASI%20ROUTING%20STATIC%20.png",
        Title: "Konfigurasi Routing Static",
        Description: "Implementasi routing static sederhana untuk menghubungkan beberapa jaringan secara manual menggunakan command line.",
        FileUrl: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-files/KONFIGURASI%20ROUTING%20STATIC.pkt",
        Github: "",
        TechStack: ["Cisco Packet Tracer"],
        Features: ["Static Routing", "Command Line Interface (CLI)", "Manual Network Configuration"],
      },
      {
        id: 105,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-images/KONFIGURASI%20ROUTING%20STATIC%203%20ROUTER.png",
        Title: "Konfigurasi Routing Static 3 Router",
        Description: "Implementasi routing static yang menghubungkan 3 router sekaligus dalam satu topologi jaringan.",
        FileUrl: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-files/KONFIGURASI%20ROUTING%20STATIC%203%20ROUTER.pkt",
        Github: "",
        TechStack: ["Cisco Packet Tracer"],
        Features: ["Static Routing", "Multi-Router Topology (3 Router)", "Network Segmentation"],
      },
      {
        id: 106,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-images/MENERAPKAN%20OSI%20LAYER%20PADA%20CISCO%20PACKET%20TRACER%20.png",
        Title: "Menerapkan OSI Layer pada Cisco Packet Tracer",
        Description: "Simulasi penerapan konsep 7 layer OSI dalam membangun dan menganalisis komunikasi jaringan.",
        FileUrl: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-files/MENERAPKAN%20OSI%20LAYER%20PADA%20CISCO%20PACKET%20TRACER.pkt",
        Github: "",
        TechStack: ["Cisco Packet Tracer"],
        Features: ["OSI 7 Layer Model", "Network Communication Analysis", "Protocol Simulation"],
      },
      {
        id: 107,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-images/SETTING%20DAN%20KONFIGURASI%20JARINGAN%20KOMUNIKASI%20VOIP%20DENGAN%203%20ROUTER.png",
        Title: "Setting dan Konfigurasi Jaringan Komunikasi VoIP",
        Description: "Konfigurasi jaringan untuk mendukung komunikasi suara (VoIP) menggunakan 3 router pada Cisco Packet Tracer.",
        FileUrl: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-files/setting%20dan%20konfigurasi%20jaringan%20komunikasi%20voip%20dengan%203%20router.pkt",
        Github: "",
        TechStack: ["Cisco Packet Tracer"],
        Features: ["Voice over IP (VoIP)", "IP Phone Configuration", "Multi-Router Communication"],
      },
      {
        id: 108,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-images/SETTING%20ROUTING%20DI%20CISCO%20MENGGUNAKAN%20CLI.png",
        Title: "Setting Routing di Cisco Menggunakan CLI",
        Description: "Praktik konfigurasi routing menggunakan Command Line Interface (CLI) pada perangkat Cisco.",
        FileUrl: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-files/setting%20routing%20static%20di%20cisco%20packet%20tracer%20menggunakan%20CLI.pkt",
        Github: "",
        TechStack: ["Cisco Packet Tracer"],
        Features: ["Command Line Interface (CLI)", "Static Routing", "Router Configuration"],
      },
      {
        id: 109,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-images/SIMULASI%20RT%20RW%20CISCO.png",
        Title: "Simulasi RT RW",
        Description: "Simulasi topologi jaringan skala RT/RW menggunakan Cisco Packet Tracer.",
        FileUrl: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/network-files/SIMULASI%20RT%20RW%20.pkt",
        Github: "",
        TechStack: ["Cisco Packet Tracer"],
        Features: ["Network Topology Design", "RT/RW Scale Simulation", "IP Address Planning"],
      },
    ],
  },
  {
    key: "art",
    label: "Scribble Art",
    icon: Brush,
    items: [
      {
        id: 201,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/art-images/gambar%201%20_1.jpg",
        Title: "You",
        Description: "Eksplorasi sosok dengan tatapan tajam, dikelilingi figur bertudung; bermain dengan perspektif pengamat dan yang diamati.",
        Link: "",
        Github: "",
        TechStack: ["Pen & Ink", "Scribble Technique"],
        Features: ["Gestural Drawing", "Layered Linework", "Expressive Portrait"],
      },
      {
        id: 202,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/art-images/gambar%202_1.jpg",
        Title: "Whisper",
        Description: "Studi wajah dengan garis berlapis dan aksen merah, menangkap ketegangan dalam diam.",
        Link: "",
        Github: "",
        TechStack: ["Pen & Ink", "Scribble Technique"],
        Features: ["Layered Linework", "Color Accent", "Emotional Study"],
      },
      {
        id: 203,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/art-images/gambar%203_1.jpg",
        Title: "Anchor",
        Description: "Figur yang menunduk di tengah ledakan garis liar, mencari titik tenang di tengah kekacauan.",
        Link: "",
        Github: "",
        TechStack: ["Pen & Ink", "Scribble Technique"],
        Features: ["Gestural Drawing", "Negative Space", "Figure Study"],
      },
      {
        id: 204,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/art-images/gambar%204_1.jpg",
        Title: "Crowd",
        Description: "Sosok tunggal tanpa wajah di tengah kerumunan mata yang menatap, tentang ruang dan keberadaan.",
        Link: "",
        Github: "",
        TechStack: ["Pen & Ink", "Scribble Technique"],
        Features: ["Composition Study", "Repetition", "Symbolic Drawing"],
      },
      {
        id: 205,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/art-images/gambar%205_1.jpg",
        Title: "Bloom",
        Description: "Studi bentuk kepala dengan garis yang menjulang seperti mahkota, eksplorasi tekstur dan gerakan.",
        Link: "",
        Github: "",
        TechStack: ["Pen & Ink", "Scribble Technique"],
        Features: ["Texture Study", "Dynamic Linework", "Abstract Form"],
      },
      {
        id: 206,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/art-images/gambar%206_1.jpg",
        Title: "Roots",
        Description: "Bentuk organik menyerupai akar dengan mahkota merah di puncaknya, tentang pertumbuhan dari bawah ke atas.",
        Link: "",
        Github: "",
        TechStack: ["Pen & Ink", "Scribble Technique"],
        Features: ["Organic Form", "Color Contrast", "Symbolic Drawing"],
      },
      {
        id: 207,
        Img: "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/art-images/gambar%207_1.jpg",
        Title: "Echo",
        Description: "Sosok besar diawasi wajah-wajah kecil yang melayang, tentang suara yang nggak terdengar.",
        Link: "",
        Github: "",
        TechStack: ["Pen & Ink", "Scribble Technique"],
        Features: ["Scale Contrast", "Surreal Composition", "Symbolic Drawing"],
      },
    ],
  },
  {
    key: "photo",
    label: "Photography",
    icon: Camera,
    items: [],
  },
];

const certificates = [
  {
    id: 1,
    title: "Sertifikat Pelatihan Fundamental",
    subtitle: "Associate Computer Network Technician - DTA Komdigi, 4-8 April 2026",
    pages: [
      "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/certificate-images/Document%20from%20Esa%20Kenzie%20Galaksi%20Putra%20(1)-1.png",
      "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/certificate-images/Document%20from%20Esa%20Kenzie%20Galaksi%20Putra%20(1)-2.png",
    ],
  },
  {
    id: 2,
    title: "Sertifikat Pelatihan Intermediate",
    subtitle: "Associate Computer Network Technician - DTA Komdigi, 30 Maret - 18 April 2026",
    pages: [
      "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/certificate-images/Document%20from%20Esa%20Kenzie%20Galaksi%20Putra%20(2)-1.png",
      "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/certificate-images/Document%20from%20Esa%20Kenzie%20Galaksi%20Putra%20(2)-2.png",
    ],
  },
  {
    id: 3,
    title: "Certificate of Appreciation",
    subtitle: "Guest Lecture 2026: IoT & Digital Transformation - President University, 16 April 2026",
    pages: [
      "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/certificate-images/Document%20from%20Esa%20Kenzie%20Galaksi%20Putra-1.png",
    ],
  },
  {
    id: 4,
    title: "Juara Umum",
    subtitle: "Lomba Kompetensi dan Kreativitas Pramuka Penggalang Ke-12 (LKKP-XII) Se-Kabupaten Bekasi, 19 November 2022",
    pages: [
      "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/certificate-images/juara%20umum_1.jpg",
    ],
  },
  {
    id: 5,
    title: "Juara 1 Lomba Kreto",
    subtitle: "Lomba Kompetensi dan Kreativitas Pramuka Penggalang Ke-12 (LKKP-XII) Se-Kabupaten Bekasi, 19 November 2022",
    pages: [
      "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/certificate-images/lomba%20kreto%20_1.jpg",
    ],
  },
  {
    id: 6,
    title: "Juara Harapan 1 Maket Pionering",
    subtitle: "Gebyar XI Lomba Pramuka Tingkat SD/MI, SMP/MTs, SMA Se-Pulau Jawa Plus, Gudep Kota Bekasi, 4 November 2023",
    pages: [
      "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/certificate-images/serti%20maket_1.jpg",
    ],
  },
  {
    id: 7,
    title: "Harapan 1 LKBBT",
    subtitle: "Pusara Competition III Perlombaan Unjuk Kreasi Pramuka, Se-Kabupaten Bekasi, Oktober 2023",
    pages: [
      "https://tuwtizpvlztsrvspzjrp.supabase.co/storage/v1/object/public/certificate-images/serti%20pusaka%20lkkbt_1.jpg",
    ],
  },
  ];  

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={`transition-transform duration-300 ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}`}>
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

const CategoryButton = ({ category, isActive, onClick }) => {
  const Icon = category.icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
        isActive
          ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-purple-500/50 text-white shadow-lg shadow-purple-500/10"
          : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20"
      }`}
    >
      <Icon className="w-4 h-4" />
      {category.label}
      <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-white/10"}`}>
        {category.items.length}
      </span>
    </button>
  );
};

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const CertificateCard = ({ certificate, onOpen }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg shadow-2xl cursor-pointer transition-all duration-300 hover:shadow-purple-500/20 hover:border-purple-500/40 hover:-translate-y-1"
      onClick={() => onOpen(certificate)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
      <div className="relative p-4 z-10">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={certificate.pages[0]}
            alt={certificate.title}
            className="w-full object-cover aspect-[16/11] transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 text-white font-medium text-sm bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20">
              <Eye className="w-4 h-4" />
              Preview
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
            {certificate.title}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{certificate.subtitle}</p>
          {certificate.pages.length > 1 && (
            <p className="text-purple-400 text-xs">{certificate.pages.length} halaman</p>
          )}
        </div>
      </div>
    </div>
  );
};

const CertificateModal = ({ certificate, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!certificate) return;
    setCurrentPage(0);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, [certificate]);

  const handleDownload = (url, index) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${certificate.title}-halaman-${index + 1}.png`;
    link.target = "_blank";
    link.click();
  };

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn"
      style={{ backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(5px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-white/10 shadow-2xl flex flex-col animate-scaleIn"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
          <div>
            <h3 className="text-white font-semibold text-base">{certificate.title}</h3>
            <p className="text-gray-400 text-xs mt-0.5">{certificate.subtitle}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {certificate.pages.length > 1 && (
          <div className="flex gap-2 px-4 pt-3 flex-shrink-0">
            {certificate.pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${
                  currentPage === i
                    ? "bg-purple-600 border-purple-500 text-white"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                Halaman {i + 1}
              </button>
            ))}
          </div>
        )}

        <div className="overflow-y-auto flex-1 p-4">
          <img
            src={certificate.pages[currentPage]}
            alt={`${certificate.title} halaman ${currentPage + 1}`}
            className="w-full rounded-xl border border-white/10"
          />
        </div>

        <div className="p-4 border-t border-white/10 flex gap-3 flex-wrap flex-shrink-0">
          {certificate.pages.length > 1 ? (
            certificate.pages.map((url, i) => (
              <button key={i} onClick={() => handleDownload(url, i)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/40 hover:to-purple-600/40 text-blue-300 hover:text-white border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 text-sm font-medium">
                <Download className="w-4 h-4" />
                Download Halaman {i + 1}
              </button>
            ))
          ) : (
            <button onClick={() => handleDownload(certificate.pages[0], 0)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/40 hover:to-purple-600/40 text-blue-300 hover:text-white border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 text-sm font-medium">
              <Download className="w-4 h-4" />
              Download Sertifikat
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [activeCategory, setActiveCategory] = useState(() => {
    return localStorage.getItem("activeCategory") || null;
  });
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  const allProjects = projectCategories.flatMap((cat) => cat.items);

  useEffect(() => {
    AOS.init({ once: false });
    localStorage.setItem("projects", JSON.stringify(allProjects));

    if (window.location.hash === "#Portofolio") {
      setTimeout(() => {
        const el = document.getElementById("Portofolio");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  const currentCategory = projectCategories.find((cat) => cat.key === activeCategory);
  const currentProjects = currentCategory ? currentCategory.items : [];
  const displayedProjects = showAllProjects ? currentProjects : currentProjects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#2563eb]">
          <span style={{
            color: "#0ea5e9",
            backgroundImage: "linear-gradient(45deg, #0ea5e9 10%, #2563eb 93%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise.
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar position="static" elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": { color: "#ffffff", backgroundColor: "rgba(139, 92, 246, 0.1)", transform: "translateY(-2px)" },
                "&.Mui-selected": { color: "#fff", background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))", boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)" },
              },
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: "8px" },
            }}
          >
            <Tab icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />} label="Projects" {...a11yProps(0)} />
            <Tab icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />} label="Certificates" {...a11yProps(1)} />
            <Tab icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />} label="Tech Stack" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
  {activeCategory === null ? (
    // Tampilan pilihan kategori
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-4">
      {projectCategories.map((cat, index) => {
        const Icon = cat.icon;
        return (
          <button
            key={cat.key}
            onClick={() => {
              setActiveCategory(cat.key);
              localStorage.setItem("activeCategory", cat.key);
            }}
            data-aos="fade-up"
            data-aos-duration={800 + index * 100}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg p-8 text-left transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <Icon className="w-8 h-8 text-purple-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">{cat.label}</h3>
                <p className="text-gray-400 text-sm">{cat.items.length} project</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  ) : (
    // Tampilan grid project di kategori terpilih
    <div>
      <button
        onClick={() => {
          setActiveCategory(null);
          setShowAllProjects(false);
          localStorage.removeItem("activeCategory");
        }}
        className="mb-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300 text-sm font-medium"
      >
        ← Back to Categories
      </button>

      <div className="container mx-auto flex justify-center items-center overflow-hidden">
        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedProjects.map((project, index) => (
              <div key={project.id}
                data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}>
                <CardProject Img={project.Img} Title={project.Title} Description={project.Description} Link={project.Link} id={project.id} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center w-full">
            <p className="text-gray-400 text-lg">Coming Soon</p>
            <p className="text-gray-500 text-sm mt-2">Project untuk kategori ini sedang disiapkan.</p>
          </div>
        )}
      </div>
      {currentProjects.length > initialItems && (
        <div className="mt-6 w-full flex justify-start">
          <ToggleButton onClick={() => toggleShowMore("projects")} isShowingMore={showAllProjects} />
        </div>
      )}
    </div>
  )}
</TabPanel>

        <TabPanel value={value} index={1}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
              {displayedCertificates.map((certificate, index) => (
                <div key={certificate.id}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}>
                  <CertificateCard certificate={certificate} onOpen={setSelectedCertificate} />
                </div>
              ))}
            </div>
          </div>
          {certificates.length > initialItems && (
            <div className="mt-6 w-full flex justify-start">
              <ToggleButton onClick={() => toggleShowMore("certificates")} isShowingMore={showAllCertificates} />
            </div>
          )}
          <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
              {techStacks.map((stack, index) => (
                <div key={index}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}>
                  <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}