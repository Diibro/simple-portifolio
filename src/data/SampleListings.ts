
import { IListing } from "@/common/Interfaces";

export const SampleListings: Array<IListing> = [
  {
    id: "1",
    name: {
      en: "Toyota Car for Rent",
      fr: "Toyota à Louer",
      kn: "Toyota Ikwiranye Gukodesha"
    },
    image: "/images/construction-machines.webp",
    features: {
      mainImage: "/images/construction-machines.webp",
      otherImages: [
        "/images/construction-machines.webp",
        "/images/construction-machines.webp"
      ],
      categoryValues: [
        {
          name: { en: "Transmission", fr: "Transmission", kn: "Gukoreshwa" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1,
          value: "Automatic"
        },
        {
          name: { en: "Fuel Type", fr: "Type de Carburant", kn: "Ubwoko bwa Esanse" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2,
          value: "Petrol"
        },
        {
          name: { en: "Seats", fr: "Sièges", kn: "Intebe" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3,
          value: 5
        }
      ]
    },
    owner: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      status: "active",
      createdAt: new Date("2023-01-15")
    },
    location: {
      country: "Rwanda",
      district: "Kigali",
      sector: "Gasabo",
      Cartien: "Kacyiru"
    },
    createdAt: new Date("2024-09-12"),
    inStock: true,
    inspectionDocument: null,
    category: {
      id: "10",
      name: {
        en: "Cars",
        fr: "Voitures",
        kn: "Imodoka"
      },
      icon: "https://example.com/icons/cars.svg",
      features: [
        {
          name: { en: "Transmission", fr: "Transmission", kn: "Gukoreshwa" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1
        },
        {
          name: { en: "Fuel Type", fr: "Type de Carburant", kn: "Ubwoko bwa Esanse" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2
        },
        {
          name: { en: "Seats", fr: "Sièges", kn: "Intebe" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3
        }
      ],
      type: {en:"vehicle", kn:"", fr:""},
      status: true
    }
  },
  {
    id: "2",
    name: {
      en: "Caterpillar Construction Machine for Rent",
      fr: "Machine de Construction Caterpillar à Louer",
      kn: "Imashini yo kubaka ya Caterpillar Ikwiranye Gukodesha"
    },
    image: "/images/trucks.jpg",
    features: {
      mainImage: "/images/trucks.jpg",
      otherImages: [
        "/images/trucks.jpg",
        "/images/trucks.jpg"
      ],
      categoryValues: [
        {
          name: { en: "Machine Type", fr: "Type de Machine", kn: "Ubwoko bw'Imashini" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1,
          value: "Excavator"
        },
        {
          name: { en: "Power", fr: "Puissance", kn: "Imbaraga" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2,
          value: "500HP"
        },
        {
          name: { en: "Weight", fr: "Poids", kn: "Ibiro" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3,
          value: "20 Tons"
        }
      ]
    },
    owner: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      status: "active",
      createdAt: new Date("2023-05-10")
    },
    location: {
      country: "Rwanda",
      district: "Musanze",
      sector: "Kinigi",
      Cartien: "Muhoza"
    },
    createdAt: new Date("2024-08-20"),
    inStock: true,
    inspectionDocument: null,
    category: {
      id: "20",
      name: {
        en: "Construction Machines",
        fr: "Machines de Construction",
        kn: "Imashini zo kubaka"
      },
      icon: "https://example.com/icons/construction.svg",
      features: [
        {
          name: { en: "Machine Type", fr: "Type de Machine", kn: "Ubwoko bw'Imashini" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1
        },
        {
          name: { en: "Power", fr: "Puissance", kn: "Imbaraga" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2
        },
        {
          name: { en: "Weight", fr: "Poids", kn: "Ibiro" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3
        }
      ],
      type: {en:"equipment", fr: "", kn: ""},
      status: true
    }
  },
  {
    id: "1",
    name: {
      en: "Toyota Car for Rent",
      fr: "Toyota à Louer",
      kn: "Toyota Ikwiranye Gukodesha"
    },
    image: "/images/buses.jpg",
    features: {
      mainImage: "/images/buses.jpg",
      otherImages: [
        "/images/buses.jpg",
        "/images/buses.jpg"
      ],
      categoryValues: [
        {
          name: { en: "Transmission", fr: "Transmission", kn: "Gukoreshwa" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1,
          value: "Automatic"
        },
        {
          name: { en: "Fuel Type", fr: "Type de Carburant", kn: "Ubwoko bwa Esanse" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2,
          value: "Petrol"
        },
        {
          name: { en: "Seats", fr: "Sièges", kn: "Intebe" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3,
          value: 5
        }
      ]
    },
    owner: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      status: "active",
      createdAt: new Date("2023-01-15")
    },
    location: {
      country: "Rwanda",
      district: "Kigali",
      sector: "Gasabo",
      Cartien: "Kacyiru"
    },
    createdAt: new Date("2024-09-12"),
    inStock: true,
    inspectionDocument: null,
    category: {
      id: "10",
      name: {
        en: "Cars",
        fr: "Voitures",
        kn: "Imodoka"
      },
      icon: "https://example.com/icons/cars.svg",
      features: [
        {
          name: { en: "Transmission", fr: "Transmission", kn: "Gukoreshwa" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1
        },
        {
          name: { en: "Fuel Type", fr: "Type de Carburant", kn: "Ubwoko bwa Esanse" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2
        },
        {
          name: { en: "Seats", fr: "Sièges", kn: "Intebe" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3
        }
      ],
      type: {en:"vehicle", kn: "", fr:""},
      status: true
    }
  },
  {
    id: "2",
    name: {
      en: "Caterpillar Construction Machine for Rent",
      fr: "Machine de Construction Caterpillar à Louer",
      kn: "Imashini yo kubaka ya Caterpillar Ikwiranye Gukodesha"
    },
    image: "/images/cars.webp",
    features: {
      mainImage: "/images/cars.webp",
      otherImages: [
        "/images/cars.webp",
        "/images/cars.webp"
      ],
      categoryValues: [
        {
          name: { en: "Machine Type", fr: "Type de Machine", kn: "Ubwoko bw'Imashini" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1,
          value: "Excavator"
        },
        {
          name: { en: "Power", fr: "Puissance", kn: "Imbaraga" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2,
          value: "500HP"
        },
        {
          name: { en: "Weight", fr: "Poids", kn: "Ibiro" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3,
          value: "20 Tons"
        }
      ]
    },
    owner: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      status: "active",
      createdAt: new Date("2023-05-10")
    },
    location: {
      country: "Rwanda",
      district: "Musanze",
      sector: "knigi",
      Cartien: "Muhoza"
    },
    createdAt: new Date("2024-08-20"),
    inStock: true,
    inspectionDocument: null,
    category: {
      id: "20",
      name: {
        en: "Construction Machines",
        fr: "Machines de Construction",
        kn: "Imashini zo kubaka"
      },
      icon: "https://example.com/icons/construction.svg",
      features: [
        {
          name: { en: "Machine Type", fr: "Type de Machine", kn: "Ubwoko bw'Imashini" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1
        },
        {
          name: { en: "Power", fr: "Puissance", kn: "Imbaraga" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2
        },
        {
          name: { en: "Weight", fr: "Poids", kn: "Ibiro" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3
        }
      ],
      type: {en:"equipment", kn:"", fr:""},
      status: true
    }
  },
  {
    id: "1",
    name: {
      en: "Toyota Car for Rent",
      fr: "Toyota à Louer",
      kn: "Toyota Ikwiranye Gukodesha"
    },
    image: "/images/construction-machines.webp",
    features: {
      mainImage: "/images/construction-machines.webp",
      otherImages: [
        "/images/construction-machines.webp",
        "/images/construction-machines.webp"
      ],
      categoryValues: [
        {
          name: { en: "Transmission", fr: "Transmission", kn: "Gukoreshwa" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1,
          value: "Automatic"
        },
        {
          name: { en: "Fuel Type", fr: "Type de Carburant", kn: "Ubwoko bwa Esanse" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2,
          value: "Petrol"
        },
        {
          name: { en: "Seats", fr: "Sièges", kn: "Intebe" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3,
          value: 5
        }
      ]
    },
    owner: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      status: "active",
      createdAt: new Date("2023-01-15")
    },
    location: {
      country: "Rwanda",
      district: "Kigali",
      sector: "Gasabo",
      Cartien: "Kacyiru"
    },
    createdAt: new Date("2024-09-12"),
    inStock: true,
    inspectionDocument: null,
    category: {
      id: "10",
      name: {
        en: "Cars",
        fr: "Voitures",
        kn: "Imodoka"
      },
      icon: "https://example.com/icons/cars.svg",
      features: [
        {
          name: { en: "Transmission", fr: "Transmission", kn: "Gukoreshwa" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1
        },
        {
          name: { en: "Fuel Type", fr: "Type de Carburant", kn: "Ubwoko bwa Esanse" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2
        },
        {
          name: { en: "Seats", fr: "Sièges", kn: "Intebe" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3
        }
      ],
      type: {en:"vehicle", fr: "", kn:""},
      status: true
    }
  },
  {
    id: "2",
    name: {
      en: "Caterpillar Construction Machine for Rent",
      fr: "Machine de Construction Caterpillar à Louer",
      kn: "Imashini yo kubaka ya Caterpillar Ikwiranye Gukodesha"
    },
    image: "/images/trucks.jpg",
    features: {
      mainImage: "/images/trucks.jpg",
      otherImages: [
        "/images/trucks.jpg",
        "/images/trucks.jpg"
      ],
      categoryValues: [
        {
          name: { en: "Machine Type", fr: "Type de Machine", kn: "Ubwoko bw'Imashini" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1,
          value: "Excavator"
        },
        {
          name: { en: "Power", fr: "Puissance", kn: "Imbaraga" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2,
          value: "500HP"
        },
        {
          name: { en: "Weight", fr: "Poids", kn: "Ibiro" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3,
          value: "20 Tons"
        }
      ]
    },
    owner: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      status: "active",
      createdAt: new Date("2023-05-10")
    },
    location: {
      country: "Rwanda",
      district: "Musanze",
      sector: "Kinigi",
      Cartien: "Muhoza"
    },
    createdAt: new Date("2024-08-20"),
    inStock: true,
    inspectionDocument: null,
    category: {
      id: "20",
      name: {
        en: "Construction Machines",
        fr: "Machines de Construction",
        kn: "Imashini zo kubaka"
      },
      icon: "https://example.com/icons/construction.svg",
      features: [
        {
          name: { en: "Machine Type", fr: "Type de Machine", kn: "Ubwoko bw'Imashini" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1
        },
        {
          name: { en: "Power", fr: "Puissance", kn: "Imbaraga" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2
        },
        {
          name: { en: "Weight", fr: "Poids", kn: "Ibiro" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3
        }
      ],
      type: {en:"equipment", kn: "", fr: ""},
      status: true
    }
  },
  {
    id: "1",
    name: {
      en: "Toyota Car for Rent",
      fr: "Toyota à Louer",
      kn: "Toyota Ikwiranye Gukodesha"
    },
    image: "/images/buses.jpg",
    features: {
      mainImage: "/images/buses.jpg",
      otherImages: [
        "/images/buses.jpg",
        "/images/buses.jpg"
      ],
      categoryValues: [
        {
          name: { en: "Transmission", fr: "Transmission", kn: "Gukoreshwa" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1,
          value: "Automatic"
        },
        {
          name: { en: "Fuel Type", fr: "Type de Carburant", kn: "Ubwoko bwa Esanse" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2,
          value: "Petrol"
        },
        {
          name: { en: "Seats", fr: "Sièges", kn: "Intebe" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3,
          value: 5
        }
      ]
    },
    owner: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      status: "active",
      createdAt: new Date("2023-01-15")
    },
    location: {
      country: "Rwanda",
      district: "Kigali",
      sector: "Gasabo",
      Cartien: "Kacyiru"
    },
    createdAt: new Date("2024-09-12"),
    inStock: true,
    inspectionDocument: null,
    category: {
      id: "10",
      name: {
        en: "Cars",
        fr: "Voitures",
        kn: "Imodoka"
      },
      icon: "https://example.com/icons/cars.svg",
      features: [
        {
          name: { en: "Transmission", fr: "Transmission", kn: "Gukoreshwa" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1
        },
        {
          name: { en: "Fuel Type", fr: "Type de Carburant", kn: "Ubwoko bwa Esanse" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2
        },
        {
          name: { en: "Seats", fr: "Sièges", kn: "Intebe" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3
        }
      ],
      type: {en:"vehicle", kn: "", fr: ""},
      status: true
    }
  },
  {
    id: "2",
    name: {
      en: "Caterpillar Construction Machine for Rent",
      fr: "Machine de Construction Caterpillar à Louer",
      kn: "Imashini yo kubaka ya Caterpillar Ikwiranye Gukodesha"
    },
    image: "/images/cars.webp",
    features: {
      mainImage: "/images/cars.webp",
      otherImages: [
        "/images/cars.webp",
        "/images/cars.webp"
      ],
      categoryValues: [
        {
          name: { en: "Machine Type", fr: "Type de Machine", kn: "Ubwoko bw'Imashini" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1,
          value: "Excavator"
        },
        {
          name: { en: "Power", fr: "Puissance", kn: "Imbaraga" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2,
          value: "500HP"
        },
        {
          name: { en: "Weight", fr: "Poids", kn: "Ibiro" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3,
          value: "20 Tons"
        }
      ]
    },
    owner: {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      status: "active",
      createdAt: new Date("2023-05-10")
    },
    location: {
      country: "Rwanda",
      district: "Musanze",
      sector: "knigi",
      Cartien: "Muhoza"
    },
    createdAt: new Date("2024-08-20"),
    inStock: true,
    inspectionDocument: null,
    category: {
      id: "20",
      name: {
        en: "Construction Machines",
        fr: "Machines de Construction",
        kn: "Imashini zo kubaka"
      },
      icon: "https://example.com/icons/construction.svg",
      features: [
        {
          name: { en: "Machine Type", fr: "Type de Machine", kn: "Ubwoko bw'Imashini" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 1
        },
        {
          name: { en: "Power", fr: "Puissance", kn: "Imbaraga" },
          type: 'text',
          required: true,
          displayOnCard: true,
          rank: 2
        },
        {
          name: { en: "Weight", fr: "Poids", kn: "Ibiro" },
          type: 'number',
          required: true,
          displayOnCard: true,
          rank: 3
        }
      ],
      type: {en:"equipment", kn: "", fr: ""},
      status: true
    }
  }
];
