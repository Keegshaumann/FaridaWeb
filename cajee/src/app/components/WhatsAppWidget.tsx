import { MessageCircle } from "lucide-react";
import { cn } from "./ui/utils";
import { trackWhatsAppClick } from "./GoogleAnalytics";

export function WhatsAppWidget() {
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=27646520684&text&type=phone_number&app_absent=0";
  const text = "BOOK ASSESSMENT • BOOK ASSESSMENT • ";

  const handleClick = () => {
    trackWhatsAppClick();
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      aria-label="Book Assessment"
      onClick={handleClick}
    >
      <div className="border-2 p-1 rounded-full border-dotted border-[#25D366]">
        <button
          className="relative w-[100px] h-[100px] rounded-full overflow-hidden p-0 grid place-content-center bg-[#25D366] hover:bg-[#20BA5A] transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <p
            className="absolute inset-0 text-white text-[10px] font-semibold rotating-text"
            style={{
              animation: "text-rotation 8s linear infinite",
              position: "absolute",
              inset: 0,
            }}
          >
            {Array.from(text).map((char, i) => (
              <span
                key={i}
                style={{ 
                  position: "absolute",
                  inset: "6px",
                  transform: `rotate(${(360 / text.length) * i}deg)`,
                  transformOrigin: "50% 50%",
                  userSelect: "none",
                  display: "inline-block",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>

          <div className="relative w-[50px] h-[50px] rounded-full text-[#25D366] bg-[#F5E8F3] flex items-center justify-center overflow-hidden">
            <MessageCircle 
              className="absolute w-7 h-7 transition-transform duration-300 ease-in-out whatsapp-icon-first"
              style={{ transform: "translate(0, 0)" }}
            />
            <MessageCircle 
              className="absolute w-7 h-7 transition-transform duration-300 ease-in-out whatsapp-icon-second"
              style={{ transform: "translate(-150%, 150%)" }}
            />
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes text-rotation {
              to {
                rotate: 360deg;
              }
            }
            .rotating-text {
              animation: text-rotation 8s linear infinite;
            }
            button:hover .whatsapp-icon-first {
              transform: translate(150%, -150%) !important;
            }
            button:hover .whatsapp-icon-second {
              transform: translate(0) !important;
              transition-delay: 0.1s;
            }
          `}} />
        </button>
      </div>
    </a>
  );
}