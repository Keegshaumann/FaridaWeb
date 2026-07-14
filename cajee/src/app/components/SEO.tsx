import { useEffect } from 'react';
import { useLocation } from 'react-router';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  schema?: object;
  /** Overrides the auto-composed "<title> | Cajee Botes…" when set (used to keep titles within 50–60 chars). */
  fullTitle?: string;
  /** Ask crawlers not to index this page (404, thin utility pages). */
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  keywords = '',
  ogImage = 'https://www.cajeebotes.com/og-image.jpg',
  canonicalUrl,
  schema,
  fullTitle: fullTitleProp,
  noindex = false,
}: SEOProps) {
  const location = useLocation();
  const baseUrl = 'https://www.cajeebotes.com';
  const fullUrl = canonicalUrl || `${baseUrl}${location.pathname}`;
  const fullTitle = fullTitleProp || `${title} | Cajee Botes Orthotist & Prosthetist`;

  useEffect(() => {
    // Set document title
    document.title = fullTitle;

    // Set or update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    setMetaTag('description', description);
    if (keywords) setMetaTag('keywords', keywords);
    setMetaTag('author', 'Cajee Botes Orthotist Prosthetist');
    setMetaTag('robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    setMetaTag('googlebot', noindex ? 'noindex, follow' : 'index, follow');
    
    // Open Graph meta tags
    setMetaTag('og:title', fullTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', fullUrl, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:site_name', 'Cajee Botes Orthotist & Prosthetist', true);
    setMetaTag('og:locale', 'en_ZA', true);

    // Twitter Card meta tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    // Geographic meta tags
    setMetaTag('geo.region', 'ZA');
    setMetaTag('geo.placename', 'South Africa');

    // Business meta tags
    setMetaTag('contact', '+27646520684');

    // Set canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // Add schema.org structured data
    if (schema) {
      let schemaScript = document.querySelector('script#page-schema');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.setAttribute('id', 'page-schema');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    }

    // Add global organization schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'MedicalBusiness',
      name: 'Cajee Botes Orthotist Prosthetist',
      image: ogImage,
      description: 'Professional orthotics and prosthetics services in South Africa with mobile home and hospital assessments',
      telephone: '+27646520684',
      email: 'care@cajeebotes.com',
      url: baseUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Centurion',
        addressRegion: 'Gauteng',
        addressCountry: 'ZA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -25.8603,
        longitude: 28.1894,
      },
      founder: {
        '@type': 'Person',
        name: 'Farida Cajee-Botes',
        jobTitle: 'Orthotist & Prosthetist',
      },
      sameAs: [
        'https://www.instagram.com/faridabotes/',
        'https://www.facebook.com/Cajeebotes/',
        'https://g.page/r/CRVd5g59XrdmEAI',
      ],
      openingHours: 'Mo-Fr 08:00-17:00',
      priceRange: '$$',
      medicalSpecialty: ['Orthotics', 'Prosthetics'],
      areaServed: {
        '@type': 'Country',
        name: 'South Africa',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Orthotic and Prosthetic Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom Orthotics',
              description: 'Individually designed orthotic devices',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Prosthetic Management',
              description: 'Prosthetic limb fitting and care',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Medical Compression',
              description: 'Compression garments for lymphedema and edema',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Off-the-Shelf Orthotics',
              description: 'Prefabricated orthotic braces and supports',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Mobility Aids',
              description: 'Wheelchairs, walkers, crutches and walking aids',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Breast & Silicone Prosthetics',
              description: 'Breast prostheses and silicone restoration',
            },
          },
        ],
      },
    };

    let orgSchemaScript = document.querySelector('script#organization-schema');
    if (!orgSchemaScript) {
      orgSchemaScript = document.createElement('script');
      orgSchemaScript.setAttribute('type', 'application/ld+json');
      orgSchemaScript.setAttribute('id', 'organization-schema');
      document.head.appendChild(orgSchemaScript);
    }
    orgSchemaScript.textContent = JSON.stringify(organizationSchema);

  }, [fullTitle, title, description, keywords, ogImage, fullUrl, schema, noindex]);

  return null;
}
