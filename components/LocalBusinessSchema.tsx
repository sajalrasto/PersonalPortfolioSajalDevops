import React from 'react';

const LocalBusinessSchema: React.FC = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://sajalrastogi.com/#localbusiness",
    "name": "Vishwjeet Kumar - Web Developer Gaya Bihar",
    "alternateName": "Top Web Agency Gaya",
    "description": "Professional web development and software engineering services in Gaya, Bodhgaya, Bihar. Expert full-stack developer providing custom web solutions, mobile apps, and IT services for local businesses.",
    "url": "https://vishwjeetkumar.me",
    "telephone": "+91-XXXXXXXXXX",
    "email": "sajalrastogi20@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Professional Services",
      "addressLocality": "Gaya",
      "addressRegion": "Bihar", 
      "postalCode": "823001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.7914",
      "longitude": "85.0002"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Gaya",
        "containedInPlace": {
          "@type": "State",
          "name": "Bihar"
        }
      },
      {
        "@type": "City", 
        "name": "Bodhgaya",
        "containedInPlace": {
          "@type": "State",
          "name": "Bihar"
        }
      },
      {
        "@type": "State",
        "name": "Bihar"
      }
    ],
    "serviceType": [
      "Web Development",
      "Software Engineering", 
      "Mobile App Development",
      "E-commerce Development",
      "Custom Software Solutions",
      "Database Development",
      "API Development",
      "Digital Marketing",
      "Website Design",
      "IT Consulting"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Website Development",
            "description": "Professional website development using React, Next.js, and modern technologies"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Solutions",
            "description": "Complete e-commerce website development with payment integration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Mobile App Development",
            "description": "Cross-platform mobile app development for iOS and Android"
          }
        }
      ]
    },
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "UPI"],
    "openingHours": "Mo-Sa 09:00-18:00",
    "founder": {
      "@type": "Person",
      "name": "Vishwjeet Kumar",
      "jobTitle": "Full Stack Developer",
      "alumniOf": "Software Engineering"
    },
    "sameAs": [
      "https://github.com/sajalrasto9097",
      "https://linkedin.com/in/sajal-rastogi-5b474b6a"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "25",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Rajesh Kumar"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Excellent web development services in Gaya! Professional, timely, and cost-effective. Highly recommended for local businesses."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person", 
          "name": "Priya Singh"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Outstanding software solutions for our business in Bodhgaya. Best web developer in Bihar!"
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://sajalrastogi.com/#service",
    "name": "Web Development Services Gaya Bihar",
    "description": "Professional web development, software engineering, and IT services for businesses in Gaya, Bodhgaya, and Bihar",
    "provider": {
      "@type": "Person",
      "name": "Vishwjeet Kumar",
      "jobTitle": "Full Stack Developer & Software Engineer"
    },
    "areaServed": {
      "@type": "State",
      "name": "Bihar",
      "containsPlace": ["Gaya", "Bodhgaya", "Patna", "Muzaffarpur"]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Professional Web Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development Gaya",
            "description": "Custom website development services in Gaya, Bihar using modern technologies like React and Next.js"
          },
          "areaServed": "Gaya, Bihar"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Software Engineering Bodhgaya",
            "description": "Professional software engineering and custom software development services in Bodhgaya"
          },
          "areaServed": "Bodhgaya, Bihar"
        }
      ]
    }
  };

  React.useEffect(() => {
    // Add local business schema
    const localScript = document.createElement('script');
    localScript.type = 'application/ld+json';
    localScript.id = 'local-business-schema';
    localScript.textContent = JSON.stringify(localBusinessSchema);
    document.head.appendChild(localScript);

    // Add service schema
    const serviceScript = document.createElement('script');
    serviceScript.type = 'application/ld+json';
    serviceScript.id = 'service-schema';
    serviceScript.textContent = JSON.stringify(serviceSchema);
    document.head.appendChild(serviceScript);

    return () => {
      // Cleanup
      const existingLocalScript = document.getElementById('local-business-schema');
      const existingServiceScript = document.getElementById('service-schema');
      if (existingLocalScript) existingLocalScript.remove();
      if (existingServiceScript) existingServiceScript.remove();
    };
  }, []);

  return null;
};

export default LocalBusinessSchema;