import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const CertificationsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default CertificationsLayout;
