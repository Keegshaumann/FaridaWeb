import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ConditionsPage } from "./pages/ConditionsPage";
import { ContactPage } from "./pages/ContactPage";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { AdminPage } from "./pages/AdminPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsAndConditionsPage } from "./pages/TermsAndConditionsPage";
import { ProstheticsPage } from "./pages/services/ProstheticsPage";
import { CustomOrthoticsPage } from "./pages/services/CustomOrthoticsPage";
import { OffTheShelfOrthoticsPage } from "./pages/services/OffTheShelfOrthoticsPage";
import { CompressionPage } from "./pages/services/CompressionPage";
import { MobilityAidsPage } from "./pages/services/MobilityAidsPage";
import { BreastProstheticsPage } from "./pages/services/BreastProstheticsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "services", Component: ServicesPage },
      { path: "conditions", Component: ConditionsPage },
      { path: "contact", Component: ContactPage },
      { path: "case-studies", Component: CaseStudiesPage },
      { path: "services/prosthetics", Component: ProstheticsPage },
      { path: "services/custom-orthotics", Component: CustomOrthoticsPage },
      { path: "services/off-the-shelf-orthotics", Component: OffTheShelfOrthoticsPage },
      { path: "services/compression", Component: CompressionPage },
      { path: "services/mobility-aids", Component: MobilityAidsPage },
      { path: "services/breast-prosthetics", Component: BreastProstheticsPage },
      { path: "privacy-policy", Component: PrivacyPolicyPage },
      { path: "terms-and-conditions", Component: TermsAndConditionsPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
  {
    path: "/admin",
    Component: AdminPage,
  },
]);