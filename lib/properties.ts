import { prisma } from "@/lib/prisma";

// Se o banco não responder (por exemplo durante o build na Vercel), a página
// sai com a lista vazia em vez de derrubar o deploy; ela se atualiza depois.
async function seguro<T>(consulta: () => Promise<T>, vazio: T): Promise<T> {
  try {
    return await consulta();
  } catch (erro) {
    console.error("[properties] falha ao consultar o banco:", erro);
    return vazio;
  }
}

export async function getFeaturedProperties() {
  return seguro(() => prisma.property.findMany({
    where: {
      status: "available",
      isFeatured: true,
    },
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  }), []);
}

export async function getLaunchProperties() {
  return seguro(() => prisma.property.findMany({
    where: {
      status: "available",
      isLaunch: true,
    },
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  }), []);
}

export async function getLuxuryProperties() {
  return seguro(() => prisma.property.findMany({
    where: {
      status: "available",
      isLuxury: true,
    },
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  }), []);
}

export async function getPropertyBySlug(slug: string) {
  return prisma.property.findUnique({
    where: {
      slug,
    },
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
}

type PropertySearchFilters = {
  propertyType?: string;
  city?: string;
  objective?: string;
  minBedrooms?: number;
  maxPrice?: number;
};

export async function getRecommendedProperties(filters: PropertySearchFilters) {
  const where: any = {
    status: "available",
  };

  if (filters.propertyType) {
    where.propertyType = filters.propertyType;
  }

  if (filters.city) {
    where.city = {
      contains: filters.city,
    };
  }

  if (filters.minBedrooms) {
    where.bedrooms = {
      gte: filters.minBedrooms,
    };
  }

  if (filters.maxPrice) {
    where.price = {
      lte: filters.maxPrice,
    };
  }

  if (filters.objective === "lancamento") {
    where.isLaunch = true;
  }

  if (filters.objective === "alto-padrao") {
    where.isLuxury = true;
  }

  if (filters.objective === "investimento") {
    where.OR = [
      {
        isLaunch: true,
      },
      {
        highlights: {
          contains: "valorização",
        },
      },
      {
        category: {
          contains: "lançamento",
        },
      },
    ];
  }

  return prisma.property.findMany({
    where,
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: [
      {
        isFeatured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    take: 12,
  });
}